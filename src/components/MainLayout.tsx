import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

type Props = {
  header?: React.ReactNode;
  children: React.ReactNode;
  showBottomNav?: boolean;
};

const MainLayout: React.FC<Props> = ({
  header,
  children,
  showBottomNav = true,
}) => {
  return (
    <SafeAreaView style={styles.safe}>
      {header}
      <View style={styles.content}>{children}</View>
      {showBottomNav && <View style={styles.bottomNav} />}
    </SafeAreaView>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#dac8acff' },
  content: { flex: 1 },
  bottomNav: {
    height: 64,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
});
