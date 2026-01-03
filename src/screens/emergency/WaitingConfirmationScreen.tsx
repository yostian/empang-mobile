import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useWaitingConfirmation } from '../../hooks/useWaitingConfirmationEM';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'WaitingConfirmationEM'
>;

const WaitingConfirmationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { mechanic, payment } = route.params;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.4)).current;
  const dotsAnim = useRef(new Animated.Value(0)).current;

  const [dots, setDots] = useState('');

  const { seconds, phase, isTimeout } = useWaitingConfirmation();

  /** ================= ANIMATION ================= */
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.4,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    const dotsLoop = Animated.loop(
      Animated.timing(dotsAnim, {
        toValue: 3,
        duration: 1200,
        useNativeDriver: false,
      }),
    );

    const listenerId = dotsAnim.addListener(({ value }) => {
      setDots('.'.repeat(Math.floor(value)));
    });

    pulse.start();
    dotsLoop.start();

    return () => {
      pulse.stop();
      dotsLoop.stop();
      dotsAnim.removeListener(listenerId);
      dotsAnim.setValue(0);
    };
  }, [scale, opacity, dotsAnim]);

  /** ================= AUTO NAVIGATE ================= */
  useEffect(() => {
    if (phase === 'CONFIRMED') {
      navigation.replace('MechanicConfirmEM', {
        mechanic,
        payment,
      });
    }
  }, [phase, navigation, mechanic]);

  /** ================= TEXT ================= */
  const subtitleText =
    phase === 'WAITING'
      ? 'Menunggu respon mekanik'
      : phase === 'REMINDING'
      ? 'Mekanik belum merespons'
      : phase === 'CONFIRMED'
      ? 'Mekanik mengkonfirmasi'
      : 'Mekanik tidak merespons';

  /** ================= UI ================= */
  return (
    <View style={styles.overlay}>
      <View style={styles.box}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ scale }],
              opacity,
            },
          ]}
        />

        <Text style={styles.title}>Menunggu Konfirmasi</Text>

        <Text style={styles.subtitle}>
          {subtitleText}
          {!isTimeout && dots}
        </Text>

        <Text style={styles.timer}>⏱ {seconds}s</Text>

        {isTimeout && (
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.secondaryText}>Batalkan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => navigation.replace('MechanicList')}
            >
              <Text style={styles.primaryText}>Cari mekanik lain</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default WaitingConfirmationScreen;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  box: {
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 32,
    alignItems: 'center',
  },

  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B5E3C',
    marginBottom: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },

  subtitleRow: {
    flexDirection: 'row',
  },

  subtitle: {
    fontSize: 13,
    color: '#6B7280',
  },

  timer: {
    marginTop: 8,
    fontSize: 12,
    color: '#9CA3AF',
  },

  actions: {
    marginTop: 16,
    width: '100%',
    paddingHorizontal: 24,
  },

  primaryBtn: {
    backgroundColor: '#8B5E3C',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },

  primaryText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },

  secondaryBtn: {
    paddingVertical: 10,
  },

  secondaryText: {
    textAlign: 'center',
    color: '#6B7280',
  },
});
