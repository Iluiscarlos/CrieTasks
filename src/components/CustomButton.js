import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

const CustomButton = ({ label, onPress }) => {
    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.button, styles.shadows]}
                >
                <Text style={styles.textButton}>{label}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 42,
        width: '80%',
        backgroundColor: '#BDF24B',
        borderRadius: 8,
        marginTop: 10,
        padding: 4
    },
    textButton: {
        fontSize: 20,
        fontFamily: 'Roboto_500Medium',
        color: '#000',
        textAlign: 'center',
    },
    shadows:{
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
    }
});
export default CustomButton;