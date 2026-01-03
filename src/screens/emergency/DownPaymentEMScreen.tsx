import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MainLayout from '../../components/MainLayout';
import GenericHeader from '../../components/GenericHeader';
import type { Payment } from '../../types/payment';

type DownpaymentParams = { mechanic: any; payment: Payment };

const DownPaymentEMScreen = ({ route, navigation }: any) => {
  const { mechanic, payment } = route.params as DownpaymentParams;

  return (
    <MainLayout header={<GenericHeader title="Pembayaran Biaya Tambahan" />}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Harap lakukan pembayaran ke rekening berikut
          </Text>

          <View style={styles.bankBox}>
            <Text style={styles.bankName}>Bank BCA</Text>
            <Text style={styles.bankNumber}>1234567890</Text>
            <Text style={styles.bankOwner}>a.n PT Bengkel Kita</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.amount}>Jumlah Pembayaran</Text>
          <Text style={styles.amountValue}>Rp50.000</Text>

          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              Setelah melakukan pembayaran, harap simpan bukti transfer untuk
              di-upload pada langkah berikutnya.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('UploadPaymentProofEM', {
              mechanic,
              payment,
              amount: 50000,
            })
          }
        >
          <Text style={styles.buttonText}>Saya Sudah Melakukan Pembayaran</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default DownPaymentEMScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    elevation: 4,
  },

  title: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 14,
  },

  bankBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 16,
  },

  bankName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1D4ED8',
    marginBottom: 4,
  },

  bankNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: 1,
  },

  bankOwner: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },

  amount: {
    fontSize: 13,
    color: '#6B7280',
  },

  amountValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#16A34A',
    marginTop: 2,
  },

  noteBox: {
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
  },

  noteText: {
    fontSize: 12,
    color: '#9A3412',
    lineHeight: 18,
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#8B5E3C',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
