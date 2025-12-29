import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import MainLayout from '../../components/MainLayout';
import GenericHeader from '../../components/GenericHeader';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'MechanicList'>;

/* ===== DUMMY DATA MEKANIK ===== */
const mechanics = [
  {
    id: '1',
    name: 'Bengkel Jaya Motor',
    rating: 4.8,
    distance: 3.2,
    available: true,
  },
  {
    id: '2',
    name: 'Mekanik Andi',
    rating: 4.6,
    distance: 7.5,
    available: true,
  },
  {
    id: '3',
    name: 'Bengkel Sumber Rejeki',
    rating: 4.9,
    distance: 12.4,
    available: true,
  },
];

const MechanicListScreen = ({ navigation }: any) => {
  return (
    <MainLayout
      header={
        <GenericHeader
          title="Pilih Mekanik"
          subtitle="Mekanik tersedia di sekitar Anda"
        />
      }
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {mechanics.map(item => (
          <View key={item.id} style={styles.card}>
            {/* FOTO */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>🛠️</Text>
            </View>

            {/* INFO */}
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>

              <View style={styles.metaRow}>
                <Text style={styles.meta}>⭐ {item.rating}</Text>
                <Text style={styles.meta}>📍 {item.distance} km</Text>
              </View>

              {item.available ? (
                <Text style={styles.available}>● Tersedia</Text>
              ) : (
                <Text style={styles.unavailable}>● Tidak tersedia</Text>
              )}
            </View>

            {/* ACTION */}
            <TouchableOpacity
              style={styles.selectBtn}
              onPress={() =>
                navigation.navigate('ConfirmMechanicEM', {
                  mechanic: item,
                })
              }
            >
              <Text style={styles.selectText}>Pilih</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </MainLayout>
  );
};

export default MechanicListScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 120,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    elevation: 4,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },

  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 4,
  },

  meta: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },

  available: {
    fontSize: 11,
    color: '#16A34A',
    fontWeight: '700',
  },

  unavailable: {
    fontSize: 11,
    color: '#DC2626',
    fontWeight: '700',
  },

  selectBtn: {
    backgroundColor: '#8B5E3C',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginLeft: 8,
  },

  selectText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
