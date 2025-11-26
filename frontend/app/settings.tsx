import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const API_BASE_URL = 'http://localhost:3000';

export default function Settings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',  
    lastName: '',   
    email: '',
    height: '',
    weight: '',
    age: '',
    sex: 'female',
    sexOther: '',
    isPregnant: false,
    stressLevel: 5,
    allergies: '',
    consumesDrugs: false,
    consumesAlcohol: false,
    comfortableWithPills: true,
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('authToken');
      
      if (!token) {
        Alert.alert('Error', 'Please login again.');
        router.replace('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user;
        setFormData({
          firstName: user.firstName || '',  
          lastName: user.lastName || '',     
          email: user.email || '',
          height: user.height?.toString() || '',
          weight: user.weight?.toString() || '',
          age: user.age?.toString() || '',
          sex: user.gender || 'female',
          sexOther: (user.gender && !['male', 'female'].includes(user.gender)) ? user.gender : '',
          isPregnant: user.isPregnant || false,
          stressLevel: user.stressLevel === 'low' ? 3 : user.stressLevel === 'moderate' ? 5 : 8,
          allergies: user.allergies || '',
          consumesDrugs: user.drugs || false,
          consumesAlcohol: user.alcohol || false,
          comfortableWithPills: user.comfortableWithPills !== undefined ? user.comfortableWithPills : true,
        });
      } else {
        Alert.alert('Error', 'Failed to load profile data.');
      }
    } catch (error) {
      console.error('Load profile error:', error);
      Alert.alert('Error', 'Unable to load profile data.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStressLevelEnum = (level: number): string => {
    if (level <= 3) return 'low';
    if (level <= 7) return 'moderate';
    return 'high';
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const token = await AsyncStorage.getItem('authToken');

      if (!token) {
        Alert.alert('Error', 'Please login again.');
        router.replace('/login');
        return;
      }

      const payload = {
        firstName: formData.firstName,  // CHANGED
        lastName: formData.lastName,    // ADDED
        email: formData.email,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        age: formData.age ? parseInt(formData.age) : undefined,
        gender: formData.sex === 'other' ? formData.sexOther : formData.sex,
        isPregnant: formData.sex === 'female' ? formData.isPregnant : false,
        stressLevel: getStressLevelEnum(formData.stressLevel),
        allergies: formData.allergies,
        drugs: formData.consumesDrugs,
        alcohol: formData.consumesAlcohol,
        comfortableWithPills: formData.comfortableWithPills
      };

      console.log('Updating profile:', payload);

      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Profile updated:', data);
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        Alert.alert("Success", "Settings updated successfully!");
        router.back();
      } else {
        Alert.alert('Error', data.message || 'Failed to update settings.');
      }
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert("Error", "Failed to update settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = () => {
    Alert.alert("Reset Password", "A password reset link has been sent to your email.");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('authToken');
              
              const response = await fetch(`${API_BASE_URL}/api/user/account`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });

              if (response.ok) {
                await AsyncStorage.clear();
                router.replace('/');
              } else {
                Alert.alert('Error', 'Failed to delete account.');
              }
            } catch (error) {
              console.error('Delete account error:', error);
              Alert.alert('Error', 'Failed to delete account.');
            }
          }
        }
      ]
    );
  };

  const SectionHeader = ({ title, icon }: { title: string, icon: any }) => (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={20} color="#FF6B9D" />
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const ToggleOption = ({ label, value, onToggle }: { label: string, value: boolean, onToggle: (v: boolean) => void }) => (
    <View style={styles.toggleRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleBtn, value && styles.toggleBtnActive]} 
          onPress={() => onToggle(true)}
        >
          <Text style={[styles.toggleText, value && styles.toggleTextActive]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleBtn, !value && styles.toggleBtnActive]} 
          onPress={() => onToggle(false)}
        >
          <Text style={[styles.toggleText, !value && styles.toggleTextActive]}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF6B9D" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.card}>
          <SectionHeader title="Account Information" icon="person" />
          
          {/* CHANGED: Split into First Name and Last Name */}
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={[styles.input, { marginBottom: 15 }]}
            value={formData.firstName}
            onChangeText={(t) => setFormData({...formData, firstName: t})}
            placeholder="First Name"
            autoCapitalize="words"
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={[styles.input, { marginBottom: 15 }]}
            value={formData.lastName}
            onChangeText={(t) => setFormData({...formData, lastName: t})}
            placeholder="Last Name"
            autoCapitalize="words"
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input, { marginBottom: 15 }]}
            value={formData.email}
            onChangeText={(t) => setFormData({...formData, email: t})}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.outlineButton} onPress={handleChangePassword}>
            <Text style={styles.outlineButtonText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <SectionHeader title="Physical Stats" icon="body" />
          
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Height (inches)</Text>
              <TextInput
                style={styles.input}
                value={formData.height}
                onChangeText={(t) => setFormData({...formData, height: t})}
                keyboardType="numeric"
                placeholder="65"
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Weight (lbs)</Text>
              <TextInput
                style={styles.input}
                value={formData.weight}
                onChangeText={(t) => setFormData({...formData, weight: t})}
                keyboardType="numeric"
                placeholder="150"
              />
            </View>
          </View>

          <Text style={styles.label}>Age</Text>
          <TextInput
            style={[styles.input, { marginBottom: 15 }]}
            value={formData.age}
            onChangeText={(t) => setFormData({...formData, age: t})}
            keyboardType="numeric"
            placeholder="25"
          />

          <Text style={styles.label}>Sex</Text>
          <View style={styles.segmentContainer}>
            {['Female', 'Male', 'Other'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.segmentBtn, 
                  formData.sex === option.toLowerCase() && styles.segmentBtnActive
                ]}
                onPress={() => setFormData({...formData, sex: option.toLowerCase()})}
              >
                <Text style={[
                  styles.segmentText,
                  formData.sex === option.toLowerCase() && styles.segmentTextActive
                ]}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {formData.sex === 'other' && (
            <TextInput
              style={[styles.input, { marginTop: 10 }]}
              value={formData.sexOther}
              onChangeText={(t) => setFormData({...formData, sexOther: t})}
              placeholder="Please specify..."
            />
          )}

          {formData.sex === 'female' && (
            <View style={{ marginTop: 15 }}>
              <ToggleOption 
                label="Are you pregnant?" 
                value={formData.isPregnant} 
                onToggle={(v) => setFormData({...formData, isPregnant: v})} 
              />
            </View>
          )}
        </View>

        <View style={styles.card}>
          <SectionHeader title="Medical Details" icon="medical" />
          
          <Text style={styles.label}>Stress Level (1-10)</Text>
          <View style={styles.stressContainer}>
            {[...Array(10)].map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.stressDot,
                  formData.stressLevel > i && styles.stressDotActive
                ]}
                onPress={() => setFormData({...formData, stressLevel: i + 1})}
              />
            ))}
            <View style={styles.stressLabels}>
              <Text style={styles.smallText}>Normal</Text>
              <Text style={styles.smallText}>Severe</Text>
            </View>
          </View>

          <Text style={styles.label}>Allergies</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.allergies}
            onChangeText={(t) => setFormData({...formData, allergies: t})}
            multiline
            placeholder="List any allergies..."
          />
        </View>

        <View style={styles.card}>
          <SectionHeader title="Preferences" icon="list" />

          <ToggleOption 
            label="Do you consume drugs?" 
            value={formData.consumesDrugs} 
            onToggle={(v) => setFormData({...formData, consumesDrugs: v})} 
          />
          
          <View style={styles.divider} />
          
          <ToggleOption 
            label="Do you consume alcohol?" 
            value={formData.consumesAlcohol} 
            onToggle={(v) => setFormData({...formData, consumesAlcohol: v})} 
          />
          
          <View style={styles.divider} />

          <ToggleOption 
            label="Comfortable with pills?" 
            value={formData.comfortableWithPills} 
            onToggle={(v) => setFormData({...formData, comfortableWithPills: v})} 
          />
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
           <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        style={styles.footer}
      >
        <TouchableOpacity 
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]} 
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  backButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 15,
  },
  halfInput: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 10,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  segmentBtnActive: {
    backgroundColor: '#FF6B9D',
  },
  segmentText: {
    fontWeight: '600',
    color: '#666',
  },
  segmentTextActive: {
    color: '#fff',
  },
  stressContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 10,
    justifyContent: 'center',
  },
  stressDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
  },
  stressDotActive: {
    backgroundColor: '#FF6B9D',
  },
  stressLabels: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  smallText: {
    fontSize: 12,
    color: '#999',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 2,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  toggleBtnActive: {
    backgroundColor: '#333',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  toggleTextActive: {
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
  },
  saveButton: {
    backgroundColor: '#FF6B9D',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  outlineButton: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  outlineButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 15,
  },
  deleteButton: {
    alignSelf: 'center',
    padding: 15,
    marginBottom: 20,
  },
  deleteButtonText: {
    color: '#FF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});
