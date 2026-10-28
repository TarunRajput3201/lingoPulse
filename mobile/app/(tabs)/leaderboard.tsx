import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Trophy, Shield, Flame, Sparkles } from 'lucide-react-native';
import { COLORS, RADII } from '../../src/constants/theme';
import { HeaderBar } from '../../src/components/HeaderBar';
import { useAuth } from '../../src/context/AuthContext';
import { ENDPOINTS } from '../../src/constants/api';

export default function LeaderboardScreen() {
  const { user, token } = useAuth();
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearWeek, setYearWeek] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetch(ENDPOINTS.LEADERBOARD, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEntries(data.leaderboard || []);
        setYearWeek(data.yearWeek || 'This Week');
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [token]);

  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView contentContainerStyle={styles.content}>
        {/* League Header Card */}
        <View style={styles.leagueCard}>
          <Shield size={36} color={COLORS.gold} />
          <View style={{ flex: 1 }}>
            <Text style={styles.leagueName}>Gold League</Text>
            <Text style={styles.leagueSub}>Top 10 advance to Sapphire League • {yearWeek}</Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} style={{ marginTop: 24 }} />
        ) : (
          <View style={styles.ranksList}>
            {entries.map((entry, idx) => {
              const isMe = entry.isCurrentUser || entry.userId === user?.id;
              const isTop3 = entry.rank <= 3;

              return (
                <View
                  key={entry.userId || idx}
                  style={[
                    styles.rankRow,
                    isMe && styles.rankRowMe,
                  ]}
                >
                  <View style={styles.rankBadge}>
                    <Text
                      style={[
                        styles.rankNumber,
                        entry.rank === 1 && { color: '#EAB308' },
                        entry.rank === 2 && { color: '#94A3B8' },
                        entry.rank === 3 && { color: '#B45309' },
                      ]}
                    >
                      {entry.rank}
                    </Text>
                  </View>

                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarInitial}>
                      {(entry.displayName || 'L')[0].toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.userInfo}>
                    <Text style={[styles.userName, isMe && styles.userNameMe]}>
                      {entry.displayName} {isMe ? '(You)' : ''}
                    </Text>
                  </View>

                  <View style={styles.xpBadge}>
                    <Text style={styles.xpText}>{entry.weeklyXp} XP</Text>
                  </View>
                </View>
              );
            })}

            {entries.length === 0 && (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>
                  Complete a lesson today to enter this week's league competition!
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  leagueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderRadius: RADII.xl,
    backgroundColor: '#FFFBEB',
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: '#FDE68A',
    marginBottom: 20,
  },
  leagueName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#92400E',
  },
  leagueSub: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
    marginTop: 2,
  },
  ranksList: {
    gap: 8,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: RADII.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderBottomWidth: 3,
    borderColor: COLORS.grayBorder,
  },
  rankRowMe: {
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
    backgroundColor: '#F0F9FF',
  },
  rankBadge: {
    width: 32,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.charcoal,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  avatarInitial: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.charcoal,
  },
  userNameMe: {
    color: COLORS.secondaryDark,
    fontWeight: '900',
  },
  xpBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.pill,
    backgroundColor: '#F1F5F9',
  },
  xpText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  emptyCard: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: RADII.lg,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.grayText,
    textAlign: 'center',
    lineHeight: 20,
  },
});
