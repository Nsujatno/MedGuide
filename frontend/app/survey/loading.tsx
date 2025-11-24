import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function LoadingScreen() {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dotsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(dotsAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(dotsAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      router.replace('/profile-dashboard/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#ffffff', '#ffe8f0']}
      style={styles.container}
    >
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View 
            style={[
              styles.progressFill,
              {
                opacity: fadeAnim,
              }
            ]} 
          />
        </View>
      </View>

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: pulseAnim }],
          }
        ]}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/medguide.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.glow} />
        </View>

        <Text style={styles.message}>
          Generating your{'\n'}medication plan
          <Animated.Text style={{ opacity: dotsAnim }}>.</Animated.Text>
          <Animated.Text 
            style={{ 
              opacity: dotsAnim.interpolate({
                inputRange: [0, 0.33, 1],
                outputRange: [0, 0, 1],
              })
            }}
          >
            .
          </Animated.Text>
          <Animated.Text 
            style={{ 
              opacity: dotsAnim.interpolate({
                inputRange: [0, 0.66, 1],
                outputRange: [0, 0, 1],
              })
            }}
          >
            .
          </Animated.Text>
        </Text>

        <View style={styles.dotsContainer}>
          <Animated.View 
            style={[
              styles.dot,
              {
                opacity: dotsAnim.interpolate({
                  inputRange: [0, 0.33, 1],
                  outputRange: [0.3, 1, 0.3],
                }),
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.dot,
              {
                opacity: dotsAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.3, 1, 0.3],
                }),
              }
            ]} 
          />
          <Animated.View 
            style={[
              styles.dot,
              {
                opacity: dotsAnim.interpolate({
                  inputRange: [0, 0.66, 1],
                  outputRange: [0.3, 1, 0.3],
                }),
              }
            ]} 
          />
        </View>
      </Animated.View>
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
    width: '100%',
    backgroundColor: '#FF6B9D',
    borderRadius: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    zIndex: 2,
  },
  glow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#FF6B9D',
    opacity: 0.15,
    zIndex: 1,
  },
  message: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    letterSpacing: -0.5,
    lineHeight: 36,
    marginBottom: 32,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B9D',
  },
});
