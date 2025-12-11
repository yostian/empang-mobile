import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/stacks/AuthStack';

import LinearGradient from 'react-native-linear-gradient';

type Nav = NativeStackNavigationProp<AuthStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white dark:bg-neutral-900"
    >
      {/* HEADER */}
      <LinearGradient
        colors={['#0EA5E9', '#6366F1', '#8B5CF6']}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: 190,
          width: '100%',
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.Text
          entering={FadeInDown.delay(120).duration(600)}
          className="text-white text-4xl font-extrabold tracking-wider"
        >
          Masuk
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(300).duration(600)}
          className="text-white/80 text-base mt-2"
        >
          Selamat datang kembali 👋
        </Animated.Text>
      </LinearGradient>

      {/* FORM */}
      <View className="px-6 mt-10">
        <Animated.View
          entering={FadeInUp.delay(200).duration(500)}
          className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg"
          style={{
            elevation: 10,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
          }}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            className="w-full bg-gray-100 dark:bg-neutral-700 text-black dark:text-white rounded-xl px-4 py-3 mb-4"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            className="w-full bg-gray-100 dark:bg-neutral-700 text-black dark:text-white rounded-xl px-4 py-3 mb-2"
          />

          {/* Lupa Password */}
          <TouchableOpacity className="mb-4 items-end">
            <Text className="text-blue-600 dark:text-blue-400 font-medium">
              Lupa Password?
            </Text>
          </TouchableOpacity>

          {/* TOMBOL LOGIN */}
          <TouchableOpacity className="w-full py-3 bg-blue-600 rounded-xl active:opacity-80">
            <Text className="text-white text-center text-lg font-bold">
              Login
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* DIVIDER */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-gray-300 dark:bg-neutral-700" />
          <Text className="px-4 text-gray-500 dark:text-gray-400">atau</Text>
          <View className="flex-1 h-[1px] bg-gray-300 dark:bg-neutral-700" />
        </View>

        {/* Google */}
        <TouchableOpacity className="flex-row items-center border border-gray-300 dark:border-neutral-700 w-full py-3 rounded-xl px-4 mb-3 active:opacity-70">
          <Image
            source={{
              uri: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.png',
            }}
            className="w-6 h-6 mr-3"
          />
          <Text className="text-gray-700 dark:text-gray-200 font-medium">
            Login dengan Google
          </Text>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity className="flex-row items-center border border-gray-300 dark:border-neutral-700 w-full py-3 rounded-xl px-4 active:opacity-70">
          <Image
            source={{
              uri: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.png',
            }}
            className="w-6 h-6 mr-3"
          />
          <Text className="text-gray-700 dark:text-gray-200 font-medium">
            Login dengan Facebook
          </Text>
        </TouchableOpacity>

        {/* KE REGISTER */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          className="mt-8"
        >
          <Text className="text-blue-600 dark:text-blue-400 text-center font-semibold">
            Belum punya akun? Daftar
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
