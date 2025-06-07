import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import LandingPage from './src/screens' // index.tsx in screens folder

export default function App() {
  return (
      <View style={styles.container}>
        <LandingPage />
        <StatusBar style="light" />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1c21',
  },
})