import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Trophy, Shield, Flame, Sparkles, Award } from 'lucide-react-native';
import { COLORS, RADII, TYPOGRAPHY } from '../../src/constants/theme';
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
        console.error('[LeaderboardScreen] Load error:', e);
        setLoading(false);
      });
  }, [token]);

  const top3 = entries.slice(0, 3);
  const restOfEntries = entries.slice(3);
  const myEntry = entries.find((e) => e.isCurrentUser || e.userId === user?.id);

  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Gold League Banner */}
        <View style={styles.leagueCard}>
          <Shield size={40} color={COLORS.gold} />
          <View style={{ flex: 1 }}>
            <Text style={styles.leagueName}>Gold League</Text>
            <Text style={styles.leagueSub}>
              Top 10 advance to Sapphire League • {yearWeek}
            </Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color={COLORS.primary} style={{ marginTop: 24 }} />
        ) : (
          <View>
            {/* Top 3 Podium Display */}
            {top3.length > 0 && (
              <View style={styles.podiumContainer}>
                {/* 2nd Place (Silver) */}
                {top3[1] ? (
                  <View style={[styles.podiumColumn, styles.podiumSecond]}>
                    <View style={[styles.podiumAvatarCircle, { borderColor: '#94A3B8' }]}>
                      <Text style={styles.podiumInitial}>
                        {(top3[1].displayName || '2')[0].toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.podiumName} numberOfLines={1}>
                      {top3[1].displayName}
                    </Text>
                    <Text style={styles.podiumXp}>{top3[1].weeklyXp} XP</Text>
                    <View style={[styles.pedestal, styles.pedestalSecond]}>
                      <Text style={styles.pedestalNumber}>2</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.podiumColumn} />
                )}

                {/* 1st Place (Gold) */}
                {top3[0] ? (
                  <View style={[styles.podiumColumn, styles.podiumFirst]}>
                    <View style={styles.crownWrapper}>
                      <Trophy size={20} color={COLORS.gold} />
                    </View>
                    <View style={[styles.podiumAvatarCircle, { borderColor: COLORS.gold }]}>
                      <Text style={styles.podiumInitial}>
                        {(top3[0].displayName || '1')[0].toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.podiumName} numberOfLines={1}>
                      {top3[0].displayName}
                    </Text>
                    <Text style={[styles.podiumXp, { color: COLORS.goldDark }]}>
                      {top3[0].weeklyXp} XP
                    </Text>
                    <View style={[styles.pedestal, styles.pedestalFirst]}>
                      <Text style={styles.pedestalNumber}>1</Text>
                    </View>
                  </View>
                ) : null}

                {/* 3rd Place (Bronze) */}
                {top3[2] ? (
                  <View style={[styles.podiumColumn, styles.podiumThird]}>
                    <View style={[styles.podiumAvatarCircle, { borderColor: '#B45309' }]}>
                      <Text style={styles.podiumInitial}>
                        {(top3[2].displayName || '3')[0].toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.podiumName} numberOfLines={1}>
                      {top3[2].displayName}
                    </Text>
                    <Text style={styles.podiumXp}>{top3[2].weeklyXp} XP</Text>
                    <View style={[styles.pedestal, styles.pedestalThird]}>
                      <Text style={styles.pedestalNumber}>3</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.podiumColumn} />
                )}
              </View>
            )}

            {/* Rank List (4th onwards) */}
            <View style={styles.ranksList}>
              {restOfEntries.map((entry, idx) => {
                const isMe = entry.isCurrentUser || entry.userId === user?.id;
                const isPromotionZone = entry.rank <= 10;

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
                          isPromotionZone && styles.rankNumberPromotion,
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
                      {isPromotionZone ? (
                        <Text style={styles.promotionTag}>Promotion Zone</Text>
                      ) : null}
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
          </View>
        )}
      </ScrollView>

      {/* Sticky My Rank Pill at bottom */}
      {myEntry && (
        <View style={styles.stickyMyRank}>
          <View style={styles.myRankLeft}>
            <View style={styles.myRankBadge}>
              <Text style={styles.myRankNumber}>#{myEntry.rank}</Text>
            </View>
            <Text style={styles.myRankName}>{user?.displayName || 'You'}</Text>
          </View>
          <View style={styles.myRankRight}>
            <Sparkles size={16} color={COLORS.gold} />
            <Text style={styles.myRankXp}>{myEntry.weeklyXp} XP</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayBackground,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  leagueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 18,
    borderRadius: RADII.xl,
    backgroundColor: COLORS.goldSubtle,
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
  podiumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  podiumColumn: {
    flex: 1,
    alignItems: 'center',
  },
  podiumFirst: {
    zIndex: 2,
  },
  podiumSecond: {
    zIndex: 1,
  },
  podiumThird: {
    zIndex: 1,
  },
  crownWrapper: {
    marginBottom: 2,
  },
  podiumAvatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.charcoal,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  podiumInitial: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.charcoal,
  },
  podiumName: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.charcoal,
    marginTop: 6,
    textAlign: 'center',
  },
  podiumXp: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.grayText,
    marginTop: 2,
    marginBottom: 6,
  },
  pedestal: {
    width: '100%',
    borderRadius: RADII.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pedestalFirst: {
    height: 90,
    backgroundColor: '#FEF3C7',
    borderWidth: 2,
    borderColor: '#FDE68A',
  },
  pedestalSecond: {
    height: 70,
    backgroundColor: '#F1F5F9',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  pedestalThird: {
    height: 56,
    backgroundColor: '#FFEDD5',
    borderWidth: 2,
    borderColor: '#FED7AA',
  },
  pedestalNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.charcoal,
  },
  ranksList: {
    gap: 8,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: RADII.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderBottomWidth: 3,
    borderColor: COLORS.grayBorder,
  },
  rankRowMe: {
    borderColor: COLORS.secondary,
    borderBottomColor: COLORS.secondaryDark,
    backgroundColor: COLORS.secondarySubtle,
  },
  rankBadge: {
    width: 30,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.grayText,
  },
  rankNumberPromotion: {
    color: COLORS.primaryDark,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  avatarInitial: {
    fontSize: 15,
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
  promotionTag: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.primaryDark,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  xpBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADII.pill,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
  },
  xpText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  emptyCard: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADII.lg,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.grayText,
    textAlign: 'center',
    lineHeight: 20,
  },
  stickyMyRank: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 2,
    borderTopColor: COLORS.grayBorder,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: COLORS.charcoal,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 8,
  },
  myRankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  myRankBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADII.sm,
    backgroundColor: COLORS.secondary,
  },
  myRankNumber: {
    fontSize: 13,
    fontWeight: '900',
    color: COLORS.white,
  },
  myRankName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.charcoal,
  },
  myRankRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  myRankXp: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.charcoal,
  },
});
