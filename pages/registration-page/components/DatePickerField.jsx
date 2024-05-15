// registration-page/components/DatePickerField.jsx
import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerField = ({ label }) => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={styles.dateDisplay}
                onPress={() => setShow(true)}
            >
            </TouchableOpacity>
            <View style={styles.pickerContainer}>
                {show && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        alignItems: 'flex-start', // Выровнять по левому краю
    },
    container: {
        marginBottom: 20,
    },

    label: {
        color: '#ffffff',
        fontSize: 14,
        // fontFamily: 'Source Sans Pro',
        fontWeight: '500',
    },
    dateDisplay: {
        backgroundColor: '#2b2b2b',
        borderRadius: 24,
        padding: 8,
    },
    dateText: {
        color: '#bbbbbb',
        fontSize: 16,
        // fontFamily: 'Source Sans Pro',
    },
    // Добавьте любые другие стили, которые вы хотите применить
});

export default DatePickerField;
