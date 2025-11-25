import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function FollowUpSurvey() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any>({
    symptomsStatus: '',
    takingMedication: null,
    sideEffects: null,
    sideEffectsList: '',
    sideEffectsSeverity: '',
    dosesCount: 0,
    missedDoses: null,
    missedDosesCount: '',
    difficultyRemembering: null,
    medicalCare: null,
    dietChange: null,
    medicineFormEasy: null,
    clearInstructions: null,
    overallFeeling: '',
    questions: '',
  });

  const totalSteps = 6;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const symptomsOptions = ['Improving', 'Same', 'Worsening'];
  const severityOptions = ['Mild', 'Moderate', 'Severe'];
  const feelingOptions = ['Better', 'Same', 'Worse'];

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        if (!answers.symptomsStatus) {
          Alert.alert('Required', 'Please select your symptoms status.');
          return false;
        }
        if (answers.takingMedication === null) {
          Alert.alert('Required', 'Please answer if you are taking the prescribed medication.');
          return false;
        }
        return true;

      case 1:
        if (answers.sideEffects === null) {
          Alert.alert('Required', 'Please answer if you have experienced side effects.');
          return false;
        }
        if (answers.sideEffects && !answers.sideEffectsSeverity) {
          Alert.alert('Required', 'Please select the severity of side effects.');
          return false;
        }
        return true;

      case 2:
        if (answers.missedDoses === null) {
          Alert.alert('Required', 'Please answer if you have missed any doses.');
          return false;
        }
        if (answers.difficultyRemembering === null) {
          Alert.alert('Required', 'Please answer if you have difficulty remembering to take medicine.');
          return false;
        }
        return true;

      case 3:
        if (answers.medicalCare === null) {
          Alert.alert('Required', 'Please answer if you needed to seek medical care.');
          return false;
        }
        if (answers.dietChange === null) {
          Alert.alert('Required', 'Please answer if you have had a change in diet.');
          return false;
        }
        if (answers.medicineFormEasy === null) {
          Alert.alert('Required', 'Please answer if the form of medicine is easy to take.');
          return false;
        }
        if (answers.clearInstructions === null) {
          Alert.alert('Required', 'Please answer if the instructions are clear.');
          return false;
        }
        return true;

      case 4:
        if (!answers.overallFeeling) {
          Alert.alert('Required', 'Please select how you feel overall.');
          return false;
        }
        return true;

      case 5:
        return true;

      default:
        return true;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return answers.symptomsStatus && answers.takingMedication !== null;
      case 1:
        return answers.sideEffects !== null && (!answers.sideEffects || answers.sideEffectsSeverity);
      case 2:
        return answers.missedDoses !== null && answers.difficultyRemembering !== null;
      case 3:
        return answers.medicalCare !== null && answers.dietChange !== null && 
               answers.medicineFormEasy !== null && answers.clearInstructions !== null;
      case 4:
        return answers.overallFeeling;
      case 5:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 5 && !validateCurrentStep()) {
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Follow-up survey completed:', answers);
      router.replace('/profile-dashboard/home');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Text style={styles.questionTitle}>
              Are your symptoms improving, staying the same, or worsening?
            </Text>
            <View style={styles.optionsContainer}>
              {symptomsOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    answers.symptomsStatus === option && styles.optionButtonSelected,
                  ]}
                  onPress={() => setAnswers({ ...answers, symptomsStatus: option })}
                >
                  <View style={[
                    styles.radioCircle,
                    answers.symptomsStatus === option && styles.radioCircleSelected
                  ]}>
                    {answers.symptomsStatus === option && <View style={styles.radioDot} />}
                  </View>
                  <Text style={[
                    styles.optionText,
                    answers.symptomsStatus === option && styles.optionTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.questionTitle, { marginTop: 32 }]}>
              Are you currently taking the prescribed medication?
            </Text>
            <View style={styles.yesNoContainer}>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.takingMedication === true && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, takingMedication: true })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.takingMedication === true && styles.radioCircleSelected
                ]}>
                  {answers.takingMedication === true && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.takingMedication === false && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, takingMedication: false })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.takingMedication === false && styles.radioCircleSelected
                ]}>
                  {answers.takingMedication === false && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>No</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      case 1:
        return (
          <>
            <Text style={styles.questionTitle}>
              Have you been experiencing any side effects after taking your prescribed medication?
            </Text>
            <View style={styles.yesNoContainer}>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.sideEffects === true && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, sideEffects: true })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.sideEffects === true && styles.radioCircleSelected
                ]}>
                  {answers.sideEffects === true && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.sideEffects === false && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, sideEffects: false })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.sideEffects === false && styles.radioCircleSelected
                ]}>
                  {answers.sideEffects === false && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>No</Text>
              </TouchableOpacity>
            </View>

            {answers.sideEffects && (
              <>
                <Text style={[styles.questionTitle, { marginTop: 24 }]}>
                  List all side effects
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type here..."
                  placeholderTextColor="#999"
                  value={answers.sideEffectsList}
                  onChangeText={(text) => setAnswers({ ...answers, sideEffectsList: text })}
                  multiline
                />

                <Text style={[styles.questionTitle, { marginTop: 24 }]}>
                  How severe are the side effects?
                </Text>
                <View style={styles.optionsContainer}>
                  {severityOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.severityButton,
                        answers.sideEffectsSeverity === option && styles.severityButtonSelected,
                      ]}
                      onPress={() => setAnswers({ ...answers, sideEffectsSeverity: option })}
                    >
                      <Text style={[
                        styles.severityText,
                        answers.sideEffectsSeverity === option && styles.severityTextSelected
                      ]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </>
        );

      case 2:
        return (
          <>
            <Text style={styles.questionTitle}>
              How many doses have you taken so far?
            </Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setAnswers({ ...answers, dosesCount: Math.max(0, answers.dosesCount - 1) })}
              >
                <Ionicons name="remove" size={24} color="#FF6B9D" />
              </TouchableOpacity>
              <Text style={styles.counterValue}>{answers.dosesCount}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setAnswers({ ...answers, dosesCount: answers.dosesCount + 1 })}
              >
                <Ionicons name="add" size={24} color="#FF6B9D" />
              </TouchableOpacity>
            </View>

            <Text style={[styles.questionTitle, { marginTop: 32 }]}>
              Have you missed any doses?{'\n'}
              <Text style={styles.questionSubtitle}>(If yes, how many and why?)</Text>
            </Text>
            <View style={styles.yesNoContainer}>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.missedDoses === true && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, missedDoses: true })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.missedDoses === true && styles.radioCircleSelected
                ]}>
                  {answers.missedDoses === true && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.missedDoses === false && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, missedDoses: false })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.missedDoses === false && styles.radioCircleSelected
                ]}>
                  {answers.missedDoses === false && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>No</Text>
              </TouchableOpacity>
            </View>

            {answers.missedDoses && (
              <TextInput
                style={styles.textInput}
                placeholder="Type here..."
                placeholderTextColor="#999"
                value={answers.missedDosesCount}
                onChangeText={(text) => setAnswers({ ...answers, missedDosesCount: text })}
                multiline
              />
            )}

            <Text style={[styles.questionTitle, { marginTop: 32 }]}>
              Are you having difficulty remembering to take the medicine?
            </Text>
            <View style={styles.yesNoContainer}>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.difficultyRemembering === true && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, difficultyRemembering: true })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.difficultyRemembering === true && styles.radioCircleSelected
                ]}>
                  {answers.difficultyRemembering === true && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.difficultyRemembering === false && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, difficultyRemembering: false })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.difficultyRemembering === false && styles.radioCircleSelected
                ]}>
                  {answers.difficultyRemembering === false && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>No</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      case 3:
        return (
          <>
            <Text style={styles.questionTitle}>
              Did you need to seek medical care for any reaction?
            </Text>
            <View style={styles.yesNoContainer}>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.medicalCare === true && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, medicalCare: true })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.medicalCare === true && styles.radioCircleSelected
                ]}>
                  {answers.medicalCare === true && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.medicalCare === false && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, medicalCare: false })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.medicalCare === false && styles.radioCircleSelected
                ]}>
                  {answers.medicalCare === false && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>No</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.questionTitle, { marginTop: 32 }]}>
              Have you had a change in diet while taking your medication?
            </Text>
            <View style={styles.yesNoContainer}>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.dietChange === true && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, dietChange: true })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.dietChange === true && styles.radioCircleSelected
                ]}>
                  {answers.dietChange === true && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.dietChange === false && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, dietChange: false })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.dietChange === false && styles.radioCircleSelected
                ]}>
                  {answers.dietChange === false && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>No</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.questionTitle, { marginTop: 32 }]}>
              Do you find the form of the medicine (pill, liquid, injection) easy to take?
            </Text>
            <View style={styles.yesNoContainer}>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.medicineFormEasy === true && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, medicineFormEasy: true })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.medicineFormEasy === true && styles.radioCircleSelected
                ]}>
                  {answers.medicineFormEasy === true && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.medicineFormEasy === false && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, medicineFormEasy: false })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.medicineFormEasy === false && styles.radioCircleSelected
                ]}>
                  {answers.medicineFormEasy === false && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>No</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.questionTitle, { marginTop: 32 }]}>
              Do you feel clear about how and when to take your medication?
            </Text>
            <View style={styles.yesNoContainer}>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.clearInstructions === true && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, clearInstructions: true })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.clearInstructions === true && styles.radioCircleSelected
                ]}>
                  {answers.clearInstructions === true && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.yesNoButton,
                  answers.clearInstructions === false && styles.yesNoButtonSelected
                ]}
                onPress={() => setAnswers({ ...answers, clearInstructions: false })}
              >
                <View style={[
                  styles.radioCircle,
                  answers.clearInstructions === false && styles.radioCircleSelected
                ]}>
                  {answers.clearInstructions === false && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.yesNoText}>No</Text>
              </TouchableOpacity>
            </View>
          </>
        );

      case 4:
        return (
          <>
            <Text style={styles.questionTitle}>
              Overall, how do you feel compared to before you started the medication?
            </Text>
            <View style={styles.optionsContainer}>
              {feelingOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    answers.overallFeeling === option && styles.optionButtonSelected,
                  ]}
                  onPress={() => setAnswers({ ...answers, overallFeeling: option })}
                >
                  <View style={[
                    styles.radioCircle,
                    answers.overallFeeling === option && styles.radioCircleSelected
                  ]}>
                    {answers.overallFeeling === option && <View style={styles.radioDot} />}
                  </View>
                  <Text style={[
                    styles.optionText,
                    answers.overallFeeling === option && styles.optionTextSelected
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.questionTitle, { marginTop: 32 }]}>
              Do you have any questions or concerns about your dosage or instructions?
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Type here..."
              placeholderTextColor="#999"
              value={answers.questions}
              onChangeText={(text) => setAnswers({ ...answers, questions: text })}
              multiline
              numberOfLines={4}
            />
          </>
        );

      case 5:
        // Completion Screen
        return (
          <View style={styles.completionContainer}>
            <Image
              source={require('../../assets/images/medguide.png')}
              style={styles.completionIcon}
              resizeMode="contain"
            />
            <Text style={styles.completionTitle}>
              Your follow-up{'\n'}has been{'\n'}submitted!
            </Text>
          </View>
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

      {currentStep < 5 && (
        <View style={styles.navigationContainer}>
          {currentStep > 0 ? (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color="#666" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={styles.exitButton}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Ionicons name="close" size={22} color="#666" />
              <Text style={styles.exitButtonText}>Exit Survey</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[
              styles.continueButton,
              !canProceed() && styles.continueButtonDisabled
            ]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>
              {currentStep === 4 ? 'Done!' : 'Continue'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 5 && (
        <View style={styles.completionButtonContainer}>
          <TouchableOpacity 
            style={styles.doneButton}
            onPress={() => router.replace('/profile-dashboard/home')}
            activeOpacity={0.8}
          >
            <Text style={styles.doneButtonText}>Done!</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
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
  questionSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#888',
  },
  optionsContainer: {
    gap: 12,
    marginTop: 16,
  },
  optionButton: {
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
  optionButtonSelected: {
    backgroundColor: '#FFE4F0',
    borderWidth: 2,
    borderColor: '#FF6B9D',
    padding: 16,
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
  optionText: {
    fontSize: 17,
    color: '#555',
    fontWeight: '500',
  },
  optionTextSelected: {
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
  yesNoText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#555',
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
  severityButton: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  severityButtonSelected: {
    backgroundColor: '#FFE4F0',
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
  severityText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  severityTextSelected: {
    color: '#1a1a1a',
    fontWeight: '700',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
  },
  counterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
  counterValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    minWidth: 60,
    textAlign: 'center',
  },
  completionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  completionIcon: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  completionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -0.5,
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
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  exitButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
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
  completionButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B9D',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    gap: 10,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  doneButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '800',
  },
});
