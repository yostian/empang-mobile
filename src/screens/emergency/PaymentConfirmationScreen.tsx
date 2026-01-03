import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MainLayout from '../../components/MainLayout';
import GenericHeader from '../../components/GenericHeader';
import { Payment } from '../../types/payment';
import { PAYMENT_METHOD_LABEL } from '../../utils/paymentLabel';

const PaymentConfirmationScreen = ({ route, navigation }: any) => {
  const { mechanic, payment } = route.params as {
    mechanic: any;
    payment: Payment;
  };

  return (
    <MainLayout header={<GenericHeader title="Konfirmasi Pembayaran" />}>
      <View style={styles.container}>
        {/* ===== PAYMENT DETAIL ===== */}
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
            <Text style={styles.value}>Rp100.000</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Home Service Charge</Text>
            <Text style={styles.value}>Rp50.000</Text>
          </View>

          {payment.downPayment > 0 && (
            <View style={styles.row}>
              <Text style={styles.label}>DP Dibayar</Text>
              <Text style={styles.value}>- Rp50.000</Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Sisa Pembayaran</Text>
            <Text style={styles.totalValue}>
              Rp{payment.remaining.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* ===== CONFIRM BUTTON ===== */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            navigation.replace('RatingEM', {
              mechanic,
            })
          }
        >
          <Text style={styles.primaryText}>
            Saya Sudah Melakukan Pembayaran
          </Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default PaymentConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    elevation: 4,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  label: {
    fontSize: 13,
    color: '#6B7280',
  },

  value: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },

  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
  },

  totalValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#16A34A',
  },

  primaryButton: {
    backgroundColor: '#8B5E3C',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  primaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
