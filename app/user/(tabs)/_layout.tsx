import { Tabs, usePathname, useRouter } from 'expo-router';
import React from 'react';

import BottomNav from '@/components/BottomNavBar';

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();

  // Map pathname to tab name
  const getActiveTab = () => {
    if (pathname === '/user' || pathname === '/user/index') return 'home';
    if (pathname === '/user/milestones') return 'milestones';
    if (pathname === '/user/analytics') return 'analytics';
    if (pathname === '/user/rewards') return 'rewards';
    if (pathname === '/user/profile') return 'profile';
    return 'home';
  };

  const handleTabChange = (tab: string) => {
    const routes: Record<string, string> = {
      home: '/user',
      milestones: '/user/milestones',
      analytics: '/user/analytics',
      rewards: '/user/rewards',
      profile: '/user/profile',
    };
    router.push(routes[tab] as any);
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={() => (
        <BottomNav activeTab={getActiveTab()} onTabChange={handleTabChange} />
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="milestones" />
      <Tabs.Screen name="analytics" />
      <Tabs.Screen name="rewards" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
