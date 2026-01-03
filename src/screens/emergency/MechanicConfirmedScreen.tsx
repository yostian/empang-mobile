import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MainLayout from '../../components/MainLayout';
import GenericHeader from '../../components/GenericHeader';
import AnimatedIndeterminateBar from '../../components/AnimatedIndeterminateBar';
import { PAYMENT_METHOD_LABEL } from '../../utils/paymentLabel';
import { Payment } from '../../types/payment';

const PHASE_SEQUENCE = ['CONFIRMED', 'ON_THE_WAY', 'WORKING', 'DONE'] as const;

const PHASE_STEP = {
  CONFIRMED: 0,
  ON_THE_WAY: 1,
  WORKING: 2,
  DONE: 3,
};

const TOTAL_STEPS = 4;

const MechanicConfirmedScreen = ({ navigation, route }: any) => {
  const { mechanic } = route.params;
  const { payment } = route.params as { payment: Payment };

  /** ===============================
   *  SIMULATED PHASE
   *  =============================== */
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = PHASE_SEQUENCE[phaseIndex];

  useEffect(() => {
    if (phase === 'DONE') return;
    const timer = setTimeout(() => setPhaseIndex(p => p + 1), 4000);
    return () => clearTimeout(timer);
  }, [phase]);

  const step = useMemo(() => PHASE_STEP[phase], [phase]);

  const subtitle = useMemo(() => {
    switch (phase) {
      case 'CONFIRMED':
        return 'Mekanik telah mengonfirmasi pesanan Anda';
      case 'ON_THE_WAY':
        return 'Mekanik sedang menuju lokasi Anda';
      case 'WORKING':
        return 'Mekanik sedang melakukan perbaikan';
      case 'DONE':
        return 'Perbaikan telah selesai';
    }
  }, [phase]);

  return (
    <MainLayout
      header={<GenericHeader title="Status Perbaikan" subtitle={subtitle} />}
    >
      <View style={styles.container}>
        {/* ===== STATUS CARD ===== */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Status</Text>

          <View style={styles.statusRow}>
            <Text style={phaseIndex >= 0 ? styles.active : styles.inactive}>
              ✔ Konfirmasi
            </Text>
            <Text style={phaseIndex >= 1 ? styles.active : styles.inactive}>
              🚚 Menuju Lokasi
            </Text>
            <Text style={phaseIndex >= 2 ? styles.active : styles.inactive}>
              🛠 Proses
            </Text>
            <Text style={phaseIndex >= 3 ? styles.active : styles.inactive}>
              🏁 Selesai
            </Text>
          </View>

          <AnimatedIndeterminateBar step={step} totalSteps={TOTAL_STEPS} />
        </View>

        {/* ===== MECHANIC CARD ===== */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Mekanik</Text>
          <Text style={styles.name}>{mechanic.name}</Text>
          <Text style={styles.meta}>
            ⭐ {mechanic.rating} • {mechanic.distance} km
          </Text>
        </View>

        {/* ===== PAYMENT DETAIL (READ ONLY) ===== */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Rincian Pembayaran</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Metode</Text>
            <Text style={styles.value}>
              {PAYMENT_METHOD_LABEL[payment.method]}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Biaya Servis</Text>
            <Text style={styles.value}>
              Rp{payment.serviceFee.toLocaleString()}
            </Text>
          </View>

          {payment.homeServiceCharge > 0 && (
            <View style={styles.row}>
              <Text style={styles.label}>Biaya Home Service</Text>
              <Text style={styles.value}>
                Rp{payment.homeServiceCharge.toLocaleString()}
              </Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              Rp{payment.total.toLocaleString()}
            </Text>
          </View>

          {payment.downPayment > 0 && (
            <Text style={styles.note}>
              * DP Rp{payment.downPayment.toLocaleString()} telah dibayarkan
            </Text>
          )}
        </View>

        {/* CTA STEP 7 AKAN MUNCUL DI DONE */}
        {phase === 'DONE' && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              navigation.navigate('PaymentConfirmationEM', {
                mechanic,
                payment,
              })
            }
          >
            <Text style={styles.primaryText}>Konfirmasi Pembayaran</Text>
          </TouchableOpacity>
        )}
      </View>
    </MainLayout>
  );
};

export default MechanicConfirmedScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { padding: 16 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  active: { fontSize: 11, color: '#16A34A', fontWeight: '700' },
  inactive: { fontSize: 11, color: '#9CA3AF' },

  name: { fontSize: 15, fontWeight: '800' },
  meta: { fontSize: 12, color: '#6B7280', marginTop: 4 },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  label: { fontSize: 13, color: '#6B7280' },
  value: { fontSize: 13, fontWeight: '700' },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  totalLabel: { fontSize: 14, fontWeight: '800' },
  totalValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#16A34A',
  },

  note: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 6,
  },

  primaryButton: {
    backgroundColor: '#8B5E3C',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },

  primaryText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
});
