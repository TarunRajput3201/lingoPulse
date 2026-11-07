import { IUser, User } from '../models/User';

export const MAX_HEARTS = 100;
export const GUEST_MAX_HEARTS = 10;
export const REFILL_INTERVAL_MS = 10 * 60 * 1000; // 1 heart every 10 minutes

export interface HeartStatusResult {
  hearts: number;
  maxHearts: number;
  lastHeartRefillAt: Date;
  nextHeartInSeconds: number;
  updated: boolean;
}

export class HeartService {
  /**
   * Refreshes user's hearts based on elapsed time since last refill.
   * Accurately calculates server-side regeneration:
   * - 1 heart every 10 minutes (600,000 ms) for registered learners
   * - Stops at 100 hearts
   * - Preserves progress towards the next heart
   * - Guests receive exactly 10 hearts with ZERO regeneration
   */
  public static refreshHearts(user: IUser): HeartStatusResult {
    const isGuest = user.role === 'guest' || Boolean(user.isGuest);
    if (isGuest) {
      const currentHearts = Math.min(GUEST_MAX_HEARTS, Math.max(0, user.hearts ?? GUEST_MAX_HEARTS));
      user.hearts = currentHearts;
      user.maxHearts = GUEST_MAX_HEARTS;
      return {
        hearts: currentHearts,
        maxHearts: GUEST_MAX_HEARTS,
        lastHeartRefillAt: user.lastHeartRefillAt || new Date(),
        nextHeartInSeconds: 0,
        updated: false,
      };
    }

    const now = Date.now();
    const lastRefill = new Date(user.lastHeartRefillAt || now).getTime();
    const elapsedMs = Math.max(0, now - lastRefill);

    if (user.hearts >= MAX_HEARTS) {
      user.hearts = MAX_HEARTS;
      user.lastHeartRefillAt = new Date(now);
      return {
        hearts: MAX_HEARTS,
        maxHearts: MAX_HEARTS,
        lastHeartRefillAt: user.lastHeartRefillAt,
        nextHeartInSeconds: 0,
        updated: false,
      };
    }

    const heartsToRegenerate = Math.floor(elapsedMs / REFILL_INTERVAL_MS);

    if (heartsToRegenerate > 0) {
      const newHearts = Math.min(MAX_HEARTS, user.hearts + heartsToRegenerate);
      const remainingRemainderMs = elapsedMs % REFILL_INTERVAL_MS;

      user.hearts = newHearts;

      if (newHearts >= MAX_HEARTS) {
        user.lastHeartRefillAt = new Date(now);
        return {
          hearts: MAX_HEARTS,
          maxHearts: MAX_HEARTS,
          lastHeartRefillAt: user.lastHeartRefillAt,
          nextHeartInSeconds: 0,
          updated: true,
        };
      }

      // Preserve remainder progress towards the next heart
      user.lastHeartRefillAt = new Date(now - remainingRemainderMs);
      const nextHeartInSeconds = Math.max(0, Math.ceil((REFILL_INTERVAL_MS - remainingRemainderMs) / 1000));

      return {
        hearts: newHearts,
        maxHearts: MAX_HEARTS,
        lastHeartRefillAt: user.lastHeartRefillAt,
        nextHeartInSeconds,
        updated: true,
      };
    }

    const nextHeartInSeconds = Math.max(0, Math.ceil((REFILL_INTERVAL_MS - elapsedMs) / 1000));
    return {
      hearts: user.hearts,
      maxHearts: MAX_HEARTS,
      lastHeartRefillAt: new Date(lastRefill),
      nextHeartInSeconds,
      updated: false,
    };
  }

  /**
   * Deducts 1 heart for an incorrect answer.
   * If hearts drop below MAX_HEARTS from MAX_HEARTS, initializes the refill timer.
   */
  public static deductHeart(user: IUser): { hearts: number; maxHearts: number; lastHeartRefillAt: Date; nextHeartInSeconds: number } {
    const isGuest = user.role === 'guest' || Boolean(user.isGuest);
    if (isGuest) {
      if (user.hearts > 0) {
        user.hearts -= 1;
      }
      user.maxHearts = GUEST_MAX_HEARTS;
      return {
        hearts: user.hearts,
        maxHearts: GUEST_MAX_HEARTS,
        lastHeartRefillAt: user.lastHeartRefillAt || new Date(),
        nextHeartInSeconds: 0,
      };
    }

    this.refreshHearts(user);

    if (user.hearts > 0) {
      user.hearts -= 1;
      if (user.hearts === MAX_HEARTS - 1) {
        // Just dropped below max; initialize refill start point to right now
        user.lastHeartRefillAt = new Date();
      }
    }

    const status = this.getHeartStatus(user);
    return {
      hearts: user.hearts,
      maxHearts: MAX_HEARTS,
      lastHeartRefillAt: user.lastHeartRefillAt || new Date(),
      nextHeartInSeconds: status.nextHeartInSeconds,
    };
  }

