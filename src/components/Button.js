import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

const Button = ({ label, onPress }) => {
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
        width: '100%',
        height: 48,
        backgroundColor: '#BDF24B',
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 15,
        padding: 4
    },
    textButton: {
        fontSize: 20,
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
export default Button;