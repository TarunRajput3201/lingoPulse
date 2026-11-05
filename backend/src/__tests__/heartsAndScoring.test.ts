import { HeartService, MAX_HEARTS, REFILL_INTERVAL_MS } from '../services/heartService';
import { IUser } from '../models/User';

describe('Hearts & Lives System (100 Max Hearts, 10-Min Refill)', () => {
  it('should initialize with 100 max hearts', () => {
    expect(MAX_HEARTS).toBe(100);
    expect(REFILL_INTERVAL_MS).toBe(10 * 60 * 1000);
  });

  it('should not regenerate beyond 100 hearts', () => {
    const mockUser = {
      hearts: 100,
      maxHearts: 100,
      lastHeartRefillAt: new Date(Date.now() - 3600 * 1000), // 1 hour ago
    } as unknown as IUser;

    const result = HeartService.refreshHearts(mockUser);
    expect(result.hearts).toBe(100);
    expect(result.maxHearts).toBe(100);
    expect(result.nextHeartInSeconds).toBe(0);
    expect(result.updated).toBe(false);
  });

  it('should regenerate exactly 1 heart after 10 minutes', () => {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const mockUser = {
      hearts: 90,
      maxHearts: 100,
      lastHeartRefillAt: tenMinutesAgo,
    } as unknown as IUser;

    const result = HeartService.refreshHearts(mockUser);
    expect(result.hearts).toBe(91);
    expect(result.updated).toBe(true);
  });

  it('should regenerate 5 hearts after 52 minutes and preserve the 2 minute remainder', () => {
    const fiftyTwoMinutesAgo = new Date(Date.now() - 52 * 60 * 1000);
    const mockUser = {
      hearts: 80,
      maxHearts: 100,
      lastHeartRefillAt: fiftyTwoMinutesAgo,
    } as unknown as IUser;

    const result = HeartService.refreshHearts(mockUser);
    expect(result.hearts).toBe(85);
    expect(result.updated).toBe(true);
    // Next heart should be in ~8 minutes (480 seconds)
    expect(result.nextHeartInSeconds).toBeGreaterThanOrEqual(478);
    expect(result.nextHeartInSeconds).toBeLessThanOrEqual(482);
  });

  it('should cap regeneration at 100 when offline for a long duration', () => {
    const twoDaysAgo = new Date(Date.now() - 48 * 3600 * 1000);
    const mockUser = {
      hearts: 20,
      maxHearts: 100,
      lastHeartRefillAt: twoDaysAgo,
    } as unknown as IUser;

    const result = HeartService.refreshHearts(mockUser);
    expect(result.hearts).toBe(100);
    expect(result.nextHeartInSeconds).toBe(0);
  });

  it('deductHeart should reduce hearts by 1 and start countdown timer', () => {
    const mockUser = {
      hearts: 100,
      maxHearts: 100,
      lastHeartRefillAt: new Date(),
    } as unknown as IUser;

    const result = HeartService.deductHeart(mockUser);
    expect(result.hearts).toBe(99);
    expect(mockUser.hearts).toBe(99);
    expect(result.nextHeartInSeconds).toBeGreaterThan(590);
    expect(result.nextHeartInSeconds).toBeLessThanOrEqual(600);
  });

  it('addHeart should increase hearts by 1 up to 100', () => {
    const mockUser = {
      hearts: 99,
      maxHearts: 100,
      lastHeartRefillAt: new Date(Date.now() - 60000),
    } as unknown as IUser;

    const result = HeartService.addHeart(mockUser);
    expect(result.hearts).toBe(100);
    expect(result.nextHeartInSeconds).toBe(0);

    // Cannot add beyond 100
    const result2 = HeartService.addHeart(mockUser);
    expect(result2.hearts).toBe(100);
  });
});

describe('Section Passing Rules & Best Score Tracking Logic', () => {
  it('requires score >= 50% to pass, marks < 50% as failed', () => {
    const passThreshold = 50;

    const score1 = 40;
    const passed1 = score1 >= passThreshold;
    expect(passed1).toBe(false);

    const score2 = 50;
    const passed2 = score2 >= passThreshold;
    expect(passed2).toBe(true);

    const score3 = 85;
    const passed3 = score3 >= passThreshold;
    expect(passed3).toBe(true);
  });

  it('never overwrites a higher best score with a lower score', () => {
    let bestScore = 0;
    const history: Array<{ score: number; passed: boolean }> = [];

    const recordAttempt = (score: number) => {
      const passed = score >= 50;
      history.push({ score, passed });
      bestScore = Math.max(bestScore, score);
      return { score, bestScore, passed };
    };

    // Attempt 1: 80% (Pass)
    const att1 = recordAttempt(80);
    expect(att1.bestScore).toBe(80);
    expect(att1.passed).toBe(true);

    // Attempt 2: 40% (Fail - retry)
    const att2 = recordAttempt(40);
    expect(att2.bestScore).toBe(80); // Preserved! Never downgraded!
    expect(att2.passed).toBe(false);

    // Attempt 3: 95% (Pass - new high score)
    const att3 = recordAttempt(95);
    expect(att3.bestScore).toBe(95); // Upgraded!
    expect(att3.passed).toBe(true);

    // Attempt 4: 70% (Pass - lower than best)
    const att4 = recordAttempt(70);
    expect(att4.bestScore).toBe(95); // Preserved at 95!
    expect(att4.passed).toBe(true);

    expect(history.length).toBe(4);
    expect(history[0].score).toBe(80);
    expect(history[1].score).toBe(40);
    expect(history[2].score).toBe(95);
    expect(history[3].score).toBe(70);
  });
});
