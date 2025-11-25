import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Calendar } from 'react-native-calendars';

export default function HomeScreen() {
  const [showMenu, setShowMenu] = useState(false);
  const [hasTakenSurvey, setHasTakenSurvey] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [medicationStatus, setMedicationStatus] = useState({
    [`${new Date().toISOString().split('T')[0]}-1`]: false,
    [`${new Date().toISOString().split('T')[0]}-2`]: false,
  });
  const userName = "Nathan";

  const medications = [
    {
      id: 1,
      name: "Advil",
      dosage: "1 Capsule",
      duration: "1/months",
      dose: "2/day",
      frequency: "Daily",
      times: ["8:00 AM", "8:00 PM"],
      color: '#FF6B9D'
    },
    {
      id: 2,
      name: "Vitamin D",
      dosage: "1 Capsule",
      duration: "2/months",
      dose: "1/day",
      frequency: "Daily",
      times: ["9:00 AM"],
      color: '#FFA726'
    }
  ];

  const toggleMedicationStatus = (date, medId) => {
    const key = `${date}-${medId}`;
    setMedicationStatus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isMedicationTaken = (date, medId) => {
    const key = `${date}-${medId}`;
    return medicationStatus[key] || false;
  };

  const generateMarkedDates = () => {
    const marked = {};
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      marked[dateString] = {
        marked: true,
        dots: medications.map(med => ({
          key: med.id.toString(),
          color: med.color,
        })),
        selected: dateString === selectedDate,
        selectedColor: dateString === selectedDate ? '#FF6B9D' : undefined,
      };
    }
    
    return marked;
  };

  const getMedicationsForDate = (date) => {
    return medications;
  };

  const handleLogout = () => {
    setShowMenu(false);
    router.replace('/login');
  };

  const handleSettings = () => {
    setShowMenu(false);
    router.push('/settings');
  };

  return (
    <LinearGradient colors={['#ffffff', '#FFB3D1']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 44 }} />
        <TouchableOpacity style={styles.profileButton} onPress={() => setShowMenu(true)}>
          <Ionicons name="person" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Image
            source={require('../../assets/images/medguide.png')}
            style={styles.greetingIcon}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.greetingText}>Hello,</Text>
            <Text style={styles.greetingName}>{userName}!</Text>
          </View>
        </View>

        {!hasTakenSurvey ? (
          /* First Time User - Get Started Card */
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Get Started{'\n'}with <Text style={styles.cardTitlePink}>Medguide</Text>
            </Text>
            
            <Text style={styles.cardSubtitle}>
              We'll create a personalized{'\n'}medication plan
            </Text>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => router.push('/survey')}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Tell us your symptoms</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          /* Calendar View with Medication Tracking */
          <>
            {/* Calendar Card */}
            <View style={styles.calendarCard}>
              <Calendar
                current={new Date().toISOString().split('T')[0]}
                enableSwipeMonths={false}
                hideExtraDays={true}
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markingType={'multi-dot'}
                markedDates={generateMarkedDates()}
                theme={{
                  backgroundColor: 'transparent',
                  calendarBackground: 'transparent',
                  textSectionTitleColor: '#1a1a1a',
                  selectedDayBackgroundColor: '#FF6B9D',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#FF6B9D',
                  dayTextColor: '#1a1a1a',
                  textDisabledColor: '#d0d0d0',
                  monthTextColor: '#1a1a1a',
                  textMonthFontWeight: '800',
                  textMonthFontSize: 20,
                  textDayFontSize: 16,
                  textDayHeaderFontSize: 14,
                  textDayHeaderFontWeight: '600',
                  dotColor: '#FF6B9D',
                  selectedDotColor: '#ffffff',
                }}
                style={{ height: 350 }}
                renderArrow={(direction) => (
                  <Ionicons 
                    name={direction === 'left' ? 'chevron-back' : 'chevron-forward'} 
                    size={24} 
                    color="#1a1a1a" 
                  />
                )}
              />
            </View>

            {/* Date Header */}
            <View style={styles.dateHeader}>
              <Text style={styles.dateHeaderText}>
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>

            {/* Medications List for Selected Date */}
            <View style={styles.medicationsContainer}>
              {getMedicationsForDate(selectedDate).map((med) => (
                <View key={med.id} style={styles.medicationCard}>
                  <View style={styles.medicationHeader}>
                    <View style={styles.medicationTitleRow}>
                      <View style={[styles.colorDot, { backgroundColor: med.color }]} />
                      <View>
                        <Text style={styles.medicationName}>{med.name}</Text>
                        <Text style={styles.medicationDosage}>{med.dosage}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.medicationDetails}>
                    <View style={styles.detailRow}>
                      <Ionicons name="time-outline" size={16} color="#888" />
                      <Text style={styles.detailLabel}>Duration</Text>
                      <Text style={styles.detailValue}>{med.duration}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons name="medical-outline" size={16} color="#888" />
                      <Text style={styles.detailLabel}>Dose</Text>
                      <Text style={styles.detailValue}>{med.dose}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Ionicons name="repeat-outline" size={16} color="#888" />
                      <Text style={styles.detailLabel}>Frequency</Text>
                      <Text style={styles.detailValue}>{med.frequency}</Text>
                    </View>
                  </View>

                  {/* Times */}
                  <View style={styles.timesContainer}>
                    {med.times.map((time, index) => (
                      <View key={index} style={styles.timeChip}>
                        <Ionicons name="alarm-outline" size={14} color="#FF6B9D" />
                        <Text style={styles.timeText}>{time}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Mark as Taken Button */}
                  <TouchableOpacity 
                    style={[
                      styles.checkButton,
                      isMedicationTaken(selectedDate, med.id) && styles.checkButtonTaken
                    ]}
                    onPress={() => toggleMedicationStatus(selectedDate, med.id)}
                  >
                    <Ionicons 
                      name={isMedicationTaken(selectedDate, med.id) ? "checkmark-circle" : "checkmark-circle-outline"} 
                      size={20} 
                      color={isMedicationTaken(selectedDate, med.id) ? "#fff" : "#4CAF50"} 
                    />
                    <Text style={[
                      styles.checkButtonText,
                      isMedicationTaken(selectedDate, med.id) && styles.checkButtonTextTaken
                    ]}>
                      {isMedicationTaken(selectedDate, med.id) ? "Taken" : "Mark as Taken"}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Legend */}
            <View style={styles.legendCard}>
              <Text style={styles.legendTitle}>Medication Legend</Text>
              <View style={styles.legendItems}>
                {medications.map((med) => (
                  <View key={med.id} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: med.color }]} />
                    <Text style={styles.legendText}>{med.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Profile Menu Modal */}
      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menuContainer}>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={handleSettings}
                  activeOpacity={0.7}
                >
                  <Ionicons name="settings-outline" size={22} color="#FF6B9D" />
                  <Text style={styles.menuItemText}>Settings</Text>
                </TouchableOpacity>

                <View style={styles.menuDivider} />

                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={handleLogout}
                  activeOpacity={0.7}
                >
                  <Ionicons name="log-out-outline" size={22} color="#FF6B9D" />
                  <Text style={styles.menuItemText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.tabBarSpacer} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  greetingIcon: {
    width: 64,
    height: 64,
  },
  greetingText: {
    fontSize: 34,
    fontWeight: '400',
    color: '#1a1a1a',
    lineHeight: 40,
  },
  greetingName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FF6B9D',
    lineHeight: 40,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: 28,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 16,
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  cardTitlePink: {
    color: '#FF6B9D',
  },
  cardSubtitle: {
    fontSize: 17,
    color: '#C44B80',
    marginBottom: 28,
    lineHeight: 25,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 30,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '700',
  },
  calendarCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#feefffff',
    height: 382,
    overflow: 'hidden',
  },
  dateHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  dateHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  medicationsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  medicationCard: {
    backgroundColor: 'rgba(255, 228, 240, 0.6)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  medicationHeader: {
    marginBottom: 16,
  },
  medicationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  medicationName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -0.3,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
    fontWeight: '500',
  },
  medicationDetails: {
    gap: 10,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '700',
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  checkButtonTaken: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4CAF50',
  },
  checkButtonTextTaken: {
    color: '#fff',
  },
  legendCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  legendItems: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  tabBarSpacer: {
    height: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 90,
    paddingRight: 24,
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B9D',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 12,
  },
});
