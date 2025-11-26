import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Image, 
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
  UIManager,
  ActivityIndicator,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const API_BASE_URL = 'http://localhost:3000';
if (Platform.OS === 'ios' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CustomLayoutSpring = {
  duration: 400,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.8,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 0.8,
  },
};

export default function ProfileSetupScreen() {
  const [step, setStep] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '', // ADDED
    sex: '', 
    sexOther: '',
    isPregnant: null, 
    stressLevel: 0, 
    pharmacy1: '',
    pharmacy2: '',
    allergies: '',
    consumesDrugs: null, 
    consumesAlcohol: null,
    comfortableWithPills: null
  });

  const updateField = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1: 
        if (!formData.height || !formData.weight || !formData.age) { // UPDATED
          Alert.alert("Required", "Please enter your height, weight, and age.");
          return false;
        }
        return true;
      case 2: 
        if (!formData.sex) {
          Alert.alert("Required", "Please select your sex.");
          return false;
        }
        if (formData.sex === 'other' && !formData.sexOther) {
           Alert.alert("Required", "Please specify your sex.");
           return false;
        }
        if (formData.sex === 'female' && formData.isPregnant === null) {
          Alert.alert("Required", "Please answer if you are pregnant.");
          return false;
        }
        return true;
      case 3: 
        if (formData.stressLevel === 0) {
          Alert.alert("Required", "Please rate your stress level.");
          return false;
        }
        return true;
      case 4: 
        if (!formData.pharmacy1) {
           Alert.alert("Required", "Please enter at least one pharmacy address.");
           return false;
        }
        if (formData.consumesDrugs === null) {
           Alert.alert("Required", "Please answer if you consume drugs.");
           return false;
        }
        if (formData.consumesAlcohol === null) {
           Alert.alert("Required", "Please answer if you consume alcohol.");
           return false;
        }
        if (formData.comfortableWithPills === null) {
           Alert.alert("Required", "Please answer if you are comfortable with pills.");
           return false;
        }
        return true;
      default:
        return true;
    }
  };

  const getStressLevelEnum = (level: number): string => {
    if (level <= 3) return 'low';
    if (level <= 7) return 'moderate';
    return 'high';
  };

  const submitOnboarding = async () => {
    try {
      setIsSubmitting(true);

      const token = await AsyncStorage.getItem('authToken');
      
      if (!token) {
        Alert.alert('Error', 'No authentication token found. Please login again.');
        router.replace('/login');
        return;
      }

      const payload = {
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        age: parseInt(formData.age),
        gender: formData.sex === 'other' ? formData.sexOther : formData.sex,
        isPregnant: formData.sex === 'female' ? formData.isPregnant : false,
        stressLevel: getStressLevelEnum(formData.stressLevel),
        allergies: formData.allergies || '',
        drugs: formData.consumesDrugs,
        alcohol: formData.consumesAlcohol,
        comfortableWithPills: formData.comfortableWithPills
      };

      console.log('Submitting onboarding data:', payload);

      const response = await fetch(`${API_BASE_URL}/user/onboarding`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Onboarding successful:', data);
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        
        setTimeout(() => {
          router.replace('/profile-dashboard/home');
        }, 500);
      } else {
        console.error('Onboarding failed:', data);
        Alert.alert('Error', data.message || 'Failed to save profile. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      Alert.alert('Error', 'Something went wrong. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (!validateStep(step)) return;

    if (step === 5) {
      submitOnboarding();
    } else {
      LayoutAnimation.configureNext(CustomLayoutSpring);
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    LayoutAnimation.configureNext(CustomLayoutSpring);
    if (step > 1) setStep(step - 1);
  };

  const ProgressBar = ({ progress }: { progress: number }) => (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );

  const SelectButton = ({ label, selected, onPress }: any) => (
    <TouchableOpacity 
      style={[styles.selectBtn, selected && styles.selectBtnActive]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.selectBtnText, selected && styles.selectBtnTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  const RadioOption = ({ label, active, onPress }: any) => (
    <TouchableOpacity style={styles.radioRow} onPress={onPress} activeOpacity={0.6}>
      <View style={[styles.radioCircle, active && styles.radioCircleActive]}>
        {active && <View style={styles.radioDot} />}
      </View>
      <Text style={[styles.radioText, active && styles.radioTextActive]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderStep0_Welcome = () => (
    <LinearGradient colors={['#FFB3D1', '#FFE4F0']} style={styles.fullScreenContainer}>
      <View style={styles.welcomeCard}>
        <Image source={require('../assets/images/medguide.png')} style={styles.logo} resizeMode="contain"/>
        <Text style={styles.welcomeTitle}>Profile Set Up</Text>
        <Text style={styles.welcomeDesc}>
          Let's customize Medguide for you. Just a few quick details to get started.
        </Text>
        <TouchableOpacity 
          style={styles.startButton} 
          activeOpacity={0.8}
          onPress={() => {
             LayoutAnimation.configureNext(CustomLayoutSpring);
             setStep(1);
          }}
        >
          <Text style={styles.startButtonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#1A1A1A" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  const renderStep1_Physical = () => (
    <View style={styles.stepContent}>
      <View style={styles.headerBlock}>
        <Text style={styles.stepTitle}>Let's Begin.</Text>
        <ProgressBar progress={20} />
      </View>
      
      <View style={styles.centerForm}>
        <Text style={styles.questionLabel}>What is your height?</Text>
        <View style={styles.inputRow}>
          <TextInput 
            style={styles.fixedWidthInput} 
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#CCC"
            value={formData.height}
            onChangeText={(t) => updateField('height', t)}
            textAlign="center" 
          />
          <View style={styles.unitBadge}><Text style={styles.unitText}>inches</Text></View>
        </View>

        <View style={styles.spacerLarge} />

        <Text style={styles.questionLabel}>Weight?</Text>
        <View style={styles.inputRow}>
          <TextInput 
            style={styles.fixedWidthInput} 
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#CCC"
            value={formData.weight}
            onChangeText={(t) => updateField('weight', t)}
            textAlign="center" 
          />
          <View style={styles.unitBadge}><Text style={styles.unitText}>lbs</Text></View>
        </View>

        <View style={styles.spacerLarge} />

        <Text style={styles.questionLabel}>Age?</Text>
        <View style={styles.inputRow}>
          <TextInput 
            style={styles.fixedWidthInput} 
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#CCC"
            value={formData.age}
            onChangeText={(t) => updateField('age', t)}
            textAlign="center" 
          />
          <View style={styles.unitBadge}><Text style={styles.unitText}>years</Text></View>
        </View>
      </View>
    </View>
  );

  const renderStep2_Sex = () => (
    <View style={styles.stepContent}>
      <View style={styles.headerBlock}>
        <Text style={styles.stepTitle}>Few more to go...</Text>
        <ProgressBar progress={40} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.questionLabel}>Sex</Text>
        <View style={styles.selectRow}>
          {['Female', 'Male', 'Other'].map((opt) => (
            <SelectButton 
              key={opt} 
              label={opt} 
              selected={formData.sex === opt.toLowerCase()} 
              onPress={() => {
                if (opt.toLowerCase() !== 'other') {
                   setFormData(prev => ({ ...prev, sex: opt.toLowerCase(), sexOther: '' }));
                } else {
                   setFormData(prev => ({ ...prev, sex: 'other' }));
                }
              }}
            />
          ))}
        </View>

        {formData.sex === 'other' && (
          <View style={styles.fadeContainer}>
            <Text style={styles.subLabel}>Please specify</Text>
            <TextInput 
              style={{
                backgroundColor: '#F9F9F9',
                borderRadius: 14,
                padding: 16,
                fontSize: 16,
                color: '#1A1A1A',
                borderWidth: 1,
                borderColor: '#F0F0F0',
                width: '100%', 
              }}
              placeholder="Type here..."
              placeholderTextColor="#CCC"
              value={formData.sexOther}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, sexOther: text }));
              }}
            />
          </View>
        )}

        {formData.sex === 'female' && (
          <View style={styles.fadeContainer}>
            <View style={styles.divider} />
            <Text style={styles.questionLabelSmall}>Are you pregnant?</Text>
            <View style={styles.radioGroup}>
              <RadioOption 
                label="Yes" 
                active={formData.isPregnant === true} 
                onPress={() => updateField('isPregnant', true)} 
              />
              <RadioOption 
                label="No" 
                active={formData.isPregnant === false} 
                onPress={() => updateField('isPregnant', false)} 
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );

  const renderStep3_Stress = () => {
    const getStressColor = (level: number) => {
      if (level === 0) return '#F0F0F0';
      if (level <= 3) return '#A8E6CF'; 
      if (level <= 7) return '#FFD3B6'; 
      return '#FFAAA5'; 
    };

    return (
      <View style={styles.stepContent}>
        <View style={styles.headerBlock}>
          <Text style={styles.stepTitle}>Halfway there!</Text>
          <ProgressBar progress={60} />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.questionLabel}>How would you rate your Stress Levels?</Text>
          
          <View style={styles.stressContainer}>
            {[...Array(10)].map((_, i) => {
              const level = i + 1;
              const isSelected = formData.stressLevel >= level;
              const isCurrent = formData.stressLevel === level;
              
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8}
                  style={[
                    styles.stressDot,
                    isSelected && { backgroundColor: getStressColor(formData.stressLevel) },
                    isCurrent && styles.stressDotActive 
                  ]}
                  onPress={() => updateField('stressLevel', level)}
                />
              );
            })}
          </View>
          
          <Text style={[styles.stressFeedback, { color: getStressColor(formData.stressLevel || 5) }]}>
             {formData.stressLevel === 0 ? "Select a level" :
              formData.stressLevel <= 3 ? "Low Stress" : 
              formData.stressLevel <= 7 ? "Moderate Stress" : "High Stress"}
          </Text>
        </View>
      </View>
    );
  };

  const renderStep4_Details = () => (
    <ScrollView 
      contentContainerStyle={{ paddingBottom: 120 }} 
      showsVerticalScrollIndicator={false}
      style={styles.stepContentScroll}
    >
      <View style={styles.headerBlock}>
        <Text style={styles.stepTitle}>Almost done...</Text>
        <Text style={styles.stepSubtitle}>Just a few more details</Text>
        <ProgressBar progress={80} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.sectionHeader}>Preferred Pharmacies</Text>
        <View style={styles.inputWithLabel}>
          <Text style={styles.inputLabelPrefix}>#1</Text>
          <TextInput 
            style={styles.cleanTextInput} 
            placeholder="Enter Address" 
            placeholderTextColor="#CCC"
            value={formData.pharmacy1}
            onChangeText={(t) => updateField('pharmacy1', t)}
          />
        </View>
        <View style={styles.inputWithLabel}>
          <Text style={styles.inputLabelPrefix}>#2</Text>
          <TextInput 
            style={styles.cleanTextInput} 
            placeholder="Enter Address (Optional)"
            placeholderTextColor="#CCC"
            value={formData.pharmacy2}
            onChangeText={(t) => updateField('pharmacy2', t)}
          />
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>List any allergies (Optional)</Text>
        <TextInput 
          style={styles.cleanTextArea} 
          placeholder="e.g. Peanuts, Penicillin..." 
          placeholderTextColor="#CCC"
          multiline
          value={formData.allergies}
          onChangeText={(t) => updateField('allergies', t)}
        />

        <View style={styles.divider} />

        <View style={styles.questionRow}>
          <Text style={styles.questionLabelInline}>Do you consume any drugs?</Text>
          <View style={styles.radioGroupHorizontal}>
             <RadioOption label="Yes" active={formData.consumesDrugs === true} onPress={() => updateField('consumesDrugs', true)} />
             <View style={{width: 16}} />
             <RadioOption label="No" active={formData.consumesDrugs === false} onPress={() => updateField('consumesDrugs', false)} />
          </View>
        </View>

        <View style={styles.dividerSmall} />

        <View style={styles.questionRow}>
          <Text style={styles.questionLabelInline}>Do you consume alcohol?</Text>
          <View style={styles.radioGroupHorizontal}>
             <RadioOption label="Yes" active={formData.consumesAlcohol === true} onPress={() => updateField('consumesAlcohol', true)} />
             <View style={{width: 16}} />
             <RadioOption label="No" active={formData.consumesAlcohol === false} onPress={() => updateField('consumesAlcohol', false)} />
          </View>
        </View>
        
        <View style={styles.dividerSmall} />
        
        <View style={styles.questionRow}>
          <Text style={styles.questionLabelInline}>Comfortable with pills?</Text>
          <View style={styles.radioGroupHorizontal}>
             <RadioOption label="Yes" active={formData.comfortableWithPills === true} onPress={() => updateField('comfortableWithPills', true)} />
             <View style={{width: 16}} />
             <RadioOption label="No" active={formData.comfortableWithPills === false} onPress={() => updateField('comfortableWithPills', false)} />
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderStep5_Done = () => (
    <View style={styles.centerContent}>
      <View style={styles.headerBlock}>
        <Text style={styles.stepTitle}>Done!</Text>
        <ProgressBar progress={100} />
      </View>
      
      <View style={styles.successContainer}>
         <Image source={require('../assets/images/medguide.png')} style={styles.logoLarge} resizeMode="contain"/>
         <Text style={styles.completeText}>Your Profile is Complete.</Text>
         
         <TouchableOpacity 
            style={[styles.finishButton, isSubmitting && styles.finishButtonDisabled]} 
            onPress={handleNext}
            activeOpacity={0.8}
            disabled={isSubmitting}
         >
           {isSubmitting ? (
             <ActivityIndicator color="#1A1A1A" />
           ) : (
             <>
               <Text style={styles.finishButtonText}>Go to Home</Text>
               <Ionicons name="arrow-forward" size={18} color="#1A1A1A" />
             </>
           )}
         </TouchableOpacity>
      </View>
    </View>
  );

  if (step === 0) return renderStep0_Welcome();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      
      <View style={styles.contentArea}>
        {step === 1 && renderStep1_Physical()}
        {step === 2 && renderStep2_Sex()}
        {step === 3 && renderStep3_Stress()}
        {step === 4 && renderStep4_Details()}
        {step === 5 && renderStep5_Done()}
      </View>

      {step > 0 && step < 5 && (
        <View style={styles.footer}>
          
          <View style={{ width: 50 }}> 
            {step > 1 && (
              <TouchableOpacity onPress={handleBack} style={styles.iconBtn} activeOpacity={0.7}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
            )}
          </View>
          
          {step === 4 ? (
            <TouchableOpacity onPress={() => {
               if (validateStep(4)) setStep(5);
            }} style={styles.doneBtn} activeOpacity={0.8}>
              <Text style={styles.doneBtnText}>Finish</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleNext} style={styles.iconBtn} activeOpacity={0.7}>
               <Ionicons name="arrow-forward" size={24} color="#333" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentArea: {
    flex: 1,
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#FFB3D1',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeDesc: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginBottom: 32,
    lineHeight: 24,
  },
  startButton: {
    backgroundColor: '#FFB3D1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    gap: 8,
    width: '100%',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  stepContent: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 80, 
  },
  stepContentScroll: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
  },
  headerBlock: {
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
    marginBottom: 4,
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    marginTop: 12,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFB3D1',
    borderRadius: 3,
  },
  formGroup: {
    flex: 1,
  },
  centerForm: {
    alignItems: 'flex-start',
  },
  questionLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  fixedWidthInput: {
    width: 140,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cleanInput: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  unitBadge: {
    backgroundColor: '#FFB3D1',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    justifyContent: 'center',
  },
  unitText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  spacerLarge: {
    height: 40,
  },
  selectRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  selectBtn: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectBtnActive: {
    backgroundColor: '#FFB3D1',
    borderColor: '#FFB3D1',
    shadowColor: '#FFB3D1',
    shadowOpacity: 0.4,
  },
  selectBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  selectBtnTextActive: {
    color: '#1A1A1A',
    fontWeight: '700',
  },
  cleanTextInput: {
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    flex: 1,
  },
  subLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666',
  },
  fadeContainer: {
    marginTop: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 32,
  },
  dividerSmall: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 24,
  },
  questionLabelSmall: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  questionLabelInline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  radioGroup: {
    gap: 16,
  },
  radioGroupHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  radioCircleActive: {
    borderColor: '#FFB3D1',
    backgroundColor: '#FFF',
  },
  radioDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFB3D1',
  },
  radioText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  radioTextActive: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  stressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  stressDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
  },
  stressDotActive: {
    transform: [{ scale: 1.3 }], 
  },
  stressFeedback: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 22,
    fontWeight: '800',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  inputWithLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputLabelPrefix: {
    width: 32,
    fontSize: 16,
    fontWeight: '700',
    color: '#999',
  },
  cleanTextArea: {
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    height: 120,
    textAlignVertical: 'top',
  },
  centerContent: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 80,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -80, 
  },
  logoLarge: {
    width: 140,
    height: 140,
    marginBottom: 32,
  },
  completeText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 40,
    textAlign: 'center',
  },
  finishButton: {
    backgroundColor: '#FFB3D1',
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 32,
    shadowColor: '#FFB3D1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  finishButtonDisabled: {
    opacity: 0.7,
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 48, 
    paddingTop: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#FAFAFA',
  },
  iconBtn: {
    padding: 16,
    borderRadius: 50,
    backgroundColor: '#F9F9F9',
  },
  doneBtn: {
    backgroundColor: '#FFB3D1', 
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    shadowColor: '#FFB3D1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  doneBtnText: {
    color: '#1A1A1A', 
    fontWeight: '700',
    fontSize: 16,
  },
});
