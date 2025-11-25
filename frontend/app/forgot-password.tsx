import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    Alert.alert(
      "Check your email", 
      "We've sent a password reset link to your email address.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandText}>Medguide</Text>
            </View>
            <Image 
              source={require('../assets/images/medguide.png')} 
              style={styles.peekingLogo} 
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reset Password</Text>
          
          <Text style={styles.instructions}>
            Enter the email associated with your account and we'll send you a link to reset your password.
          </Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={18} color="#999" style={styles.inputIcon} />
            <TextInput 
              style={styles.input} 
              placeholder="Email Address" 
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={{ height: 20 }} />

          <TouchableOpacity style={styles.resetBtn} onPress={handleResetPassword}>
            <Text style={styles.resetText}>Send Reset Link</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
              <Ionicons name="arrow-back" size={16} color="#666" style={{ marginRight: 5 }} />
              <Text style={styles.linkText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    zIndex: 10,
  },
  logoContainer: {
    position: 'relative', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBadge: {
    backgroundColor: '#FFB3D1', 
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: '#FFB3D1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  brandText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  peekingLogo: {
    width: 46,
    height: 46,
    resizeMode: 'contain',
    position: 'absolute',
    top: -24, 
    right: -14,
    zIndex: 20, 
    transform: [{ rotate: '12deg' }] 
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 30,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    height: 48,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
    height: '100%',
  },
  resetBtn: {
    backgroundColor: '#FFB3D1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FFB3D1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  resetText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  linkText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#666',
  },
});
