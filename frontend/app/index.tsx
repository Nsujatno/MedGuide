import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function StartScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.9}
      onPress={() => router.push('/login')}
    >
      <View style={styles.content}>
        <Image 
          source={require('../assets/images/medguide.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Welcome to</Text>
        <View style={styles.brandBadge}>
          <Text style={styles.brandText}>Medguide</Text>
        </View>
        <Text style={styles.tagline}>Your smart guide</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  brandBadge: {
    backgroundColor: '#FFB3D1', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  brandText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
});

