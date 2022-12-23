import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, Alert } from 'react-native';
import LoginScreen, { SocialButton } from "react-native-login-screen";
import { Theme } from '../styles/Theme';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { AppContext } from '../contexts/AppContext';
const base64 = require('base-64');
import config from '../config/config';


const ViewNewLogin = ({navigation}) => {

    const fieldUser = "myapp_usuario"
    const fieldPassword = "myapp_password"
    const [loading, setLoading] = useState(false)

    const { username, password, saveUser } = useContext(AppContext);
    const usuario = {
        username: '',
        password: '',
        saveUser: false
    }


    function login(user, pass) {

        setLoading(true)
        
            async function testLogin() {
                // const res = await fetch('http://177.44.248.30:3333/auth', {
                //     method: 'POST',
                //     headers: {
                //         Accept: 'application/json',
                //         'Content-Type': 'application/json',
                //         'Authorization': 'Basic ' + base64.encode(user + ":" + pass)
                //     },
                //     body: JSON.stringify({
                //         user: ""
                //     }),
                // });
                try {
                    const AUTH_TOKEN = 'Basic ' +
                        base64.encode(user + ":" + pass)

                      

                    const response = await axios.get('/auth', {
                        headers: {
                            'Authorization': AUTH_TOKEN
                        }
                    });


  console.log("Retorno login" + response.data)

                    if (response.status == 200) {
                        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
                        saveUser(user, pass)

                        navigation.navigate('ViewNav');

                    } else if (response.status == 400) {
                        // Alert.alert('Erro', json.message)
                    }
                } catch (error) {
                    Alert.alert('Erro', error.message)
                } finally { //sempre vai executar
                    setLoading(false)

                }
            }
            testLogin();
            
    }

    return (
        <ScrollView>
            <View>
                <LoginScreen
                    style={Theme.login}
                    logoImageSource={require("../assets/logo-crie-ti.png")}
                    onLoginPress={() => login(usuario.username, usuario.password)}
                    onSignupPress={() => { }}
                    onEmailChange={(email) => { usuario.username = email }}
                    onPasswordChange={(password) => { usuario.password = password }}
                />
            </View>
            <StatusBar translucent={false} style="light" backgroundColor='#fff' />
        </ScrollView>
    )
}

export default ViewNewLogin;