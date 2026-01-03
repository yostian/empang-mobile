import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MainLayout from '../../components/MainLayout';
import GenericHeader from '../../components/GenericHeader';
import type { Payment, PaymentMethod } from '../../types/payment';

const ConfirmMechanicScreen = ({ route, navigation }: any) => {
  const { mechanic } = route.params;

  const [payment, setPayment] = useState<Payment | null>(null);
  const [agreeFee, setAgreeFee] = useState(false);

  const isFar = mechanic.distance > 10;

  /** ===============================
   *  PAYMENT OPTIONS LOGIC
   *  =============================== */
  const availablePayments: PaymentMethod[] = useMemo(() => {
    if (isFar) return ['bank_transfer'];
    return ['cash', 'bank_transfer', 'qris'];
  }, [isFar]);

  /** ===============================
   *  VALIDATION
   *  =============================== */
  const canContinue = useMemo(() => {
    if (!payment) return false;
    if (isFar && !agreeFee) return false;
    return true;
  }, [payment, agreeFee, isFar]);

  /** ===============================
   *  SELECT PAYMENT
   *  =============================== */
  const selectPayment = (method: PaymentMethod) => {
    const SERVICE_FEE = 100_000;
    const HOME_SERVICE = 50_000;
    const TOTAL = 150_000;

    setPayment({
      method,
      serviceFee: SERVICE_FEE,
      homeServiceCharge: HOME_SERVICE,
      total: TOTAL,
      downPayment: isFar ? HOME_SERVICE : 0,
      remaining: isFar ? SERVICE_FEE : TOTAL,
      status: 'UNPAID',
    });
  };

  /** ===============================
   *  SUBMIT HANDLER
   *  =============================== */
  const handleContinue = () => {
    if (!payment) return;

    if (isFar) {
      navigation.navigate('DownpaymentEM', {
        mechanic,
        payment,
      });
    } else {
      navigation.navigate('WaitingConfirmationEM', {
        mechanic,
        payment,
      });
    }
  };

  return (
    <MainLayout header={<GenericHeader title="Konfirmasi Mekanik" />}>
      <View style={styles.container}>
        {/* ===== INFO MEKANIK ===== */}
        <View style={styles.card}>
          <Text style={styles.name}>{mechanic.name}</Text>

          <View style={styles.row}>
            <Text style={styles.meta}>⭐ {mechanic.rating}</Text>
            <Text style={styles.meta}>📍 {mechanic.distance} km</Text>
          </View>
        </View>

        {/* ===== PAYMENT METHOD ===== */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>

          {availablePayments.map(method => {
            const active = payment?.method === method;

            return (
              <TouchableOpacity
                key={method}
                style={[styles.paymentItem, active && styles.paymentItemActive]}
                activeOpacity={0.8}
                onPress={() => selectPayment(method)}
              >
                <Text
                  style={[
                    styles.paymentText,
                    active && styles.paymentTextActive,
                  ]}
                >
                  {method === 'cash' && '💵 Tunai'}
                  {method === 'bank_transfer' && '🏦 Transfer Bank'}
                  {method === 'qris' && '📱 QRIS'}
                </Text>
              </TouchableOpacity>
            );
          })}

          {isFar && (
            <Text style={styles.paymentNote}>
              Untuk jarak di atas 10 km, hanya tersedia pembayaran via transfer
              bank.
            </Text>
          )}
        </View>

        {/* ===== WARNING BIAYA TAMBAHAN ===== */}
        {isFar && (
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>Biaya Tambahan Jarak Jauh</Text>
            <Text style={styles.warningText}>
              Jarak lebih dari 10 km dikenakan biaya awal sebesar{' '}
              <Text style={{ fontWeight: '800' }}>Rp50.000</Text>.
            </Text>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgreeFee(!agreeFee)}
              activeOpacity={0.8}
            >
              <View
                style={[styles.checkbox, agreeFee && styles.checkboxActive]}
              />
              <Text style={styles.checkboxText}>
                Saya setuju dengan biaya tambahan
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ===== BUTTON ===== */}
        <TouchableOpacity
          disabled={!canContinue}
          style={[styles.button, !canContinue && styles.buttonDisabled]}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Lanjutkan</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default ConfirmMechanicScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },

  name: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 6,
  },

  row: {
    flexDirection: 'row',
    gap: 16,
  },

  meta: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
    color: '#111827',
  },

  paymentItem: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },

  paymentItemActive: {
    borderColor: '#8B5E3C',
    backgroundColor: '#FAF5EF',
  },

  paymentText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
  },

  paymentTextActive: {
    color: '#8B5E3C',
  },

  paymentNote: {
    fontSize: 12,
    color: '#9A3412',
    marginTop: 6,
    fontWeight: '600',
  },

  warningBox: {
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FDBA74',
  },

  warningTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#9A3412',
    marginBottom: 6,
  },

  warningText: {
    fontSize: 13,
    color: '#9A3412',
    marginBottom: 14,
    lineHeight: 18,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#9A3412',
    marginRight: 10,
  },

  checkboxActive: {
    backgroundColor: '#9A3412',
  },

  checkboxText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#9A3412',
  },

  button: {
    backgroundColor: '#8B5E3C',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },

  buttonDisabled: {
    opacity: 0.4,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
