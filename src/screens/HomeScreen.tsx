import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import MainLayout from '../components/MainLayout';
import GenericHeader from '../components/GenericHeader';
import BottomNav from '../components/BottomNav';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const icons = {
  emergency: require('../assets/icons/em_emergency.png'),
  service: require('../assets/icons/activity.png'),
  history: require('../assets/icons/activity.png'),
  help: require('../assets/icons/activity.png'),
};

const MENU_ITEMS = [
  {
    key: 'emergency',
    label: 'EM-Emergency',
    icon: icons.emergency,
    emergency: true,
    onPress: (navigation: any) => navigation.navigate('Emergency'),
  },
  {
    key: 'service',
    label: 'Service',
    icon: icons.service,
    onPress: () => {},
  },
  {
    key: 'history',
    label: 'Riwayat',
    icon: icons.history,
    onPress: () => {},
  },
  {
    key: 'help',
    label: 'Bantuan',
    icon: icons.help,
    onPress: () => {},
  },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <MainLayout header={<GenericHeader title="Halo, Admin 👋" align="left" />}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== SECTION 1 : MENU ICON ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu</Text>

          <View style={styles.menuRow}>
            {MENU_ITEMS.map(item => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.menuItem,
                  item.emergency && styles.emergencyItem,
                ]}
                onPress={() => item.onPress(navigation)}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.menuIcon,
                    item.emergency && styles.emergencyIcon,
                  ]}
                >
                  <Image
                    source={item.icon}
                    style={styles.iconImg}
                    resizeMode="contain"
                  />
                </View>

                <Text
                  style={[
                    styles.menuText,
                    item.emergency && styles.emergencyText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ===== SECTION 2 : PROMO ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promo & Info</Text>

          <View style={styles.promoCard}>
            <Text style={styles.promoTitle}>🔥 Promo Spesial</Text>
            <Text style={styles.promoDesc}>
              Nikmati fitur terbaru dan promo menarik di aplikasi ini.
            </Text>
          </View>
        </View>

        {/* ===== SECTION 3 : FITUR LAIN ===== */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitur Lainnya</Text>

          <View style={styles.featureCard}>
            <Text style={styles.featureText}>Fitur A</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureText}>Fitur B</Text>
          </View>
          <View style={styles.featureCard}>
            <Text style={styles.featureText}>Coming Soon</Text>
          </View>
        </View>
      </ScrollView>

      {/* ===== BOTTOM NAV (sementara di sini) ===== */}
      <BottomNav
        active="Home"
        onHome={() => {}}
        onActivity={() => navigation.navigate('Activity')}
        onMessage={() => navigation.navigate('Message')}
        onProfile={() => navigation.navigate('Profile')}
      />
    </MainLayout>
  );
};

export default HomeScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 120,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },

  /* MENU ICON */
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItem: {
    alignItems: 'center',
    width: (width - 80) / 4,
  },
  menuIcon: {
    width: 56,
    height: 56,
    borderRadius: 6,
    backgroundColor: '#e7cca8e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  /* PROMO */
  promoCard: {
    backgroundColor: '#ddddddff',
    borderRadius: 20,
    padding: 16,
    elevation: 8,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  promoDesc: {
    fontSize: 14,
    color: '#374151',
  },

  /* FEATURE */
  featureCard: {
    backgroundColor: '#ddddddff',
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 6,
  },
  featureText: {
    fontSize: 15,
    fontWeight: '700',
  },

  /* BOTTOM NAV */
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
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
  navText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  navActive: {
    fontSize: 14,
    fontWeight: '800',
    color: '#8B5E3C',
  },

  emergencyItem: {
    transform: [{ scale: 1.05 }],
  },

  emergencyIcon: {
    backgroundColor: '#e7cca8e1',
    borderWidth: 2,
  },

  emergencyText: {
    color: '#DC2626',
    fontWeight: '800',
  },

  iconImg: {
    width: 44,
    height: 44,
  },
});
