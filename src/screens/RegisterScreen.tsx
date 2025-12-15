import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';
import { API_BASE_URL } from '../helpers/apiHelper';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  function handleRegister() {
    if (!fullname || !username || !password) {
      setModalMsg('Lengkapi semua data ya');
      setModalSuccess(false);
      setShowModal(true);
      return;
    }

    if (password !== confirm) {
      setModalMsg('Password tidak sama');
      setModalSuccess(false);
      setShowModal(true);
      return;
    }

    setModalMsg('Registrasi berhasil! Silakan login');
    setModalSuccess(true);
    setShowModal(true);

    setTimeout(() => {
      setShowModal(false);
      navigation.navigate('Login');
    }, 1200);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 24 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <LinearGradient
            colors={['#dac8acff', '#C8A27E', '#8B5E3C']}
            style={styles.header}
          >
            <Text style={styles.headerTitle}>Buat Akun</Text>
            <Text style={styles.headerSubtitle}>
              Lengkapi data untuk mendaftar
            </Text>
          </LinearGradient>

          {/* CONTENT */}
          <View style={styles.contentWrap}>
            <View style={styles.card}>
              <Text style={styles.label}>Nama Lengkap</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  value={fullname}
                  onChangeText={setFullname}
                  placeholder="Nama lengkap"
                  style={styles.input}
                />
              </View>

              <Text style={[styles.label, { marginTop: 16 }]}>Username</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Username"
                  autoCapitalize="none"
                  style={styles.input}
                />
              </View>

              <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry={!showPass}
                  style={styles.input}
                />
              </View>

              <Text style={[styles.label, { marginTop: 16 }]}>
                Konfirmasi Password
              </Text>
              <View style={styles.inputWrap}>
                <TextInput
                  value={confirm}
                  onChangeText={setConfirm}
                  placeholder="••••••••"
                  secureTextEntry={!showPass}
                  style={styles.input}
                />
              </View>

              <TouchableOpacity
                style={styles.showPass}
                onPress={() => setShowPass(v => !v)}
              >
                <Text style={styles.showPassText}>
                  {showPass ? 'Sembunyikan Password' : 'Lihat Password'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleRegister} activeOpacity={0.9}>
                <LinearGradient
                  colors={['#dac8acff', '#C8A27E', '#8B5E3C']}
                  style={styles.registerButton}
                >
                  <Text style={styles.registerButtonText}>Daftar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginText}>Sudah punya akun? Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* MODAL */}
        <Modal visible={showModal} transparent animationType="fade">
          <View style={styles.modalWrap}>
            <View style={styles.modalCard}>
              <Text
                style={[
                  styles.modalTitle,
                  { color: modalSuccess ? 'green' : 'red' },
                ]}
              >
                {modalSuccess ? 'Berhasil' : 'Error'}
              </Text>
              <Text>{modalMsg}</Text>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: '#fff', fontWeight: '700' }}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#dac8acff' },

  header: {
    height: 200,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#f5f5f5',
    fontSize: 22,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#f5f5f5',
    fontSize: 16,
    marginTop: 6,
    fontWeight: '600',
  },

  contentWrap: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -40,
  },

  card: {
    borderRadius: 22,
    padding: 20,
    backgroundColor: '#ddddddff',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
  },

  label: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },

  inputWrap: {
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  input: {
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    color: '#111827',
  },

  showPass: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  showPassText: {
    color: '#8B5E3C',
    fontWeight: '600',
  },

  registerButton: {
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },

  loginLink: {
    marginTop: 18,
    alignItems: 'center',
  },
  loginText: {
    color: '#8B5E3C',
    fontWeight: '700',
  },

  modalWrap: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalBtn: {
    marginTop: 14,
    backgroundColor: '#8B5E3C',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
});
