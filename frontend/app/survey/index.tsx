import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';

export default function Survey() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any>({
    symptoms: [],
    symptomSeverities: {},
    otherSymptoms: '',
    symptomsStartDate: '',
    symptomsLocation: '',
    overallSeverity: '',
    hasPain: null,
    painSeverity: 5,
    painLocation: '',
    healthConditions: [],
    healthConditionsOther: '',
    currentConditions: [],
    currentConditionsOther: '',
    dietChanges: null,
    medications: '',
    recentHospitalizations: null,
  });

  const totalSteps = 6;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const symptoms = [
    'Fever', 'Sore throat', 'Cough', 'Runny/Stuffy Nose',
    'Shortness of Breath', 'Nausea', 'Vomiting', 'Diarrhea',
    'Loss of taste/smell', 'Headache', 'Other'
  ];

  const severityOptions = ['Mild', 'Moderate', 'Severe'];

  const healthConditions = [
    'High blood pressure',
    'Diabetes',
    'Asthma',
    'Heart failure',
    'Thyroid',
    'Chronic kidney disease',
    'Dialysis',
    'Hepatitis',
    'Seizure',
    'Dementia',
    'Other'
  ];

  const q5Conditions = [
    'Kidney Disease',
    'Liver Disease',
    'Heart Failure',
    'Thyroid Disorder',
    'Other'
  ];

  const toggleSymptom = (symptom: string) => {
    const newSymptoms = answers.symptoms.includes(symptom)
      ? answers.symptoms.filter((s: string) => s !== symptom)
      : [...answers.symptoms, symptom];
    
    const newSeverities = { ...answers.symptomSeverities };
    if (!newSymptoms.includes(symptom)) {
      delete newSeverities[symptom];
    } else if (symptom !== 'Other' && !newSeverities[symptom]) {
      newSeverities[symptom] = 5;
    }

    setAnswers({ ...answers, symptoms: newSymptoms, symptomSeverities: newSeverities });
  };

  const updateSymptomSeverity = (symptom: string, value: number) => {
    setAnswers({
      ...answers,
      symptomSeverities: { ...answers.symptomSeverities, [symptom]: Math.round(value) }
    });
  };

  const toggleCondition = (condition: string, type: 'health' | 'current') => {
    const key = type === 'health' ? 'healthConditions' : 'currentConditions';
    const current = answers[key];
    const updated = current.includes(condition)
      ? current.filter((c: string) => c !== condition)
      : [...current, condition];
    setAnswers({ ...answers, [key]: updated });
  };

  // Validation function
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        // Q1: At least one symptom required
        if (answers.symptoms.length === 0) {
          Alert.alert('Required', 'Please select at least one symptom.');
          return false;
        }
        return true;

      case 1:
        // Q2: Both text fields required
        if (!answers.symptomsStartDate.trim()) {
          Alert.alert('Required', 'Please enter when your symptoms began.');
          return false;
        }
        if (!answers.symptomsLocation.trim()) {
          Alert.alert('Required', 'Please enter where you feel these symptoms.');
          return false;
        }
        return true;

      case 2:
        // Q3: Overall severity required
        if (!answers.overallSeverity) {
          Alert.alert('Required', 'Please select the overall severity of your symptoms.');
          return false;
        }
        // Pain question required
        if (answers.hasPain === null) {
          Alert.alert('Required', 'Please answer if you are experiencing pain.');
          return false;
        }
        // If pain yes: location is required
        if (answers.hasPain && !answers.painLocation.trim()) {
          Alert.alert('Required', 'Please enter where you feel the pain.');
          return false;
        }
        return true;

      case 3:
        // Q4: Health conditions 
        return true;

      case 4:
        // Q5: Current conditions 
        return true;

      case 5:
        // Q6: Diet changes required
        if (answers.dietChanges === null) {
          Alert.alert('Required', 'Please answer if you have any changes in diet.');
          return false;
        }
        // Recent hospitalizations required
        if (answers.recentHospitalizations === null) {
          Alert.alert('Required', 'Please answer if you have had recent hospitalizations.');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Survey completed:', answers);
      router.push('/survey/loading');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return answers.symptoms.length > 0;
      case 1:
        return answers.symptomsStartDate.trim() && answers.symptomsLocation.trim();
      case 2:
        return answers.overallSeverity && answers.hasPain !== null && 
               (!answers.hasPain || answers.painLocation.trim());
      case 5:
        return answers.dietChanges !== null && answers.recentHospitalizations !== null;
      default:
        return true;
    }
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 0:
        // Question 1: Symptoms with severity
        return (
          <>
            <Text style={styles.questionTitle}>
              What symptoms are you currently experiencing?
            </Text>
            <Text style={styles.subtitle}>Select all that apply </Text>

            {symptoms.map((symptom, index) => {
              const isSelected = answers.symptoms.includes(symptom);
              const severity = answers.symptomSeverities[symptom] || 5;
              const isOther = symptom === 'Other';

              return (
                <View key={index} style={styles.symptomCard}>
                  <TouchableOpacity
                    style={[
                      styles.symptomButton,
                      isSelected && styles.symptomButtonSelected
                    ]}
                    onPress={() => toggleSymptom(symptom)}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected
                    ]}>
                      {isSelected && <Ionicons name="checkmark" size={18} color="#fff" />}
                    </View>
                    <Text style={[
                      styles.symptomText,
                      isSelected && styles.symptomTextSelected
                    ]}>
                      {symptom}
                    </Text>
                  </TouchableOpacity>

                  {isSelected && !isOther && (
                    <View style={styles.severityContainer}>
                      <View style={styles.severityHeader}>
                        <Text style={styles.severityLabel}>Severity</Text>
                        <View style={styles.severityBadge}>
                          <Text style={styles.severityBadgeText}>{severity}</Text>
                        </View>
                      </View>
                      <View style={styles.sliderContainer}>
                        <Text style={styles.sliderLabel}>0</Text>
                        <Slider
                          style={styles.slider}
                          minimumValue={0}
                          maximumValue={10}
                          step={1}
                          value={severity}
                          onValueChange={(value) => updateSymptomSeverity(symptom, value)}
                          minimumTrackTintColor="#FF6B9D"
                          maximumTrackTintColor="#e0e0e0"
                          thumbTintColor="#FF6B9D"
                        />
                        <Text style={styles.sliderLabel}>10</Text>
                      </View>
                    </View>
                  )}

                  {isOther && isSelected && (
                    <TextInput
                      style={styles.otherInput}
                      placeholder="Describe your other symptoms..."
                      placeholderTextColor="#999"
                      value={answers.otherSymptoms}
                      onChangeText={(text) => setAnswers({ ...answers, otherSymptoms: text })}
                      multiline
                      numberOfLines={3}
                    />
                  )}
                </View>
              );
            })}
          </>
        );

      case 1:
        // Question 2: When symptoms began & location
        return (
          <>
            <Text style={styles.questionTitle}>
              When did these symptoms first begin? 
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type here..."
              placeholderTextColor="#999"
              value={answers.symptomsStartDate}
              onChangeText={(text) => setAnswers({ ...answers, symptomsStartDate: text })}
              multiline
            />

            <Text style={[styles.questionTitle, { marginTop: 32 }]}>
              Where in your body do you primarily feel these symptoms? 
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type here..."
              placeholderTextColor="#999"
              value={answers.symptomsLocation}
              onChangeText={(text) => setAnswers({ ...answers, symptomsLocation: text })}
              multiline
            />
          </>
        );

      case 2:
        // Question 3: Overall severity & pain
        return (
          <>
            <Text style={styles.questionTitle}>
              How would you rate the overall severity of your symptoms? 
            </Text>
            <View style={styles.severityOptionsContainer}>
              {severityOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.severityOptionButton,
                    answers.overallSeverity === option && styles.severityOptionSelected,
                  ]}
                  onPress={() => setAnswers({ ...answers, overallSeverity: option })}
                >
                  <Text style={[
                    styles.severityOptionText,
                    answers.overallSeverity === option && styles.severityOptionTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.questionTitle, { marginTop: 32 }]}>
              Are you experiencing any pain? 
            </Text>
            <View style={styles.yesNoContainer}>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.hasPain === true && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, hasPain: true })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.hasPain === true && styles.radioCircleSelected
                ]}>
                  {answers.hasPain === true && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.hasPain === false && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, hasPain: false })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.hasPain === false && styles.radioCircleSelected
                ]}>
                  {answers.hasPain === false && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>No</Text>
              </TouchableOpacity>
            </View>

            {answers.hasPain && (
              <>
                <Text style={[styles.questionTitle, { marginTop: 24, fontSize: 18 }]}>
                  How severe is this pain?
                </Text>
                <View style={styles.painSeverityContainer}>
                  <View style={styles.painSeverityDots}>
                    {[...Array(10)].map((_, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.painDot,
                          i < answers.painSeverity && styles.painDotActive
                        ]}
                        onPress={() => setAnswers({ ...answers, painSeverity: i + 1 })}
                      />
                    ))}
                  </View>
                  <View style={styles.painLabels}>
                    <Text style={styles.painLabel}>Normal</Text>
                    <Text style={styles.painLabel}>Severe</Text>
                  </View>
                </View>

                <Text style={[styles.questionTitle, { marginTop: 24, fontSize: 18 }]}>
                  Where do you feel this pain? 
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type here..."
                  placeholderTextColor="#999"
                  value={answers.painLocation}
                  onChangeText={(text) => setAnswers({ ...answers, painLocation: text })}
                  multiline
                />
              </>
            )}
          </>
        );

      case 3:
        return (
          <>
            <Text style={styles.questionTitle}>
              Select any health conditions you currently have:
            </Text>
            <Text style={styles.subtitle}>Select all that apply</Text>

            {healthConditions.map((condition, index) => {
              const isSelected = answers.healthConditions.includes(condition);
              const isOther = condition === 'Other';

              return (
                <View key={index} style={styles.symptomCard}>
                  <TouchableOpacity
                    style={[
                      styles.symptomButton,
                      isSelected && styles.symptomButtonSelected
                    ]}
                    onPress={() => toggleCondition(condition, 'health')}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected
                    ]}>
                      {isSelected && <Ionicons name="checkmark" size={18} color="#fff" />}
                    </View>
                    <Text style={[
                      styles.symptomText,
                      isSelected && styles.symptomTextSelected
                    ]}>
                      {condition}
                    </Text>
                  </TouchableOpacity>

                  {isOther && isSelected && (
                    <TextInput
                      style={styles.otherInput}
                      placeholder="Please specify..."
                      placeholderTextColor="#999"
                      value={answers.healthConditionsOther}
                      onChangeText={(text) => setAnswers({ ...answers, healthConditionsOther: text })}
                      multiline
                    />
                  )}
                </View>
              );
            })}
          </>
        );

      case 4:
        return (
          <>
            <Text style={styles.questionTitle}>
              Do you currently have any of these:
            </Text>
            <Text style={styles.subtitle}>Select all that apply</Text>

            {q5Conditions.map((condition, index) => {
              const isSelected = answers.currentConditions.includes(condition);
              const isOther = condition === 'Other';

              return (
                <View key={index} style={styles.symptomCard}>
                  <TouchableOpacity
                    style={[
                      styles.symptomButton,
                      isSelected && styles.symptomButtonSelected
                    ]}
                    onPress={() => toggleCondition(condition, 'current')}
                    activeOpacity={0.7}
                  >
                    <View style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected
                    ]}>
                      {isSelected && <Ionicons name="checkmark" size={18} color="#fff" />}
                    </View>
                    <Text style={[
                      styles.symptomText,
                      isSelected && styles.symptomTextSelected
                    ]}>
                      {condition}
                    </Text>
                  </TouchableOpacity>

                  {isOther && isSelected && (
                    <TextInput
                      style={styles.otherInput}
                      placeholder="Please specify..."
                      placeholderTextColor="#999"
                      value={answers.currentConditionsOther}
                      onChangeText={(text) => setAnswers({ ...answers, currentConditionsOther: text })}
                      multiline
                    />
                  )}
                </View>
              );
            })}
          </>
        );

      case 5:
        // Question 6: Diet, medications, hospitalizations
        return (
          <>
            <Text style={styles.questionTitle}>
              Any changes in diet? 
            </Text>
            <View style={styles.yesNoContainer}>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.dietChanges === true && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, dietChanges: true })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.dietChanges === true && styles.radioCircleSelected
                ]}>
                  {answers.dietChanges === true && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.dietChanges === false && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, dietChanges: false })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.dietChanges === false && styles.radioCircleSelected
                ]}>
                  {answers.dietChanges === false && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>No</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.questionTitle, { marginTop: 32 }]}>
              List any current medications:
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type here or write N/A..."
              placeholderTextColor="#999"
              value={answers.medications}
              onChangeText={(text) => setAnswers({ ...answers, medications: text })}
              multiline
            />

            <Text style={[styles.questionTitle, { marginTop: 32 }]}>
              Any recent hospitalizations? 
            </Text>
            <View style={styles.yesNoContainer}>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.recentHospitalizations === true && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, recentHospitalizations: true })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.recentHospitalizations === true && styles.radioCircleSelected
                ]}>
                  {answers.recentHospitalizations === true && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.recentHospitalizations === false && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, recentHospitalizations: false })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.recentHospitalizations === false && styles.radioCircleSelected
                ]}>
                  {answers.recentHospitalizations === false && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>No</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#ffe8f0']}
      style={styles.container}
    >
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderQuestion()}
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigationContainer}>
        {currentStep > 0 && (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={20} color="#666" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[
            styles.continueButton,
            currentStep === 0 && { marginLeft: 'auto' },
            !canProceed() && styles.continueButtonDisabled
          ]}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>
            {currentStep === totalSteps - 1 ? 'Done!' : 'Continue'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B9D',
    borderRadius: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  questionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 24,
    fontWeight: '500',
  },
  symptomCard: {
    marginBottom: 12,
  },
  symptomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  symptomButtonSelected: {
    backgroundColor: '#FFE4F0',
    borderWidth: 2,
    borderColor: '#FF6B9D',
    padding: 16,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#d0d0d0',
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D',
  },
  symptomText: {
    fontSize: 17,
    color: '#555',
    fontWeight: '500',
  },
  symptomTextSelected: {
    color: '#1a1a1a',
    fontWeight: '700',
  },
  severityContainer: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  severityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  severityLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  severityBadge: {
    backgroundColor: '#FF6B9D',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 40,
    alignItems: 'center',
  },
  severityBadgeText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#888',
    width: 24,
    textAlign: 'center',
  },
  otherInput: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginTop: 12,
  },
  severityOptionsContainer: {
    gap: 12,
    marginTop: 12,
  },
  severityOptionButton: {
    backgroundColor: '#ffffffff',
    borderColor: '#f0f0f0',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  severityOptionSelected: {
    backgroundColor: '#FFE4F0',
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
  severityOptionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  severityOptionTextSelected: {
    color: '#1a1a1a',
    fontWeight: '700',
  },
  yesNoContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  yesNoButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  yesNoButtonSelected: {
    backgroundColor: '#FFE4F0',
    borderColor: '#FF6B9D',
    borderWidth: 2,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d0d0d0',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#FF6B9D',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF6B9D',
  },
  yesNoText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#555',
  },
  painSeverityContainer: {
    marginTop: 16,
  },
  painSeverityDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  painDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e0e0e0',
  },
  painDotActive: {
    backgroundColor: '#FF6B9D',
  },
  painLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  painLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B9D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 8,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  continueButtonDisabled: {
    backgroundColor: '#d0d0d0',
    shadowOpacity: 0,
  },
  continueButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
});
