import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setModalMessage('Email dan password wajib diisi');
      setShowModal(true);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // ===== LOGIN DUMMY =====
      if (email === 'admin@gmail.com' && password === '123456') {
        setModalMessage('Login berhasil');
        setShowModal(true);

        setTimeout(() => {
          setShowModal(false);
          navigation.replace('Home'); // redirect ke Home
        }, 800);
      } else {
        setModalMessage('Email atau password salah');
        setShowModal(true);
      }
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <LinearGradient
            colors={['#dac8acff', '#C8A27E', '#8B5E3C']}
            style={styles.header}
          >
            <Text style={styles.headerTitle}>Selamat Datang</Text>
            <Text style={styles.headerSubtitle}>Silahkan Login</Text>
          </LinearGradient>

          {/* CONTENT */}
          <View style={styles.contentWrap}>
            <View style={styles.card}>
              {/* EMAIL */}
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrap}>
                <Image
                  source={require('../assets/icons/mail.png')}
                  style={styles.iconSmall}
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="email@example.com"
                  placeholderTextColor="#A1A1AA"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                  textContentType="emailAddress"
                  style={styles.input}
                />
              </View>

              {/* PASSWORD */}
              <Text style={[styles.label, { marginTop: 18 }]}>Password</Text>
              <View style={styles.inputWrap}>
                <Image
                  source={require('../assets/icons/lock.png')}
                  style={styles.iconSmall}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#A1A1AA"
                  secureTextEntry={!showPass}
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.eyeTouch}
                  onPress={() => setShowPass(v => !v)}
                >
                  <Image
                    source={
                      showPass
                        ? require('../assets/icons/eye.png')
                        : require('../assets/icons/eye-off.png')
                    }
                    style={styles.iconSmall}
                  />
                </TouchableOpacity>
              </View>

              {/* LOGIN BUTTON */}
              <TouchableOpacity
                activeOpacity={0.9}
                disabled={loading}
                onPress={handleLogin}
              >
                <LinearGradient
                  colors={['#dac8acff', '#C8A27E', '#8B5E3C']}
                  style={styles.loginButton}
                >
                  <Text style={styles.loginButtonText}>
                    {loading ? 'Login...' : 'Login'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* DIVIDER */}
              <View style={styles.dividerWrap}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>atau</Text>
                <View style={styles.line} />
              </View>

              {/* SOCIAL */}
              <View style={styles.socialGroup}>
                <TouchableOpacity style={styles.socialBtn}>
                  <Image
                    source={require('../assets/icons/google.png')}
                    style={styles.socialIcon}
                  />
                  <Text style={styles.socialText}>Login dengan Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialBtn}>
                  <Image
                    source={require('../assets/icons/facebook.png')}
                    style={styles.socialIcon}
                  />
                  <Text style={styles.socialText}>Login dengan Facebook</Text>
                </TouchableOpacity>
              </View>

              {/* REGISTER */}
              <TouchableOpacity
                style={styles.registerOuter}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('Register')}
              >
                <LinearGradient
                  colors={['#dac8acff', '#C8A27E', '#8B5E3C']}
                  style={styles.registerWrap}
                >
                  <Text style={styles.registerText}>
                    Belum punya akun?{' '}
                    <Text style={styles.registerBold}>Daftar</Text>
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* MODAL */}
        <Modal visible={showModal} transparent animationType="fade">
          <View style={styles.modalWrap}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>{modalMessage}</Text>
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

export default LoginScreen;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#dac8acff' },

  header: {
    height: 200,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  headerSubtitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 6,
    fontWeight: '600',
  },

  contentWrap: { flex: 1, paddingHorizontal: 20, marginTop: 14 },

  card: {
    borderRadius: 22,
    padding: 20,
    backgroundColor: '#ddddddff',
    elevation: 10,
  },

  label: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingLeft: 12,
    paddingRight: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    color: '#111827',
  },

  iconSmall: { width: 20, height: 20, marginRight: 12 },

  eyeTouch: { position: 'absolute', right: 1, padding: 6 },

  loginButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },

  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: { flex: 1, height: 1, backgroundColor: '#D1D5DB' },
  dividerText: { paddingHorizontal: 14, color: '#6B7280' },

  socialGroup: { marginBottom: 10 },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    backgroundColor: '#e2e1e1ff',
    borderRadius: 14,
    marginBottom: 12,
    paddingHorizontal: 14,
  },

  socialIcon: { width: 22, height: 22, marginRight: 12 },
  socialText: { fontSize: 15, fontWeight: '600' },

  registerOuter: { marginTop: 8 },
  registerWrap: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  registerText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  registerBold: { fontWeight: '900' },

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
