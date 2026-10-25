import { IUser } from '../models/User';

const MAX_HEARTS = 5;
const REFILL_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes per heart

export class HeartService {
  /**
   * Refreshes user's hearts based on elapsed time since last refill.
   */
  public static refreshHearts(user: IUser): { hearts: number; updated: boolean } {
    if (user.hearts >= MAX_HEARTS) {
      user.lastHeartRefillAt = new Date();
      return { hearts: MAX_HEARTS, updated: false };
    }

    const now = Date.now();
    const lastRefill = new Date(user.lastHeartRefillAt || now).getTime();
    const elapsedMs = Math.max(0, now - lastRefill);

    const heartsToRegenerate = Math.floor(elapsedMs / REFILL_INTERVAL_MS);

    if (heartsToRegenerate > 0) {
      const newHearts = Math.min(MAX_HEARTS, user.hearts + heartsToRegenerate);
      const remainingRemainderMs = elapsedMs % REFILL_INTERVAL_MS;
      
      user.hearts = newHearts;
      // Adjust the lastHeartRefillAt so progress towards next heart is preserved
      user.lastHeartRefillAt = new Date(now - remainingRemainderMs);
      return { hearts: newHearts, updated: true };
    }

    return { hearts: user.hearts, updated: false };
  }

  /**
   * Deducts 1 heart for an incorrect answer.
   */
  public static deductHeart(user: IUser): number {
    this.refreshHearts(user);

    if (user.hearts > 0) {
      user.hearts -= 1;
      // If we dropped below max, reset refill timer start point if at max
      if (user.hearts === MAX_HEARTS - 1) {
        user.lastHeartRefillAt = new Date();
      }
    }

    return user.hearts;
  }

  /**
   * Refills 1 heart (e.g. from completing a practice review lesson).
   */
  public static addHeart(user: IUser): number {
    this.refreshHearts(user);
    if (user.hearts < MAX_HEARTS) {
      user.hearts += 1;
      if (user.hearts >= MAX_HEARTS) {
        user.lastHeartRefillAt = new Date();
      }
    }
    return user.hearts;
  }
}
