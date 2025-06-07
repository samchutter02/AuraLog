import React from 'react'
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'

type InstantLogButtonProps = {
  title: string
  width: number
  height: number
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  disabled?: boolean
  backgroundColor?: string
  borderColor?: string
  shadowColor?: string
}

const InstantLogButton: React.FC<InstantLogButtonProps> = ({
  title,
  width,
  height,
  onPress,
  containerStyle,
  textStyle,
  disabled = false,
  backgroundColor,
  borderColor,
  shadowColor,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    disabled={disabled}
    style={[
      {
        width,
        height,
        opacity: disabled ? 0.7 : 1,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: borderColor || '#2575fc', // Default to blue border before green
        backgroundColor: backgroundColor || '#6a11cb', // Default to purple background before green
        shadowColor: shadowColor || '#2575fc',
        shadowOpacity: shadowColor ? 0.7 : 0.18,
        shadowRadius: shadowColor ? 16 : 8,
        shadowOffset: { width: 0, height: 0 },
        elevation: shadowColor ? 8 : 2,
      },
      containerStyle,
    ]}
  >
    <Text
      style={[
        styles.text,
        textStyle,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
)

InstantLogButton.displayName = 'InstantLogButton'

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    paddingHorizontal: 8,
  },
})

export default InstantLogButton