import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import MainLayout from '../components/MainLayout';
import GenericHeader from '../components/GenericHeader';
import BottomNav from '../components/BottomNav';

type Props = NativeStackScreenProps<RootStackParamList, 'Activity'>;

const activities = [
  {
    id: 1,
    title: 'Login Berhasil',
    desc: 'Kamu berhasil login ke aplikasi',
    time: 'Baru saja',
  },
  {
    id: 2,
    title: 'Update Profil',
    desc: 'Data profil berhasil diperbarui',
    time: '1 jam lalu',
  },
  {
    id: 3,
    title: 'Fitur Baru',
    desc: 'Fitur terbaru sudah tersedia',
    time: 'Kemarin',
  },
  {
    id: 4,
    title: 'Promo Aktif',
    desc: 'Promo spesial untuk kamu',
    time: '2 hari lalu',
  },
];

const ActivityScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <MainLayout
      header={
        <GenericHeader
          title="Activity"
          subtitle="Riwayat aktivitas kamu"
          align="left"
        />
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activities.map(item => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <View style={styles.leftDot} />

            <View style={styles.textWrap}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
            </View>

            <Text style={styles.time}>{item.time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ===== BOTTOM NAV ===== */}
      <BottomNav
        active="Activity"
        onHome={() => navigation.navigate('Home')}
        onActivity={() => {}}
        onMessage={() => navigation.navigate('Message')}
        onProfile={() => navigation.navigate('Profile')}
      />
    </MainLayout>
  );
};

export default ActivityScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  content: {
    paddingBottom: 120,
  },

  card: {
    backgroundColor: '#ddddddff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
  },

  leftDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#8B5E3C',
    marginRight: 12,
  },

  textWrap: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },
  desc: {
    fontSize: 13,
    color: '#374151',
    marginTop: 2,
  },

  time: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 8,
  },
});
