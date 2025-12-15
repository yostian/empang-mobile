import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import preloadImage from './preloadImage';
import BottomNav from './BottomNav';
import Card from './Card';
import DynamicLoader from './DynamicLoader';

const useForceRefreshOnFocus = () => {
  const [refresh, setRefresh] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setRefresh(true);
      const timeout = setTimeout(() => setRefresh(false), 120);
      return () => clearTimeout(timeout);
    }, []),
  );

  return refresh;
};

interface Props {
  children: React.ReactNode;
  hideHeader?: boolean;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const [backgroundImage, setBackgroundImage] =
    useState<ImageSourcePropType | null>(null);
  const [loadingBg, setLoadingBg] = useState(true);
  const route = useRoute();

  const refresh = useForceRefreshOnFocus();

  const hideBottomNavScreens = ['Quiz', 'Dashboard', 'Login', 'Register'];
  const noScrollScreens = ['Leaderboard'];
  const shouldShowBottomNav = !hideBottomNavScreens.some(screen =>
    route.name.toLowerCase().includes(screen.toLowerCase()),
  );
  const shouldScroll = !noScrollScreens.includes(route.name);

  // === Load background image (harus dieksekusi dulu sebelum render loading) ===
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const img = await preloadImage();
        if (mounted) setBackgroundImage(img);
      } catch (e) {
        console.log('bg load error:', e);
      } finally {
        if (mounted) setLoadingBg(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // === Refresh state diprioritaskan ===
  if (refresh) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <DynamicLoader size={50} />
      </SafeAreaView>
    );
  }

  // === Background belum siap: tampilkan loading 1 kali ===
  if (loadingBg) {
    return null;
  }

  const ContentWrapper = shouldScroll ? ScrollView : View;

  return (
    <SafeAreaView className="flex-1 bg-[#dccacaff]">
      <ImageBackground
        source={backgroundImage!}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <ContentWrapper
          {...(shouldScroll
            ? {
                contentContainerStyle: {
                  flexGrow: 1,
                  padding: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                showsVerticalScrollIndicator: false,
              }
            : { style: { flex: 1, padding: 16 } })}
        >
          <Card
            style={
              route.name === 'Leaderboard'
                ? { padding: 10, maxWidth: 500, alignSelf: 'center' }
                : undefined
            }
          >
            <View className="w-full">{children}</View>
          </Card>
        </ContentWrapper>

        {shouldShowBottomNav && (
          <View className="border-t border-gray-300 bg-white">
            <BottomNav />
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MainLayout;
