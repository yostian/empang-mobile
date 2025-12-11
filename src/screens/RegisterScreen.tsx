import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  Keyboard,
  Platform,
  AccessibilityInfo,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/stacks/AuthStack';

type Nav = NativeStackNavigationProp<AuthStackParamList>;

/* ----------------- Theme Provider ----------------- */
type Theme = 'light' | 'dark';
const ThemeContext = createContext({
  theme: 'light' as Theme,
  toggle: () => {},
});

function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // placeholder for possible system-detect logic
    AccessibilityInfo.isReduceMotionEnabled().then(() => {});
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggle: () => setTheme(t => (t === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/* ----------------- Utilities ----------------- */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

/* ----------------- Particle Background ----------------- */
function Particles({ theme }: { theme: Theme }) {
  const dots = useMemo(
    () =>
      new Array(10).fill(0).map((_, i) => ({
        id: i,
        left: Math.random() * 350,
        top: Math.random() * 800,
        size: 6 + Math.random() * 18,
        speed: 8 + Math.random() * 12,
        delay: Math.random() * 4000,
        hue: Math.floor(180 + Math.random() * 120),
      })),
    [],
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {dots.map(d => (
        <FloatingDot key={d.id} {...d} theme={theme} />
      ))}
    </View>
  );
}

function FloatingDot({
  left,
  top,
  size,
  speed,
  delay,
  hue,
  theme,
}: {
  left: number;
  top: number;
  size: number;
  speed: number;
  delay: number;
  hue: number;
  theme: Theme;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: speed * 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
          delay,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: speed * 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [anim, speed, delay]);

  const translateY = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -30, 0],
  });

  const opacity = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 0.95, 0.6],
  });

  const bg = `hsl(${hue} 80% ${theme === 'dark' ? '50%' : '70%'})`;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left,
        top,
        transform: [{ translateY }],
        opacity,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bg,
        shadowColor: bg,
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 6,
      }}
    />
  );
}

/* ----------------- FloatingLabelInput (with shake & pulse) ----------------- */
function FloatingInput({
  label,
  secure = false,
  keyboardType = 'default',
  value,
  onChange,
  onValidate,
  multiline = false,
  maxLength,
  accessibilityLabel,
}: {
  label: string;
  secure?: boolean;
  keyboardType?: any;
  value: string;
  onChange: (v: string) => void;
  onValidate?: (v: string) => boolean;
  multiline?: boolean;
  maxLength?: number;
  accessibilityLabel?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const shake = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shake, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shake, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [error, shake, pulse]);

  useEffect(() => {
    if (onValidate) {
      const ok = onValidate(value);
      setError(ok ? null : 'Invalid');
    } else setError(null);
  }, [value, onValidate]);

  const translateX = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: [-6, 6],
  });

  const borderColor = error ? '#ef4444' : focused ? '#34d399' : '#e5e7eb';

  return (
    <Animated.View style={{ transform: [{ translateX }], marginBottom: 12 }}>
      <Text className="mb-1 font-semibold text-gray-700">{label}</Text>
      <Animated.View
        style={{
          borderRadius: 16,
          borderWidth: 1,
          borderColor,
          paddingHorizontal: 14,
          paddingVertical: multiline ? 12 : 8,
          backgroundColor: '#ffffff',
          shadowColor: focused ? '#34d399' : '#000',
          shadowOpacity: focused ? 0.12 : 0.06,
          shadowRadius: focused ? 12 : 6,
          elevation: focused ? 8 : 3,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChange}
          secureTextEntry={secure}
          keyboardType={keyboardType}
          placeholder={label}
          placeholderTextColor="#9ca3af"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          multiline={multiline}
          maxLength={maxLength}
          accessibilityLabel={accessibilityLabel ?? label}
          className="text-gray-700"
        />
      </Animated.View>

      {error && (
        <Animated.Text
          className="mt-2 text-sm text-red-500 font-medium"
          style={{
            transform: [
              {
                scale: pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.02],
                }),
              },
            ],
          }}
        >
          {label} tidak valid
        </Animated.Text>
      )}
    </Animated.View>
  );
}

/* ----------------- Shimmer Skeleton (fixed) ----------------- */
function Shimmer({ width, height = 16 }: { width?: number; height?: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View
      style={[
        {
          overflow: 'hidden',
          borderRadius: 8,
          backgroundColor: '#f3f4f6',
        },
        width ? { width } : { alignSelf: 'stretch' },
      ]}
    >
      <Animated.View
        style={{
          width: 120,
          height,
          transform: [{ translateX }],
          backgroundColor: 'rgba(255,255,255,0.6)',
          opacity: 0.9,
        }}
      />
    </View>
  );
}

/* ----------------- PlasmaButton (neon + micro-interaction) ----------------- */
function PlasmaButton({
  label,
  onPress,
  loading,
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [glow]);

  const shadowOpacity = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.18, 0.5],
  });
  const shadowRadius = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 22],
  });

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 140,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        shadowColor: '#10b981',
        shadowOpacity,
        shadowRadius,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        className="rounded-3xl overflow-hidden"
        accessibilityRole="button"
      >
        <View
          style={{
            paddingVertical: 14,
            paddingHorizontal: 18,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(16,185,129,0.06)',
            }}
          />
          <Text className="text-white font-bold text-lg">
            {loading ? 'Memproses...' : label}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

