import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, View, Text, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import CustomButton from '../components/CustomButton';
import * as Animatable from 'react-native-animatable';
import { Theme, theme } from '../styles/Theme';
import {useFonts} from 'expo-font';

const base64 = require('base-64');

const ViewLogin = (props) => {
    const [loading, setLoading] = useState(false)
    const [usuario, setUsuario] = useState({
        username: '',
        password: ''
    });
    
    async function login(){
        const res = await fetch('http://177.44.248.30:3333/auth', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64.encode(usuario.username + ":" + usuario.password)
            },
            body: JSON.stringify({
                user: ""
            }),
        });
        const response = await res.json();
        console.log(response)

        if(response.id){
            props.navigation.navigate('ViewTasks');
        }else{
            Alert.alert('Ops', response.message);
        }

    }

    return (
        <>
        <StatusBar translucent={false} style="light" backgroundColor='#fff' />
        <SafeAreaView style={styles.container}>
            {/* {loading ? <ActivityIndicator size='large'/>
            : <> */}
            <Animatable.Image
                //animation='slideDown'
                style={{width: 200}}
                resizeMode='contain'
                source={require('../assets/logo-crie-ti.png')} />
            
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
            <Animatable.View
            animation='fadeInUp'
            style={styles.formLogin}>

                <Text style={Theme.title}>Realizar Acesso</Text>
                
                <TextInput
                onChangeText={(value) => setUsuario({...usuario, username: value})}
                value={usuario.username}
                keyboardType='email-address'
                autoCapitalize='none'
                placeholder='Usuário'
                style={Theme.input} />

                <TextInput
                onChangeText={(value) => setUsuario({...usuario, password: value})}
                value={usuario.password}
                autoCapitalize='none'
                secureTextEntry={true}
                placeholder='Senha'
                style={Theme.input} />

                <CustomButton
                    label="Entrar"
                    onPress={()=> login()} />
            </Animatable.View>
            </KeyboardAvoidingView>
            {
}
        </SafeAreaView>
        </>
  )
}

const styles= StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#0C1A26',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formLogin:{
        //width: '90%',
        borderRadius: 12,
        backgroundColor: '#1A4173',
        justifyContent:'center',
        alignItems: 'center',
        padding: 16
    }
})

export default ViewLogin;