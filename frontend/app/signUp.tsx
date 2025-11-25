import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Switch,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    allowNotifs: false
  });

  const updateField = (key: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleRegister = () => {
    if (!formData.email || !formData.password || !formData.firstName) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    console.log("Registering User:", formData);
    router.push('/success');
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
          <Text style={styles.cardTitle}>Create Account</Text>

          <View style={styles.inputContainer}>
            
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={18} color="#999" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="First Name" 
                placeholderTextColor="#A0A0A0"
                value={formData.firstName}
                onChangeText={(t) => updateField('firstName', t)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={18} color="#999" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Last Name" 
                placeholderTextColor="#A0A0A0"
                value={formData.lastName}
                onChangeText={(t) => updateField('lastName', t)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={18} color="#999" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Email Address" 
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(t) => updateField('email', t)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={18} color="#999" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Phone Number" 
                placeholderTextColor="#A0A0A0"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(t) => updateField('phone', t)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color="#999" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Password" 
                placeholderTextColor="#A0A0A0"
                secureTextEntry
                value={formData.password}
                onChangeText={(t) => updateField('password', t)}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color="#999" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Confirm Password" 
                placeholderTextColor="#A0A0A0"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(t) => updateField('confirmPassword', t)}
              />
            </View>
          </View>

          <View style={styles.switchRow}>
            <Switch 
              trackColor={{ false: "#E0E0E0", true: "#FFB3D1" }}
              thumbColor="#FFFFFF"
              onValueChange={(v) => updateField('allowNotifs', v)}
              value={formData.allowNotifs}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }} 
            />
            <Text style={styles.switchText}>Allow Notifications</Text>
          </View>

          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.linkText}>Log in</Text>
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
    marginBottom: height < 700 ? 15 : 25,
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
    paddingVertical: 24,
    paddingHorizontal: 20,
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
    marginBottom: 20,
  },
  inputContainer: {
    gap: 10, 
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    height: 44, 
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    height: '100%',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 12,
    gap: 8,
  },
  switchText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  registerBtn: {
    backgroundColor: '#FFB3D1',
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#FFB3D1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  registerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#888',
    fontSize: 13,
  },
  linkText: {
    fontWeight: '700',
    fontSize: 13,
    color: '#1A1A1A',
  },
});