/* ----------------- Main Register Screen (GOD MODE) ----------------- */
export default function RegisterScreen() {
  const navigation = useNavigation<Nav>();
  const { theme, toggle } = useTheme();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const entrance = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  const bgAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 9000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(bgAnim, {
          toValue: 0,
          duration: 9000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [bgAnim]);

  const bgColor1 = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      theme === 'dark' ? '#071013' : '#ecfeff',
      theme === 'dark' ? '#06202a' : '#ecfccb',
    ],
  });
  const bgColor2 = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      theme === 'dark' ? '#001219' : '#e0f2fe',
      theme === 'dark' ? '#04212e' : '#fef3c7',
    ],
  });

  const strength = passwordStrength(password);

  function validateAll() {
    const errors: string[] = [];
    if (!fullname.trim()) errors.push('Nama kosong');
    if (!emailRegex.test(email)) errors.push('Email invalid');
    if (password.length < 8) errors.push('Password minimal 8 karakter');
    if (password !== confirm) errors.push('Password tidak sama');
    if (!phone.replace(/\D/g, '').length) errors.push('Phone kosong');
    if (!address.trim()) errors.push('Alamat kosong');
    return errors;
  }

  async function handleRegister() {
    Keyboard.dismiss();
    const errs = validateAll();
    if (errs.length) {
      AccessibilityInfo.announceForAccessibility(errs.join(', '));
      return;
    }
    setLoading(true);
    await new Promise<void>(resolve => setTimeout(resolve, 1400));
    setLoading(false);
    navigation.navigate('Login');
  }

  return (
    <ThemeProvider>
      <Animated.View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: bgColor1, position: 'absolute' },
          ]}
        />
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: bgColor2, position: 'absolute', opacity: 0.6 },
          ]}
        />

        <Particles theme={theme} />

        <Animated.ScrollView
          contentContainerStyle={{
            padding: 24,
            paddingTop: Platform.OS === 'ios' ? 64 : 40,
          }}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <Animated.View
            style={{
              transform: [
                {
                  translateY: entrance.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
              opacity: entrance,
            }}
          >
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-4xl font-extrabold text-white">
                  Buat Akun
                </Text>
                <Text className="text-white/90 mt-1">
                  Mulai pengalaman Empangmu
                </Text>
              </View>

              <TouchableOpacity
                onPress={toggle}
                className="px-3 py-2 rounded-xl bg-white/10"
                accessibilityRole="button"
              >
                <Text className="text-white font-semibold">
                  {theme === 'light' ? 'Dark' : 'Light'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View
            style={{
              backgroundColor:
                theme === 'dark'
                  ? 'rgba(255,255,255,0.04)'
                  : 'rgba(255,255,255,0.92)',
              borderRadius: 20,
              padding: 18,
              shadowColor: '#000',
              shadowOpacity: 0.12,
              shadowRadius: 20,
              elevation: 8,
              marginBottom: 18,
            }}
          >
            <FloatingInput
              label="Nama Lengkap"
              value={fullname}
              onChange={setFullname}
            />
            <FloatingInput
              label="Email"
              value={email}
              onChange={setEmail}
              onValidate={v => emailRegex.test(v)}
              keyboardType="email-address"
            />
            <FloatingInput
              label="Password"
              value={password}
              onChange={setPassword}
              secure
            />
            <FloatingInput
              label="Konfirmasi Password"
              value={confirm}
              onChange={setConfirm}
              secure
            />
            <FloatingInput
              label="Nomor Telepon"
              value={phone}
              onChange={setPhone}
              keyboardType="phone-pad"
            />
            <FloatingInput
              label="Alamat"
              value={address}
              onChange={setAddress}
              multiline
            />

            <View className="mt-3 mb-2">
              <Text
                className={`text-sm ${
                  strength >= 3
                    ? 'text-green-600'
                    : strength === 2
                    ? 'text-yellow-600'
                    : 'text-red-500'
                }`}
              >
                Kekuatan password:
              </Text>
              <View className="flex-row mt-2">
                {[0, 1, 2, 3].map(i => (
                  <View
                    key={i}
                    style={{
                      flex: 1,
                      height: 6,
                      marginRight: i < 3 ? 6 : 0,
                      borderRadius: 4,
                      backgroundColor:
                        i <= strength - 1
                          ? i >= 2
                            ? '#16a34a'
                            : '#f59e0b'
                          : '#e6e6e6',
                    }}
                  />
                ))}
              </View>
            </View>

            {loading ? (
              <View className="mt-4">
                <Shimmer height={44} />
              </View>
            ) : (
              <View className="mt-4">
                <PlasmaButton
                  label="Daftar Sekarang"
                  onPress={handleRegister}
                  loading={loading}
                />
              </View>
            )}
          </Animated.View>

          <View className="mb-8">
            <Text className="text-white/90 mb-3">Daftar cepat</Text>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity className="flex-1 rounded-xl py-3 bg-white/10 items-center justify-center mr-3">
                <Image
                  source={{
                    uri: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.png',
                  }}
                  style={{ width: 22, height: 22, marginBottom: 2 }}
                />
                <Text className="text-white mt-1 font-semibold">Google</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 rounded-xl py-3 bg-white/10 items-center justify-center">
                <Image
                  source={{
                    uri: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.png',
                  }}
                  style={{ width: 22, height: 22, marginBottom: 2 }}
                />
                <Text className="text-white mt-1 font-semibold">Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-40 items-center">
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-white font-medium">
                Sudah punya akun? Login
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.ScrollView>
      </Animated.View>
    </ThemeProvider>
  );
}

/* ----------------- Small helpers ----------------- */
const StyleSheetAbs = {
  fill: {
    position: 'absolute' as const,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};
