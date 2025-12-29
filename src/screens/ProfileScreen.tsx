import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import MainLayout from '../components/MainLayout';
import GenericHeader from '../components/GenericHeader';
import BottomNav from '../components/BottomNav';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <MainLayout
      header={
        <GenericHeader
          title="Profil Saya"
          subtitle="Informasi akun"
          align="left"
        />
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== AVATAR ===== */}
        <View style={styles.profileCard}>
          <Image
            source={require('../assets/icons/profile.png')}
            style={styles.avatar}
          />

          <Text style={styles.name}>Admin Dummy</Text>
          <Text style={styles.email}>admin@example.com</Text>
        </View>

        {/* ===== MENU LIST ===== */}
        <View style={styles.menuCard}>
          {['Edit Profil', 'Keamanan Akun', 'Notifikasi', 'Bantuan'].map(
            item => (
              <TouchableOpacity key={item} style={styles.menuItem}>
                <Text style={styles.menuText}>{item}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>

        {/* ===== LOGOUT ===== */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ===== BOTTOM NAV ===== */}
      <BottomNav
        active="Profile"
        onHome={() => navigation.navigate('Home')}
        onActivity={() => navigation.navigate('Activity')}
        onMessage={() => navigation.navigate('Message')}
        onProfile={() => {}}
      />
    </MainLayout>
  );
};

export default ProfileScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  content: {
    paddingBottom: 120,
  },

  profileCard: {
    backgroundColor: '#ddddddff',
    borderRadius: 22,
    alignItems: 'center',
    padding: 24,
    marginBottom: 20,
    elevation: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    marginBottom: 12,
    tintColor: '#8B5E3C',
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
  },

  menuCard: {
    backgroundColor: '#ddddddff',
    borderRadius: 22,
    paddingVertical: 6,
    marginBottom: 20,
    elevation: 6,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  logoutBtn: {
    backgroundColor: '#8B5E3C',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
});
