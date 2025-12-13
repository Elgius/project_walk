import { Tabs, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import BottomNav from '@/components/BottomNavBar';
import { NavVisibilityProvider, useNavVisibility } from '@/contexts/NavVisibilityContext';

function TabLayoutContent() {
  const router = useRouter();
  const pathname = usePathname();
  const { isVisible, resetInactivityTimer } = useNavVisibility();

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
    resetInactivityTimer();
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
    <View
      style={{ flex: 1 }}
      onTouchStart={resetInactivityTimer}
      onTouchMove={resetInactivityTimer}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={() => (
          <BottomNav
            activeTab={getActiveTab()}
            onTabChange={handleTabChange}
            isVisible={isVisible}
          />
        )}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="milestones" />
        <Tabs.Screen name="analytics" />
        <Tabs.Screen name="rewards" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </View>
  );
}

export default function TabLayout() {
  return (
    <NavVisibilityProvider inactivityTimeout={3000}>
      <TabLayoutContent />
    </NavVisibilityProvider>
  );
}
