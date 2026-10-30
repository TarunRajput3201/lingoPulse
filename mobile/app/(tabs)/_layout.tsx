import React from 'react';
import { Tabs } from 'expo-router';
import { Home, BookOpen, Target, Trophy, User } from 'lucide-react-native';
import { COLORS, TYPOGRAPHY } from '../../src/constants/theme';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1.5,
          borderTopColor: COLORS.grayBorder,
          height: Platform.OS === 'ios' ? 84 + insets.bottom : 68,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom + 4 : 10,
          paddingTop: 8,
          elevation: 8,
          shadowColor: COLORS.charcoal,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '800',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => <Home size={size || 24} color={color} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color, size }) => <BookOpen size={size || 24} color={color} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color, size }) => <Target size={size || 24} color={color} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leagues',
          tabBarIcon: ({ color, size }) => <Trophy size={size || 24} color={color} strokeWidth={2.5} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size || 24} color={color} strokeWidth={2.5} />,
        }}
      />
    </Tabs>
  );
}
