import React, { useState, useEffect, useRef } from 'react';
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
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [focusField, setFocusField] = useState<null | 'email' | 'password'>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  /* ===== LOADING DOT ===== */
  const [dots, setDots] = useState('');
  useEffect(() => {
    if (!loading) return;
    const i = setInterval(
      () => setDots(p => (p.length >= 3 ? '' : p + '.')),
      400,
    );
    return () => clearInterval(i);
  }, [loading]);

  /* ===== BUTTON SHAKE ===== */
  const slideAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!loading) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 6,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -6,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [loading]);

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
            <Text style={styles.headerTitle}>Selamat Datang</Text>
            <Text style={styles.headerSubtitle}>Silahkan Login</Text>
          </LinearGradient>

          {/* CONTENT */}
          <View style={styles.contentWrap}>
            <View style={styles.card}>
              {/* USERNAME */}
              <Text style={styles.label}>Username</Text>
              <View
                style={[
                  styles.inputWrap,
                  focusField === 'email' && styles.inputWrapFocus,
                ]}
              >
                <Image
                  source={require('../assets/icons/mail.png')}
                  style={styles.iconSmall}
                />
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="username"
                  placeholderTextColor="#A1A1AA"
                  autoCapitalize="none"
                  style={styles.input}
                  onFocus={() => setFocusField('email')}
                  onBlur={() => setFocusField(null)}
                />
              </View>

              {/* PASSWORD */}
              <Text style={[styles.label, { marginTop: 18 }]}>Password</Text>
              <View
                style={[
                  styles.inputWrap,
                  focusField === 'password' && styles.inputWrapFocus,
                ]}
              >
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
                  onFocus={() => setFocusField('password')}
                  onBlur={() => setFocusField(null)}
                />

                <TouchableOpacity
                  style={styles.eyeTouch}
                  onPress={() => setShowPass(v => !v)}
                >
                  <Image
                    source={
                      showPass
                        ? require('../assets/icons/eye-off.png')
                        : require('../assets/icons/eye.png')
                    }
                    style={styles.iconSmall}
                  />
                </TouchableOpacity>
              </View>

              {/* LOGIN BUTTON */}
              <TouchableOpacity
                activeOpacity={0.9}
                disabled={loading}
                onPress={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setModalMessage('Login berhasil!');
                    setModalSuccess(true);
                    setShowModal(true);
                  }, 1500);
                }}
              >
                <LinearGradient
                  colors={['#dac8acff', '#C8A27E', '#8B5E3C']}
                  style={styles.loginButton}
                >
                  <Animated.View
                    style={{
                      transform: loading ? [{ translateX: slideAnim }] : [],
                    }}
                  >
                    <Text style={styles.loginButtonText}>
                      {loading ? `Login${dots}` : 'Login'}
                    </Text>
                  </Animated.View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
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
                {modalSuccess ? 'Berhasil' : 'Gagal'}
              </Text>
              <Text>{modalMessage}</Text>
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

/* styles */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#dac8acff' },
  container: { flex: 1 },

  header: {
    height: 200,
    width: '100%',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: { color: '#e8e8e8ff', fontSize: 22, fontWeight: '800' },
  headerSubtitle: {
    color: '#e8e8e8ff',
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingLeft: 12,
    paddingRight: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  inputWrapFocus: {
    borderColor: '#8B5E3C',
    shadowColor: '#8B5E3C',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },

  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#111827',
  },

  iconSmall: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 12,
  },

  eyeTouch: { position: 'absolute', right: 1, padding: 6 },

  forgotWrap: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 8,
  },
  forgotText: { color: '#8B5E3C', fontWeight: '600' },

  loginButton: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },

  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  line: { flex: 1, height: 1, backgroundColor: '#D1D5DB' },
  dividerText: {
    paddingHorizontal: 14,
    color: '#6B7280',
    fontWeight: '600',
  },

  socialGroup: { width: '100%', marginBottom: 10 },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 14,
    backgroundColor: '#e2e1e1ff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#979a9cff',
    marginBottom: 12,
  },
  socialIcon: { width: 22, height: 22, marginRight: 12 },
  socialText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  registerOuter: { marginTop: 8, width: '100%' },
  registerWrap: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  registerText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  registerBold: { fontWeight: '900' },

  /* ===== MODAL ===== */
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
    elevation: 10,
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
