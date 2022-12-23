import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

//import {theme } from '../styles/Theme';

const CustomInput = ({ keyboardType, value, onChangeText, placeholder, password, iconName }) => {
    
    const [showPassword, setShowPassword] = useState(false);

    const handlePassword = () => {
        setShowPassword(!showPassword);
    }
    
    return (
        <View style={styles.inputArea}>
            <View style={styles.inputcontainer}>
            <MaterialIcons name={iconName} size={28} color={'#000'} />
            <TextInput
                keyboardType={keyboardType}
                autoCapitalize='none'
                placeholderTextColor={'#000'}
                value={value}
                style={styles.inputText}
                onChangeText={onChangeText}
                secureTextEntry={password && !showPassword}
                placeholder={placeholder} />
            </View>
            <View style={styles.passContainer}>
            {password &&
                <TouchableOpacity
                    onPress={() => handlePassword()}>
                    <Feather name={showPassword ? "eye-off" : "eye"} size={18} color={'#000'} />
                </TouchableOpacity>
            }
            </View>
        </View>
    );
}

export default CustomInput;

const styles = StyleSheet.create({
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        height: 42,
        borderRadius: 8,
        width: '100%',
        justifyContent: 'flex-start',
        paddingLeft: 8,
        marginBottom: 16,
    },
    inputText: {
        color: '#000',
        paddingLeft: 8,
        fontSize: 14,
    },
    inputcontainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    passContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 5,
        flex: 1
    }
});