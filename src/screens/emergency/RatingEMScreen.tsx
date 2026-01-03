import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import MainLayout from '../../components/MainLayout';
import GenericHeader from '../../components/GenericHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'RatingEM'>;

const RatingEMScreen: React.FC<Props> = ({ route, navigation }) => {
  const { mechanic } = route.params;
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <MainLayout header={<GenericHeader title="Beri Rating Mekanik" />}>
      <View style={styles.container}>
        {/* ===== CARD MEKANIK ===== */}
        <View style={styles.card}>
          {/* Avatar & Info Centered */}
          <View style={styles.centeredMech}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>🛠️</Text>
            </View>
            <Text style={styles.mechanicName}>{mechanic.name}</Text>
            <Text style={styles.prevRating}>⭐ {mechanic.rating}</Text>
          </View>

          {/* ===== BERI RATING ===== */}
          <Text style={styles.label}>Beri Rating</Text>
          <Text style={styles.hint}>Nilai pengalaman perbaikan Anda</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(i => (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedRating(i)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.star,
                    i <= selectedRating && styles.starSelected,
                  ]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ===== KOMENTAR ===== */}
          <Text style={[styles.label, { marginTop: 20 }]}>Komentar</Text>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={text => setComment(text.slice(0, 200))}
            placeholder="Tulis komentar Anda… (maks 200 karakter)"
            multiline
            maxLength={200}
          />

          {/* ===== TOMBOL SELESAI ===== */}
          <TouchableOpacity
            style={[styles.button, selectedRating === 0 && { opacity: 0.5 }]}
            disabled={selectedRating === 0}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
            }
          >
            <Text style={styles.buttonText}>Selesai</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  );
};

export default RatingEMScreen;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#dac8acff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    elevation: 4,
  },
  centeredMech: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
  },
  mechanicName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  prevRating: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },
  hint: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 6,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  star: {
    fontSize: 36,
    color: '#D1D5DB',
    marginHorizontal: 6,
  },
  starSelected: {
    color: '#F59E0B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 14,
    fontSize: 13,
    color: '#111827',
    minHeight: 80,
    textAlignVertical: 'top',
    backgroundColor: '#F9FAFB',
    marginTop: 6,
  },
  button: {
    backgroundColor: '#16A34A',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
});
