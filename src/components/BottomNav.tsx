import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type TabName = 'Home' | 'Activity' | 'Message' | 'Profile';

type BottomNavProps = {
  active?: TabName;
  onHome?: () => void;
  onActivity?: () => void;
  onMessage?: () => void;
  onProfile?: () => void;
};

const icons = {
  Home: require('../assets/icons/home.png'),
  Activity: require('../assets/icons/activity.png'),
  Message: require('../assets/icons/message.png'),
  Profile: require('../assets/icons/profile.png'),
};

const BottomNav: React.FC<BottomNavProps> = ({
  active = 'Home',
  onHome,
  onActivity,
  onMessage,
  onProfile,
}) => {
  const renderItem = (label: TabName, onPress?: () => void) => {
    const isActive = active === label;

    return (
      <TouchableOpacity style={styles.navItem} onPress={onPress}>
        <Image
          source={icons[label]}
          style={[styles.icon, { tintColor: isActive ? '#8B5E3C' : '#6B7280' }]}
          resizeMode="contain"
        />
        <Text style={isActive ? styles.navActive : styles.navText}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderItem('Home', onHome)}
      {renderItem('Activity', onActivity)}
      {renderItem('Message', onMessage)}
      {renderItem('Profile', onProfile)}
    </View>
  );
};

export default BottomNav;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: '#eeeeeeff',
    flexDirection: 'row',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 20,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    marginBottom: 2,
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  navActive: {
    fontSize: 12,
    fontWeight: '800',
    color: '#8B5E3C',
  },
});
