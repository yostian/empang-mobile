// components/BottomNav.tsx
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

// ✅ Import SVG
import HomeIcon from '../assets/icons/homepage.svg';
import LeaderboardIcon from '../assets/icons/trophy.svg';
import ProfileIcon from '../assets/icons/user-profile-svgrepo.svg';
import CrownIcon from '../assets/icons/crown.svg';

// ✅ Import PNG
import FaqIcon from '../assets/icons/faq.png';

type TabItem = {
  name: string;
  label: string;
  icon?: any;
  svgIcon?: React.FC<any>;
  remoteIcon?: string;
  special?: boolean;
};

const BottomNav: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const tabs: TabItem[] = [
    { name: 'Home', label: 'Home', svgIcon: HomeIcon },
    { name: 'Faq', label: 'FAQ', icon: FaqIcon },
    {
      name: 'Leaderboard',
      label: 'Leaderboard',
      svgIcon: LeaderboardIcon,
      special: true,
    },
    {
      name: 'Terms',
      label: 'Terms',
      remoteIcon: 'https://cdn-icons-png.flaticon.com/512/11582/11582776.png',
    },
    { name: 'Profile', label: 'Profile', svgIcon: ProfileIcon },
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 h-[70px] border-t border-white/30 shadow-md z-50">
      {/* Blur */}
      <BlurView
        style={{ ...StyleSheet.absoluteFillObject }}
        blurType={Platform.OS === 'ios' ? 'light' : 'light'}
        blurAmount={15}
        reducedTransparencyFallbackColor="transparent"
      />
      <View className="absolute inset-0 bg-white/25" />

      <View className="flex-row h-full justify-around items-center pb-1">
        {tabs.map((tab, idx) => {
          const isActive = route.name === tab.name;

          return (
            <TouchableOpacity
              key={idx}
              className="flex-1 items-center"
              onPress={() => navigation.navigate(tab.name)}
            >
              {tab.special ? (
                <View className="items-center mb-1">
                  {/* 👑 Mahkota */}
                  <View className="absolute -top-3 z-20">
                    <CrownIcon
                      width={22}
                      height={22}
                      fill={isActive ? '#facc15' : '#bdbdbd'}
                    />
                  </View>

                  {/* 🌫️ Emboss Circle */}
                  <View
                    className="w-[50px] h-[50px] rounded-full justify-center items-center shadow-md"
                    style={{
                      shadowColor: isActive ? '#2563eb' : '#999',
                      shadowOffset: { width: 2, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 5,
                      elevation: 6,
                    }}
                  >
                    <LinearGradient
                      colors={
                        isActive
                          ? ['#e3f2fd', '#bbdefb', '#90caf9']
                          : ['#f1f1f1', '#dcdcdc', '#cfcfcf']
                      }
                      start={{ x: 0.2, y: 0.1 }}
                      end={{ x: 0.8, y: 1 }}
                      className="w-[46px] h-[46px] rounded-full justify-center items-center border"
                      style={{
                        borderColor: isActive
                          ? 'rgba(37,99,235,0.6)'
                          : 'rgba(160,160,160,0.3)',
                        shadowColor: '#fff',
                        shadowOffset: { width: -2, height: -2 },
                        shadowOpacity: 0.9,
                        shadowRadius: 3,
                      }}
                    >
                      <LeaderboardIcon
                        width={22}
                        height={22}
                        fill={isActive ? '#2563eb' : '#6b7280'}
                      />
                    </LinearGradient>
                  </View>
                </View>
              ) : (
                <>
                  {tab.svgIcon ? (
                    <tab.svgIcon
                      width={24}
                      height={24}
                      fill={isActive ? '#2563eb' : '#9ca3af'}
                    />
                  ) : tab.icon ? (
                    <Image
                      source={tab.icon}
                      className="w-6 h-6 mb-1 resize-contain"
                    />
                  ) : tab.remoteIcon ? (
                    <Image
                      source={{ uri: tab.remoteIcon }}
                      className="w-6 h-6 mb-1 resize-contain"
                    />
                  ) : null}
                </>
              )}

              <Text
                className={`text-[12px] font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNav;
