import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

const GenericHeader: React.FC<Props> = ({
  title,
  subtitle,
  align = 'center',
}) => {
  return (
    <LinearGradient
      colors={['#dac8acff', '#C8A27E', '#8B5E3C']}
      style={styles.container}
    >
      <View
        style={{ alignItems: align === 'center' ? 'center' : 'flex-start' }}
      >
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </LinearGradient>
  );
};

export default GenericHeader;

const styles = StyleSheet.create({
  container: {
    height: 180,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 6,
    color: '#f3f3f3',
    fontSize: 16,
    fontWeight: '600',
  },
});
