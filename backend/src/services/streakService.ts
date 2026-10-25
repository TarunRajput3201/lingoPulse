import { IUser } from '../models/User';

export class StreakService {
  /**
   * Returns current date string (YYYY-MM-DD) formatted according to user's timezone.
   */
  public static getUserLocalDateString(timezone: string = 'UTC', date: Date = new Date()): string {
    try {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      return formatter.format(date);
    } catch {
      return date.toISOString().split('T')[0];
    }
  }

  /**
   * Returns yesterday's date string (YYYY-MM-DD) for a given date in the user's timezone.
   */
  public static getUserYesterdayDateString(timezone: string = 'UTC'): string {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.getUserLocalDateString(timezone, yesterday);
  }

  /**
   * Updates user streak based on activity completion.
   * Returns { currentStreak, isNewStreakDay }
   */
  public static recordActivity(user: IUser): { currentStreak: number; isNewStreakDay: boolean } {
    const tz = user.preferences?.timezone || 'UTC';
    const today = this.getUserLocalDateString(tz);
    const yesterday = this.getUserYesterdayDateString(tz);

    if (user.lastActiveDate === today) {
      // Already completed an activity today, streak remains same
      return { currentStreak: user.currentStreak, isNewStreakDay: false };
    }

    if (user.lastActiveDate === yesterday) {
      // Completed yesterday: continue and extend streak!
      user.currentStreak += 1;
    } else {
      // Missed a day or first activity ever: start fresh with streak = 1
      user.currentStreak = 1;
    }

    if (user.currentStreak > (user.longestStreak || 0)) {
      user.longestStreak = user.currentStreak;
    }

    user.lastActiveDate = today;
    return { currentStreak: user.currentStreak, isNewStreakDay: true };
  }
}
