import { Text, TextInput, StyleSheet, View } from 'react-native'
import React from 'react'

interface TextInputFieldProps {
    label: string,
    value: string | number,
    placeholder?: string,
}

const TextInputField = ({ label, value, placeholder }: TextInputFieldProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={String(value)}
                placeholder={placeholder}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#fff',
    },
})