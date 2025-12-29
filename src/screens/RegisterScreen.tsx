import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  Modal,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showPass, setShowPass] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  /* ================= PASSWORD STRENGTH ================= */
  const strengthAnim = useRef(new Animated.Value(0)).current;

  const passwordStrength = useMemo(() => {
    if (!password) return { label: '', color: '#9CA3AF', level: 0 };

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    if (
      password.length >= 8 &&
      hasUpper &&
      hasLower &&
      hasNumber &&
      hasSymbol
    ) {
      return { label: 'Password Kuat', color: '#16A34A', level: 3 };
    }

    if (password.length >= 6 && hasLower && hasNumber) {
      return { label: 'Password Sedang', color: '#F59E0B', level: 2 };
    }

    return { label: 'Password Lemah', color: '#DC2626', level: 1 };
  }, [password]);

  useEffect(() => {
    Animated.timing(strengthAnim, {
      toValue: passwordStrength.level,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [passwordStrength.level]);

  const strengthWidth = strengthAnim.interpolate({
    inputRange: [0, 3],
    outputRange: ['0%', '100%'],
  });

  /* ================= VALIDATION ================= */
  const confirmMismatch =
    confirm.length > 0 && password.length > 0 && confirm !== password;

  const isPhoneValid = phone.startsWith('08') || phone.startsWith('628');

  const isFullnameValid = fullname.length > 0 && fullname.length <= 50;

  const isFormValid =
    isFullnameValid &&
    emailRegex.test(email) &&
    passwordStrength.level >= 2 &&
    !confirmMismatch &&
    isPhoneValid &&
    address.length > 0;

  /* ================= REGISTER ================= */
  function handleRegister() {
    if (!isFormValid) return;

    setModalMsg('Registrasi berhasil');
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
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient
            colors={['#dac8acff', '#C8A27E', '#8B5E3C']}
            style={styles.header}
          >
            <Text style={styles.headerTitle}>Buat Akun</Text>
            <Text style={styles.headerSubtitle}>
              Lengkapi data untuk mendaftar
            </Text>
          </LinearGradient>

          <View style={styles.contentWrap}>
            <View style={styles.card}>
              {/* NAMA */}
              <Text style={styles.label}>Nama Lengkap</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  value={fullname}
                  onChangeText={setFullname}
                  placeholder="Nama lengkap"
                  style={styles.input}
                />
              </View>
              {!isFullnameValid && fullname.length > 0 && (
                <Text style={styles.errorText}>Maksimal 50 karakter</Text>
              )}

              {/* EMAIL */}
              <Text style={[styles.label, { marginTop: 16 }]}>Email</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="email@example.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.input}
                />
              </View>

              {/* PASSWORD */}
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

              {password.length > 0 && (
                <View style={styles.alertWrap}>
                  <View style={styles.alertBarBg}>
                    <Animated.View
                      style={[
                        styles.alertBar,
                        {
                          width: strengthWidth,
                          backgroundColor: passwordStrength.color,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.alertText,
                      { color: passwordStrength.color },
                    ]}
                  >
                    {passwordStrength.label}
                  </Text>
                </View>
              )}

              {/* CONFIRM */}
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

              {confirmMismatch && (
                <View style={styles.alertWrap}>
                  <View style={styles.alertBarBg}>
                    <View
                      style={[
                        styles.alertBar,
                        { width: '100%', backgroundColor: '#DC2626' },
                      ]}
                    />
                  </View>
                  <Text style={[styles.alertText, { color: '#DC2626' }]}>
                    Password tidak sama
                  </Text>
                </View>
              )}

              {/* PHONE */}
              <Text style={[styles.label, { marginTop: 16 }]}>
                Nomor Telepon
              </Text>
              <View style={styles.inputWrap}>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="08xxxxxxxxxx / 628xxxxxxxxxx"
                  keyboardType="phone-pad"
                  style={styles.input}
                />
              </View>
              {!isPhoneValid && phone.length > 0 && (
                <Text style={styles.errorText}>
                  Nomor harus diawali 08 atau 628
                </Text>
              )}

              {/* ADDRESS */}
              <Text style={[styles.label, { marginTop: 16 }]}>Alamat</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Alamat lengkap"
                  multiline
                  style={[styles.input, { height: 80 }]}
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

              {/* BUTTON */}
              <TouchableOpacity
                onPress={handleRegister}
                activeOpacity={0.9}
                disabled={!isFormValid}
              >
                <LinearGradient
                  colors={
                    isFormValid
                      ? ['#dac8acff', '#C8A27E', '#8B5E3C']
                      : ['#D1D5DB', '#9CA3AF']
                  }
                  style={styles.registerButton}
                >
                  <Text style={styles.registerButtonText}>Daftar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* MODAL */}
        <Modal visible={showModal} transparent animationType="fade">
          <View style={styles.modalWrap}>
            <View style={styles.modalCard}>
              <Text style={[styles.modalTitle, { color: 'green' }]}>
                Berhasil
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

/* ----------------- Styles ----------------- */
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

  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
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

  alertWrap: { marginTop: 8 },
  alertBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
  },
  alertBar: { height: '100%', borderRadius: 999 },
  alertText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
  },
});
