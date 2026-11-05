import { IUser } from '../models/User';

export const MAX_HEARTS = 100;
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
   * - 1 heart every 10 minutes (600,000 ms)
   * - Stops at 100 hearts
   * - Preserves progress towards the next heart
   */
  public static refreshHearts(user: IUser): HeartStatusResult {
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
   * Refills 1 heart (e.g. from completing a practice review drill).
   */
  public static addHeart(user: IUser): { hearts: number; maxHearts: number; lastHeartRefillAt: Date; nextHeartInSeconds: number } {
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
    user.hearts = MAX_HEARTS;
    user.maxHearts = MAX_HEARTS;
    user.lastHeartRefillAt = new Date();
    return {
      hearts: MAX_HEARTS,
      maxHearts: MAX_HEARTS,
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
