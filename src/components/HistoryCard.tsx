import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

interface HistoryCardProps {
    date: string,
    time: string,
    pain: number,
    auraTypes: string[],
    symptoms: string[],
    medications: string[],
    weather?: string[],
    auraBefore?: string,
    auraDuration: number,
    auraPhoto?: string[],
}

const HistoryCard = ({
    date,
    time,
    pain,
    auraTypes,
    symptoms,
    medications,
    weather,
    auraBefore,
    auraDuration,
    auraPhoto
}: HistoryCardProps) => {
    const [expanded, setExpanded] = useState(false);

    // Always visible
    const mainRows = [
        { label: 'Date', value: date },
        { label: 'Time', value: time },
        { label: 'Pain', value: pain },
    ];

    // Expandable section
    const extraRows = [
        { label: 'Aura Types', value: auraTypes.join(', ') },
        { label: 'Symptoms', value: symptoms.join(', ') },
        { label: 'Medications', value: medications.join(', ') },
        { label: 'Weather Conditions', value: weather?.join(', ') || '-' },
        { label: 'Aura Before Headache', value: auraBefore || '-' },
        { label: 'Aura Duration', value: `${auraDuration} min` },
        { label: 'Photos', value: auraPhoto ? auraPhoto.length : 0 },
    ];

    return (
        <View style={styles.card}>
            {mainRows.map((row, idx) => (
                <View
                    key={row.label}
                    style={[
                        styles.row,
                        { backgroundColor: idx % 2 === 0 ? '#f5f5f5' : '#e0e0e0' }
                    ]}
                >
                    <Text style={styles.label}>{row.label}:</Text>
                    <Text style={styles.value}>{row.value}</Text>
                </View>
            ))}
            <TouchableOpacity onPress={() => setExpanded(e => !e)} style={styles.expandButton}>
                <Text style={styles.expandButtonText}>{expanded ? 'Hide Details ▲' : 'Show Details ▼'}</Text>
            </TouchableOpacity>
            {expanded && extraRows.map((row, idx) => (
                <View
                    key={row.label}
                    style={[
                        styles.row,
                        { backgroundColor: (mainRows.length + idx) % 2 === 0 ? '#f5f5f5' : '#e0e0e0' }
                    ]}
                >
                    <Text style={styles.label}>{row.label}:</Text>
                    <Text style={styles.value}>{row.value}</Text>
                </View>
            ))}
        </View>
    );
}

export default HistoryCard;

const styles = StyleSheet.create({
    card: {
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    value: {
        color: '#333',
        flex: 2,
        textAlign: 'right',
    },
    expandButton: {
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: '#e6e6e6',
    },
    expandButtonText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
})