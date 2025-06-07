import React from 'react'
import { Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'

interface LandingOptionButtonContainerProps {
  title: string;
  description: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const LandingOptionButtonContainer = ({
  title,
  description,
  onPress,
  containerStyle,
}: LandingOptionButtonContainerProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaskedView
        maskElement={
          <Text style={styles.title}>{title}</Text>
        }
      >
        <LinearGradient
          colors={['#4898c7', '#b66fa9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 28, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={[styles.title, { opacity: 0 }]}>{title}</Text>
        </LinearGradient>
      </MaskedView>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28272d',
    borderRadius: 16,
    marginVertical: 12,
    marginHorizontal: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 4,
    textAlign: 'left',
  },
})

export default LandingOptionButtonContainer