  /**
   * Atomically deducts 1 heart in MongoDB using atomic operations to prevent race conditions during concurrent submissions.
   */
  public static async deductHeartAtomic(userId: any): Promise<IUser | null> {
    const user = await User.findById(userId);
    if (!user) return null;

    const isGuest = user.role === 'guest' || Boolean(user.isGuest);
    if (isGuest) {
      const updated = await User.findOneAndUpdate(
        { _id: userId, hearts: { $gt: 0 } },
        { $inc: { hearts: -1 } },
        { new: true }
      );
      return updated || user;
    }

    // Refresh hearts based on elapsed time first
    const { updated } = this.refreshHearts(user);
    if (updated) {
      await user.save();
    }

    if (user.hearts <= 0) {
      return user;
    }

    const setObj: any = {};
    if (user.hearts >= MAX_HEARTS) {
      // Dropping below 100 hearts; start the refill timer now
      setObj.lastHeartRefillAt = new Date();
    }

    const updateDoc: any = { $inc: { hearts: -1 } };
    if (Object.keys(setObj).length > 0) {
      updateDoc.$set = setObj;
    }

    const freshUser = await User.findOneAndUpdate(
      { _id: userId, hearts: { $gt: 0 } },
      updateDoc,
      { new: true }
    );

    return freshUser || user;
  }

  /**
   * Refills 1 heart (e.g. from completing a practice review drill).
   */
  public static addHeart(user: IUser): { hearts: number; maxHearts: number; lastHeartRefillAt: Date; nextHeartInSeconds: number } {
    const isGuest = user.role === 'guest' || Boolean(user.isGuest);
    if (isGuest) {
      if (user.hearts < GUEST_MAX_HEARTS) {
        user.hearts += 1;
      }
      user.maxHearts = GUEST_MAX_HEARTS;
      return {
        hearts: user.hearts,
        maxHearts: GUEST_MAX_HEARTS,
        lastHeartRefillAt: user.lastHeartRefillAt || new Date(),
        nextHeartInSeconds: 0,
      };
    }

    this.refreshHearts(user);

    if (user.hearts < MAX_HEARTS) {
      user.hearts += 1;
      if (user.hearts >= MAX_HEARTS) {
        user.lastHeartRefillAt = new Date();
      }
    }

    const status = this.getHeartStatus(user);
    return {
      hearts: user.hearts,
      maxHearts: MAX_HEARTS,
      lastHeartRefillAt: user.lastHeartRefillAt || new Date(),
      nextHeartInSeconds: status.nextHeartInSeconds,
    };
  }

  /**
   * Full refill (e.g. admin or store restore).
   */
  public static refillAllHearts(user: IUser): { hearts: number; maxHearts: number; lastHeartRefillAt: Date; nextHeartInSeconds: number } {
    const isGuest = user.role === 'guest' || Boolean(user.isGuest);
    const limit = isGuest ? GUEST_MAX_HEARTS : MAX_HEARTS;
    user.hearts = limit;
    user.maxHearts = limit;
    user.lastHeartRefillAt = new Date();
    return {
      hearts: limit,
      maxHearts: limit,
      lastHeartRefillAt: user.lastHeartRefillAt,
      nextHeartInSeconds: 0,
    };
  }

  /**
   * Computes the current heart status and countdown without side effects.
   */
  public static getHeartStatus(user: IUser): {
    hearts: number;
    maxHearts: number;
    lastHeartRefillAt: Date;
    nextHeartInSeconds: number;
  } {
    const isGuest = user.role === 'guest' || Boolean(user.isGuest);
    if (isGuest) {
      return {
        hearts: Math.min(GUEST_MAX_HEARTS, Math.max(0, user.hearts ?? GUEST_MAX_HEARTS)),
        maxHearts: GUEST_MAX_HEARTS,
        lastHeartRefillAt: user.lastHeartRefillAt || new Date(),
        nextHeartInSeconds: 0,
      };
    }

    const now = Date.now();
    const lastRefill = new Date(user.lastHeartRefillAt || now).getTime();
    const elapsedMs = Math.max(0, now - lastRefill);

    if (user.hearts >= MAX_HEARTS) {
      return {
        hearts: MAX_HEARTS,
        maxHearts: MAX_HEARTS,
        lastHeartRefillAt: user.lastHeartRefillAt || new Date(),
        nextHeartInSeconds: 0,
      };
    }

    const heartsToRegenerate = Math.floor(elapsedMs / REFILL_INTERVAL_MS);
    const effectiveHearts = Math.min(MAX_HEARTS, user.hearts + heartsToRegenerate);

    if (effectiveHearts >= MAX_HEARTS) {
      return {
        hearts: MAX_HEARTS,
        maxHearts: MAX_HEARTS,
        lastHeartRefillAt: user.lastHeartRefillAt || new Date(),
        nextHeartInSeconds: 0,
      };
    }

    const remainingRemainderMs = elapsedMs % REFILL_INTERVAL_MS;
    const nextHeartInSeconds = Math.max(0, Math.ceil((REFILL_INTERVAL_MS - remainingRemainderMs) / 1000));

    return {
      hearts: effectiveHearts,
      maxHearts: MAX_HEARTS,
      lastHeartRefillAt: user.lastHeartRefillAt || new Date(),
      nextHeartInSeconds,
    };
  }
}
