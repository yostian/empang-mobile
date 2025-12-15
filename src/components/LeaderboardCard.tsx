import React, { memo, useEffect, useRef } from 'react';
import { View, Text, Image, Animated, Dimensions } from 'react-native';

export type LeaderboardCardProps = {
  rank: number | string;
  avatarElement: React.ReactNode;
  name: string;
  score: number;
  time?: number;
  customStyle?: any;
  isCurrentUser?: boolean;
};

// 🏆 Trophy images
const trophyIcons: Record<number, any> = {
  1: require('../assets/icons/tropy1.png'),
  2: require('../assets/icons/tropy2.png'),
  3: require('../assets/icons/tropy3.png'),
};

// 🕒 Format waktu agar mirip web
export const formatDuration = (durationInMilliseconds?: number): string => {
  if (!durationInMilliseconds || isNaN(durationInMilliseconds)) return '-';
  const totalSeconds = Math.floor(durationInMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSec = totalSeconds % 60;
  return `${minutes}m ${remainingSec < 10 ? '0' : ''}${remainingSec}s`;
};

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  rank,
  avatarElement,
  name,
  score,
  time,
  customStyle,
  isCurrentUser = false,
}) => {
  const numericRank = Number(rank);
  const trophyIcon = trophyIcons[numericRank] || null;
  const screenWidth = Dimensions.get('window').width;

  let borderColor: string | undefined;
  let glowColor: string | undefined;

  if (numericRank === 1) {
    borderColor = '#FFD700';
    glowColor = 'rgba(255, 215, 0, 0.7)';
  } else if (numericRank === 2) {
    borderColor = '#C0C0C0';
    glowColor = 'rgba(192, 192, 192, 0.7)';
  } else if (numericRank === 3) {
    borderColor = '#CD7F32';
    glowColor = 'rgba(205, 127, 50, 0.7)';
  }

  const isTop3 = numericRank <= 3;

  const pulseAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isTop3) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    }
  }, [isTop3, pulseAnim]);

  const animatedShadow = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0.1)', glowColor ?? 'rgba(0,0,0,0.1)'],
  });

  const cardStyle = {
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1.5,
    marginHorizontal: screenWidth < 400 ? 2 : 3,
    shadowColor: glowColor ?? '#000',
    shadowOpacity: isTop3 ? 0.8 : 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: isTop3 ? 10 : 5,
    borderWidth: isTop3 ? 3 : isCurrentUser ? 2 : 0,
    borderColor: isTop3
      ? borderColor
      : isCurrentUser
      ? '#4CAF50'
      : 'transparent',
    backgroundColor: isCurrentUser ? '#E8FBE8' : '#FFFFFFF0',
  };

  return (
    <Animated.View
      className="relative flex-row items-center rounded-[18px] px-5 py-5 my-2"
      style={[
        {
          ...cardStyle,
          marginHorizontal: 8,
          width: Dimensions.get('window').width - 100,
        },
        customStyle,
        isTop3 && { shadowColor: animatedShadow as any },
      ]}
    >
      {/* Rank */}
      <View className="w-[28px] justify-center items-center">
        <Text className="text-blue-900 font-bold text-[20px]">#{rank}</Text>
      </View>

      {/* Avatar */}
      <View className="w-[60px] h-[60px] justify-center items-center mr-4">
        {avatarElement}
      </View>

      {/* Info */}
      <View className="flex-1 justify-center">
        <Text className="font-bold text-[17px] text-gray-900">{name}</Text>
        <Text className="text-[15px] text-gray-600 mt-[2px]">
          {Number.isFinite(score) ? score.toLocaleString() : '0'} pts
        </Text>
        <Text className="text-[13px] text-gray-400 mt-[1px]">
          {formatDuration(time)}
        </Text>
      </View>

      {/* Trophy */}
      {trophyIcon && (
        <Image
          source={trophyIcon}
          className="absolute right-2 opacity-90"
          style={{
            width: numericRank === 1 ? 39 : numericRank === 2 ? 34 : 30,
            height: numericRank === 1 ? 120 : numericRank === 2 ? 110 : 100,
          }}
        />
      )}
    </Animated.View>
  );
};

export default memo(LeaderboardCard);
