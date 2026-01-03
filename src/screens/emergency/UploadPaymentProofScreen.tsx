import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MainLayout from '../../components/MainLayout';
import GenericHeader from '../../components/GenericHeader';
import { Payment } from '../../types/payment';

type UploadPaymentProofParams = {
  mechanic: any;
  payment: Payment;
  amount: number;
};

const UploadPaymentProofScreen = ({ route, navigation }: any) => {
  const params = route.params as UploadPaymentProofParams;
  const [uploaded, setUploaded] = useState(false);

  return (
    <MainLayout header={<GenericHeader title="Upload Bukti Pembayaran" />}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Bukti Transfer</Text>

          <TouchableOpacity
            style={[styles.uploadBox, uploaded && styles.uploadBoxActive]}
            onPress={() => setUploaded(true)} // dummy
            activeOpacity={0.8}
          >
            <Text
              style={[styles.uploadText, uploaded && styles.uploadTextActive]}
            >
              {uploaded
                ? 'Bukti berhasil dipilih'
                : 'Pilih Foto Bukti Pembayaran'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.helper}>Format JPG / PNG • Maks 2MB</Text>
        </View>

        <TouchableOpacity
          disabled={!uploaded}
          style={[styles.button, !uploaded && styles.buttonDisabled]}
          onPress={() =>
            navigation.navigate('WaitingConfirmationEM', {
              ...params,
              paymentProofUploaded: true,
              status: 'DP_PAID',
            })
          }
        >
          <Text style={styles.buttonText}>Lanjutkan</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default UploadPaymentProofScreen;

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

  label: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
  },

  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },

  uploadBoxActive: {
    borderColor: '#16A34A',
    backgroundColor: '#ECFDF5',
  },

  uploadText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
  },

  uploadTextActive: {
    color: '#16A34A',
  },

  helper: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 8,
  },

  button: {
    backgroundColor: '#8B5E3C',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
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
