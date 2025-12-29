import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MainLayout from '../../components/MainLayout';
import GenericHeader from '../../components/GenericHeader';

const ConfirmMechanicScreen = ({ route, navigation }: any) => {
  const { mechanic } = route.params;
  const [agreeFee, setAgreeFee] = useState(false);

  const isFar = mechanic.distance > 10;

  const canContinue = useMemo(() => {
    if (!isFar) return true;
    return agreeFee;
  }, [isFar, agreeFee]);

  return (
    <MainLayout header={<GenericHeader title="Konfirmasi Mekanik" />}>
      <View style={styles.container}>
        {/* INFO MEKANIK */}
        <View style={styles.card}>
          <Text style={styles.name}>{mechanic.name}</Text>

          <View style={styles.row}>
            <Text style={styles.meta}>⭐ {mechanic.rating}</Text>
            <Text style={styles.meta}>📍 {mechanic.distance} km</Text>
          </View>
        </View>

        {/* WARNING JARAK */}
        {isFar && (
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>
              Mekanik di luar jangkauan normal
            </Text>
            <Text style={styles.warningText}>
              Jarak lebih dari 10 km akan dikenakan biaya tambahan sebesar{' '}
              <Text style={{ fontWeight: '800' }}>Rp50.000</Text>.
            </Text>

            {/* CHECKBOX */}
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

        {/* BUTTON */}
        <TouchableOpacity
          disabled={!canContinue}
          style={[styles.button, !canContinue && styles.buttonDisabled]}
          onPress={() =>
            navigation.navigate('WaitingConfirmation', {
              mechanic,
            })
          }
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
    marginBottom: 20,
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
