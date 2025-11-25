import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Settings() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    
    height: '',
    weight: '',
    sex: 'female',
    sexOther: '',
    isPregnant: false,
    
    stressLevel: 5,
    allergies: '',
    
    pharmacy1: '',
    pharmacy2: '',
    consumesDrugs: false,
    consumesAlcohol: false,
    comfortableWithPills: true,
  });

  const handleSave = async () => {
    try {
      Alert.alert("Success", "Settings updated successfully!");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to update settings");
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
        { text: "Delete", style: "destructive", onPress: () => router.replace('/') }
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
          
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input, { marginBottom: 15 }]}
            value={formData.fullName}
            onChangeText={(t) => setFormData({...formData, fullName: t})}
            placeholder="Nathan S"
            autoCapitalize="words"
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input, { marginBottom: 15 }]}
            value={formData.email}
            onChangeText={(t) => setFormData({...formData, email: t})}
            placeholder="nathan@example.com"
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
              placeholder="Type here..."
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
          
          <Text style={styles.label}>Preferred Pharmacies</Text>
          <TextInput
            style={[styles.input, { marginBottom: 10 }]}
            value={formData.pharmacy1}
            onChangeText={(t) => setFormData({...formData, pharmacy1: t})}
            placeholder="Address #1"
          />
          <TextInput
            style={[styles.input, { marginBottom: 15 }]}
            value={formData.pharmacy2}
            onChangeText={(t) => setFormData({...formData, pharmacy2: t})}
            placeholder="Address #2"
          />

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
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
