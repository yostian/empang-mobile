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

type Props = NativeStackScreenProps<RootStackParamList, 'Message'>;

const messages = [
  {
    id: 1,
    name: 'Admin',
    message: 'Halo, ada yang bisa kami bantu?',
    time: 'Baru saja',
    unread: true,
  },
  {
    id: 2,
    name: 'Support',
    message: 'Terima kasih sudah menghubungi kami',
    time: '10 menit lalu',
    unread: false,
  },
  {
    id: 3,
    name: 'System',
    message: 'Fitur baru sudah tersedia 🎉',
    time: 'Kemarin',
    unread: true,
  },
  {
    id: 4,
    name: 'Promo',
    message: 'Jangan lewatkan promo spesial minggu ini',
    time: '2 hari lalu',
    unread: false,
  },
];

const MessageScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <MainLayout
      header={
        <GenericHeader title="Message" subtitle="Pesan masuk" align="left" />
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(item => (
          <TouchableOpacity key={item.id} style={styles.card}>
            {/* AVATAR DUMMY */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>

            {/* MESSAGE */}
            <View style={styles.textWrap}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>

              <Text
                numberOfLines={1}
                style={[styles.message, item.unread && styles.unreadText]}
              >
                {item.message}
              </Text>
            </View>

            {/* UNREAD DOT */}
            {item.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ===== BOTTOM NAV ===== */}
      <BottomNav
        active="Message"
        onHome={() => navigation.navigate('Home')}
        onActivity={() => navigation.navigate('Activity')}
        onMessage={() => {}}
        onProfile={() => navigation.navigate('Profile')}
      />
    </MainLayout>
  );
};

export default MessageScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  content: {
    paddingBottom: 120,
  },

  card: {
    backgroundColor: '#ddddddff',
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#8B5E3C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },

  textWrap: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },

  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
  },

  time: {
    fontSize: 12,
    color: '#6B7280',
  },

  message: {
    fontSize: 13,
    color: '#374151',
  },

  unreadText: {
    fontWeight: '700',
    color: '#111827',
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#8B5E3C',
    marginLeft: 8,
  },
});
