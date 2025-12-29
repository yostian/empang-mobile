import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import MainLayout from '../../components/MainLayout';
import GenericHeader from '../../components/GenericHeader';

const STATUS = [
  'Menghubungi mekanik...',
  'Menunggu respon mekanik...',
  'Mekanik sedang membaca permintaan...',
];

const WaitingConfirmation = ({ route, navigation }: any) => {
  const { mechanic } = route.params;
  const [step, setStep] = useState(0);

  /* ===== ANIMASI ===== */
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.15, { duration: 800 }), -1, true);
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  /* ===== SIMULASI FLOW ===== */
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 2000);
    const t2 = setTimeout(() => setStep(2), 4000);
    const t3 = setTimeout(() => {
      navigation.replace('OrderAccepted', { mechanic });
    }, 6500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <MainLayout
      showBottomNav={false}
      header={<GenericHeader title="Menunggu Konfirmasi" />}
    >
      <View style={styles.container}>
        {/* PULSE */}
        <Animated.View style={[styles.pulse, pulseStyle]} />

        {/* INFO */}
        <Text style={styles.title}>{STATUS[step]}</Text>

        <Text style={styles.sub}>
          Mekanik: <Text style={{ fontWeight: '800' }}>{mechanic.name}</Text>
        </Text>

        <Text style={styles.note}>
          Mohon tetap di aplikasi, permintaan sedang diproses.
        </Text>
      </View>
    </MainLayout>
  );
};

export default WaitingConfirmation;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  pulse: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#8B5E3C',
    marginBottom: 28,
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },

  sub: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 18,
  },

  note: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});
