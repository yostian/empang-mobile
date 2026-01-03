import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export default function ServiceScreen() {
  // ===== SERVICE =====
  const serviceList = [
    { id: 1, name: 'Tune Up Ringan', price: 150000 },
    { id: 2, name: 'Ganti Oli', price: 80000 },
    { id: 3, name: 'Service Rem', price: 120000 },
  ];

  const [selectedService, setSelectedService] = useState<any>(null);

  // ===== DATE & TIME =====
  const [dateLabel, setDateLabel] = useState<string | null>(null);
  const [dateValue, setDateValue] = useState<string | null>(null);
  const [timeLabel, setTimeLabel] = useState<string | null>(null);
  const [timeValue, setTimeValue] = useState<string | null>(null);

  const [showService, setShowService] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  // ===== DATA =====
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const d = dayjs().add(i, 'day');
    return {
      label: d.format('dddd, D MMM YYYY'),
      value: d.format('YYYY-MM-DD'),
    };
  });

  const availableTimes = Array.from({ length: 8 }).map((_, i) => {
    const t = dayjs()
      .hour(9 + i)
      .minute(0);
    return {
      label: t.format('HH:mm'),
      value: t.format('HH:mm'),
    };
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>EM-Service</Text>

      {/* ===== JENIS SERVICE ===== */}
      <View style={styles.card}>
        <Text style={styles.label}>🔧 Jenis Service</Text>

        <TouchableOpacity
          style={styles.valueBox}
          onPress={() => setShowService(true)}
        >
          <Text style={styles.valueText}>
            {selectedService ? selectedService.name : 'Pilih jenis service'}
          </Text>
        </TouchableOpacity>

        {selectedService && (
          <Text style={styles.price}>
            Rp {selectedService.price.toLocaleString('id-ID')}
          </Text>
        )}
      </View>

      {/* ===== JADWAL ===== */}
      <View style={styles.card}>
        <Text style={styles.label}>📅 Jadwal Service</Text>

        <TouchableOpacity
          style={styles.valueBox}
          onPress={() => setShowDate(true)}
        >
          <Text style={styles.valueText}>{dateLabel ?? 'Pilih tanggal'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.valueBox}
          onPress={() => dateValue && setShowTime(true)}
        >
          <Text style={styles.valueText}>{timeLabel ?? 'Pilih jam'}</Text>
        </TouchableOpacity>

        {!dateValue && (
          <Text style={styles.note}>Pilih tanggal terlebih dahulu</Text>
        )}
      </View>

      {/* ===== LANJUT ===== */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Pilih Mekanik</Text>
      </TouchableOpacity>

      {/* ================= MODALS ================= */}

      {/* SERVICE */}
      <Modal transparent visible={showService} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowService(false)}
        >
          <View style={styles.modalBox}>
            {serviceList.map(s => (
              <TouchableOpacity
                key={s.id}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedService(s);
                  setShowService(false);
                }}
              >
                <Text style={styles.valueText}>{s.name}</Text>
                <Text style={styles.priceSmall}>
                  Rp {s.price.toLocaleString('id-ID')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* DATE */}
      <Modal transparent visible={showDate} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowDate(false)}
        >
          <View style={styles.modalBox}>
            {availableDates.map(d => (
              <TouchableOpacity
                key={d.value}
                style={styles.modalItem}
                onPress={() => {
                  setDateLabel(d.label);
                  setDateValue(d.value);
                  setTimeLabel(null);
                  setTimeValue(null);
                  setShowDate(false);
                }}
              >
                <Text style={styles.valueText}>{d.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* TIME */}
      <Modal transparent visible={showTime} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowTime(false)}
        >
          <View style={styles.modalBox}>
            {availableTimes.map(t => (
              <TouchableOpacity
                key={t.value}
                style={styles.modalItem}
                onPress={() => {
                  setTimeLabel(t.label);
                  setTimeValue(t.value);
                  setShowTime(false);
                }}
              >
                <Text style={styles.valueText}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  valueBox: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  valueText: {
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0A7AFF',
    marginTop: 4,
  },
  priceSmall: {
    fontSize: 12,
    color: '#0A7AFF',
  },
  note: {
    fontSize: 12,
    color: '#888',
  },
  button: {
    backgroundColor: '#0A7AFF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modalBox: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
});
