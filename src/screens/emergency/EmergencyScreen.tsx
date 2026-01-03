import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import MainLayout from '../../components/MainLayout';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import GenericHeader from '../../components/GenericHeader';
import { RootStackParamList } from '../../../App';
import { useVehicleSelection, Vehicle } from '../../hooks/useVehicleSelection';

type Props = NativeStackScreenProps<RootStackParamList, 'Emergency'>;

/* ===== DUMMY DATA PROFILE ===== */
const vehiclesFromProfile: Vehicle[] = [
  {
    id: '1',
    jenis: 'Matic',
    merk: 'Honda',
    model: 'Vario 125',
    cc: '125 cc',
    tahun: '2022',
  },
  {
    id: '2',
    jenis: 'Sport',
    merk: 'Honda',
    model: 'CBR 150',
    cc: '150 cc',
    tahun: '2022',
  },
];

const EmergencyScreen: React.FC<Props> = ({ navigation }) => {
  const scrollRef = useRef<ScrollView>(null);
  const [saveToProfile, setSaveToProfile] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  /** ✅ LOGIC DIPINDAH KE HOOK */
  const { mode, vehicles, selectedVehicle, selectedId, selectVehicle } =
    useVehicleSelection(vehiclesFromProfile);

  /** 🔥 INI KUNCI FIX ANDROID */
  const onFocusScroll = (yOffset: number) => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: yOffset,
        animated: true,
      });
    }, 120);
  };

  return (
    <MainLayout
      header={
        <GenericHeader
          title="EM – Emergency"
          subtitle="Motor mogok? Mekanik siap bantu"
        />
      }
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ===== INFO ===== */}
        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>🚨 Bantuan Darurat</Text>
          <Text style={styles.alertText}>
            Isi data di bawah agar mekanik bisa segera menuju lokasi Anda.
          </Text>
        </View>

        {/* ===== LOKASI ===== */}
        <View style={styles.card}>
          <Text style={styles.label}>📍 Lokasi Anda</Text>
          <View style={styles.valueBox}>
            <Text style={styles.valueText}>
              Jl. Raya Sudirman No. 21, Jakarta
            </Text>
            <Text style={styles.hint}>Diambil otomatis dari GPS</Text>
          </View>
        </View>

        {/* ===== FOTO ===== */}
        <View style={styles.card}>
          <Text style={styles.label}>📷 Foto Motor Mogok</Text>
          <TouchableOpacity style={styles.uploadBox}>
            <Text style={styles.uploadIcon}>＋</Text>
            <Text style={styles.uploadText}>Upload Foto Motor</Text>
          </TouchableOpacity>
        </View>

        {/* ===== DETAIL MOTOR ===== */}
        <View style={styles.card}>
          <Text style={styles.label}>🏍️ Detail Motor</Text>

          {/* === KASUS 1: BELUM ADA MOTOR === */}
          {mode === 'EMPTY' && (
            <>
              {[
                { key: 'jenis', label: 'Jenis motor', y: 420 },
                { key: 'merk', label: 'Merk motor', y: 500 },
                { key: 'model', label: 'Model motor', y: 580 },
                { key: 'cc', label: '125', y: 660 },
                { key: 'tahun', label: '2021', y: 740 },
              ].map(item => (
                <View key={item.key} style={{ marginBottom: 14 }}>
                  <Text style={styles.inputLabel}>{item.label}</Text>
                  <View
                    style={[
                      styles.inputBox,
                      focusedField === item.key && styles.inputBoxFocused,
                    ]}
                  >
                    <TextInput
                      placeholder={`Contoh: ${item.label}`}
                      placeholderTextColor="#9CA3AF"
                      style={styles.inputText}
                      onFocus={() => {
                        setFocusedField(item.key);
                        onFocusScroll(item.y);
                      }}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>
                </View>
              ))}

              <TouchableOpacity
                style={{ marginTop: 8 }}
                onPress={() => setSaveToProfile(v => !v)}
              >
                <Text style={styles.hint}>
                  {saveToProfile ? '☑' : '☐'} Simpan ke profile kendaraan
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* === KASUS 2: MOTOR LEBIH DARI 1 === */}
          {mode === 'MULTIPLE' && (
            <>
              {vehicles.map(v => (
                <TouchableOpacity
                  key={v.id}
                  onPress={() => selectVehicle(v.id)}
                  style={{ marginBottom: 8 }}
                >
                  <View style={styles.valueBox}>
                    <Text style={styles.valueText}>
                      {v.merk} {v.model} ({v.tahun})
                      {selectedId === v.id ? ' ✓' : ''}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* === KASUS 3: HANYA 1 MOTOR === */}
          {mode === 'SINGLE' && selectedVehicle && (
            <>
              <View style={styles.detailRow}>
                <Text style={styles.detailKey}>Jenis</Text>
                <Text style={styles.detailValue}>{selectedVehicle.jenis}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailKey}>Merk</Text>
                <Text style={styles.detailValue}>{selectedVehicle.merk}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailKey}>Model</Text>
                <Text style={styles.detailValue}>{selectedVehicle.model}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailKey}>CC</Text>
                <Text style={styles.detailValue}>{selectedVehicle.cc}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailKey}>Tahun</Text>
                <Text style={styles.detailValue}>{selectedVehicle.tahun}</Text>
              </View>

              <Text style={styles.autoNote}>
                Data ini akan otomatis terisi dari Profile kendaraan
              </Text>
            </>
          )}
        </View>

        {/* ===== CTA ===== */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('MechanicList')}
        >
          <Text style={styles.ctaText}>Cari Mekanik</Text>
        </TouchableOpacity>
      </ScrollView>
    </MainLayout>
  );
};

export default EmergencyScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 140,
  },

  alertBox: {
    backgroundColor: '#FFF4E5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 13,
    color: '#6B7280',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    elevation: 4,
  },

  label: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },

  inputBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
  },

  inputBoxFocused: {
    borderColor: '#8B5E3C',
  },

  inputText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    padding: 0,
  },

  inputLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 6,
  },

  valueBox: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '600',
  },
  hint: {
    marginTop: 6,
    fontSize: 11,
    color: '#6B7280',
  },

  uploadBox: {
    height: 120,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#9CA3AF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 28,
    fontWeight: '700',
  },
  uploadText: {
    marginTop: 6,
    fontSize: 13,
    color: '#374151',
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailKey: {
    color: '#6B7280',
    fontSize: 13,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  autoNote: {
    marginTop: 8,
    fontSize: 11,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },

  ctaButton: {
    backgroundColor: '#8B5E3C',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    elevation: 6,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});
