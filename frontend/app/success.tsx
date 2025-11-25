import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessScreen() {
  return (
    <LinearGradient
      colors={['#FFEBF3', '#FFFFFF']} 
      style={styles.container}
    >
      <View style={styles.card}>
        
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/medguide.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.badge}>
            <Ionicons name="checkmark" size={14} color="#fff" />
          </View>
        </View>
        
        <Text style={styles.title}>All Set!</Text>
        <Text style={styles.subtitle}>Your account has been created successfully.</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.buttonText}>Log In Now</Text>
        </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingVertical: 48,
    paddingHorizontal: 32,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#FFB3D1',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    backgroundColor: '#4CAF50', 
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#1A1A1A', 
    borderRadius: 16,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
