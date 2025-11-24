import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function MedicationScreen() {
  return (
    <LinearGradient
      colors={['#fff', '#f5b6d2']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="medical" size={24} color="#FF6B9D" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Symptom Surveys</Text>
            <Text style={styles.headerSubtitle}>Get personalized care</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardIconBadge}>
            <Ionicons name="clipboard" size={28} color="#FF6B9D" />
          </View>
          
          <Text style={styles.cardTitle}>Take the Symptom Survey</Text>
          <Text style={styles.cardSubtitle}>
            Generate a personalized medication plan
          </Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/survey')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Tell us your symptoms</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Follow-up Survey Card */}
        <View style={styles.card}>
          <View style={styles.cardIconBadge}>
            <Ionicons name="chatbox-ellipses" size={28} color="#FF6B9D" />
          </View>
          
          <Text style={styles.cardTitle}>Take the Follow-up Survey</Text>
          <Text style={styles.cardSubtitle}>
            Tell us about your experience
          </Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              // Navigate to follow-up survey (create later)
              console.log('Follow-up survey coming soon');
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation Spacer */}
      <View style={styles.tabBarSpacer} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFE4F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
    marginTop: 2,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardIconBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFE4F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    fontWeight: '400',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '700',
  },
  tabBarSpacer: {
    height: 100,
  },
});
