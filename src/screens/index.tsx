import React, { useRef, useState } from 'react'
import { View, Text, Animated, Easing, ScrollView } from 'react-native'
import InstantLogButton from '../components/InstantLogButton'
import LandingOptionButtonContainer from '../components/LandingOptionButtonContainer'
import { LinearGradient } from 'expo-linear-gradient'
import * as Haptics from 'expo-haptics'
import Svg, { Path } from 'react-native-svg'

import type { NavigationProp } from '@react-navigation/native'

const BUTTON_SIZE = 110
const BUTTON_WIDTH = 370
const BUTTON_RADIUS = 16 // match IL button b.r

const BORDER_GAP = 6 //space between button and border

//creates rounded rectangle path
function roundedRectPath(x: number, y: number, w: number, h: number, r: number) {
  return `
    M${x + r},${y}
    h${w - 2 * r}
    a${r},${r} 0 0 1 ${r},${r}
    v${h - 2 * r}
    a${r},${r} 0 0 1 -${r},${r}
    h-${w - 2 * r}
    a${r},${r} 0 0 1 -${r},-${r}
    v-${h - 2 * r}
    a${r},${r} 0 0 1 ${r},-${r}
    z
  `
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

const LandingPage = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [showingSuccess, setShowingSuccess] = useState(false)
  const anim = useRef(new Animated.Value(0)).current

  const showToast = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
      }, i * 20)
    }
    setShowingSuccess(true)
    Animated.timing(anim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(anim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: false,
        }).start(() => setShowingSuccess(false))
      }, 2000)
    })
  }

  const gradientWidth = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  const glow = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.9],
  })

  const animatedTextColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#1d1c21'],
  })

  const borderWidth = BUTTON_WIDTH + BORDER_GAP * 2
  const borderHeight = BUTTON_SIZE + BORDER_GAP * 2
  const borderRadius = BUTTON_RADIUS + BORDER_GAP

  const borderRectPath = roundedRectPath(
    1.5, // x
    1.5, // y
    borderWidth - 3, //width
    borderHeight - 3, // height
    borderRadius
  )
  const borderPathLength =
    2 * (borderWidth + borderHeight - 2 * borderRadius) + 2 * Math.PI * borderRadius

  const strokeDashoffset = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [borderPathLength, 0],
  })

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#1d1c21',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 32,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={{ color: '#fff', fontSize: 55, marginVertical: 26, marginTop: 60 }}>AuraLog</Text>
      <View style={{ marginBottom: 32 }}>
        <Text style={{ color: '#ccc', fontSize: 18, textAlign: 'left', paddingHorizontal: 14 }}>
          Log a migraine instantly with a single tap–time, default meds, and weather conditions included. Add details when you're feeling better.
        </Text>
      </View>
      <View style={{
        position: 'relative',
        marginBottom: 40,
        width: BUTTON_WIDTH,
        height: BUTTON_SIZE,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          position: 'absolute',
          left: -BORDER_GAP,
          top: -BORDER_GAP,
          width: borderWidth,
          height: borderHeight,
          zIndex: 3,
          pointerEvents: 'none',
        }}>
          <Svg width={borderWidth} height={borderHeight}>
            <AnimatedPath
              d={borderRectPath}
              stroke="#43e97b"
              strokeWidth={3}
              fill="none"
              strokeDasharray={borderPathLength}
              strokeDashoffset={strokeDashoffset}
            />
          </Svg>
        </View>
        {/* glow */}
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: BUTTON_RADIUS,
            shadowColor: '#43e97b',
            shadowOpacity: glow,
            shadowRadius: 32,
            shadowOffset: { width: 0, height: 0 },
            zIndex: 1,
          }}
        />
        {/* green gradient overlay */}
        <View style={{
          overflow: 'hidden',
          borderRadius: BUTTON_RADIUS,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#6a11cb'
        }}>
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: gradientWidth,
              zIndex: 1,
            }}
          >
            <LinearGradient
              colors={['#43e97b', '#38f9d7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: '100%', height: '100%' }}
            />
          </Animated.View>
          {/* Animated text */}
          <Animated.Text
            style={{
              color: animatedTextColor,
              fontWeight: 'bold',
              fontSize: showingSuccess ? 26 : 34,
              letterSpacing: 1,
              textShadowColor: showingSuccess ? '#43e97b' : '#000',
              textShadowRadius: showingSuccess ? 12 : 0,
              zIndex: 2,
              textAlign: 'center',
            }}
          >
            {showingSuccess ? 'Log Successfully Saved' : 'Instant Log'}
          </Animated.Text>
          <View style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: BUTTON_WIDTH,
            height: BUTTON_SIZE,
            zIndex: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <InstantLogButton
              title=""
              width={BUTTON_WIDTH}
              height={BUTTON_SIZE}
              onPress={showToast}
              disabled={showingSuccess}
              backgroundColor="transparent"
              borderColor="transparent"
              containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
            />
          </View>
        </View>
      </View>
      <View style={{ width: '100%', paddingHorizontal: 8 }}>
        <LandingOptionButtonContainer
          title="Set Default Meds"
          description="Save your go-to medicine cocktail and zip code."
          onPress={() => navigation && navigation.navigate ? navigation.navigate('Settings') : null}
          containerStyle={{ borderRadius: 16, marginVertical: 10, backgroundColor: '#28272d' }}
        />
        <LandingOptionButtonContainer
          title="History"
          description="View and add details to past logs, see trends, and more."
          onPress={() => {}}
          containerStyle={{ borderRadius: 16, marginVertical: 10, backgroundColor: '#28272d' }}
        />
        <LandingOptionButtonContainer
          title="Add More Details"
          description="Expand your log with symptoms, triggers, and notes."
          onPress={() => {}}
          containerStyle={{
            borderRadius: 16,
            marginVertical: 10,
            backgroundColor: '#323c45',
            borderWidth: 1,
            borderColor: '#609ec7',
          }}
        />
      </View>
    </ScrollView>
  )
}

export default LandingPage