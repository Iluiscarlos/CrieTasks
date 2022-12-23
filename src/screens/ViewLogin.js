import React, { useState, useEffect, useContext, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View, Text, TextInput, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import CustomButton from '../components/CustomButton';
import * as Animatable from 'react-native-animatable';
// import { Theme } from '../styles/Theme';
import Checkbox from 'expo-checkbox';
// import * as LocalAuthentication from 'expo-local-authentication';

import { AppContext } from '../contexts/AppContext';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import CustomInput from '../components/CustomInput';

const base64 = require('base-64');
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

const ViewLogin = ({navigation}) => {
    
    const fieldUser = "myapp_usuario"
    const fieldPassword = "myapp_password"
    const [loading, setLoading] = useState(false)
    const [usuario, setUsuario] = useState({
        username: '',
        password: '',
        saveUser: false
    });
    const { saveUser } = useContext(AppContext)
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    // const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    // // Check if hardware supports biometrics
    // useEffect(() => {
    //     (async () => {
    //         const compatible = await LocalAuthentication.hasHardwareAsync();
    //         setIsBiometricSupported(compatible);
    //         console.log('compatible => ', compatible);
    //     })();
    // }, []);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

      async function registerForPushNotificationsAsync() {
        let token;
      
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        // if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        // } else {
        //   alert('Must use physical device for Push Notifications');
        // }
      
        return token;
      }

    useEffect(() => {

        async function getSecureStore() {
            const _username = await SecureStore.getItemAsync(fieldUser);
            const _password = await SecureStore.getItemAsync(fieldPassword);
            if (_username && _password) {
                setUsuario({
                    username: _username,
                    password: _password,
                    saveUser: true
                });
                //login(_username, _password);
            }
        }

        getSecureStore();

    }, []) //seja executado somente na primeira renderizacao do componente

    function login(user, pass) {

        setLoading(true);

        // setTimeout(() => {

            async function testLogin() {
                const response = await axios.get('/auth', {
                    headers: {
                        'Authorization': 'Basic ' +
                            base64.encode(user + ":" + pass)
                    }
                });
                const json = await response.data;
                setLoading(false);
                if (json.id) {
                    if (usuario.saveUser) {
                        await SecureStore.setItemAsync(fieldUser, usuario.username);
                        await SecureStore.setItemAsync(fieldPassword, usuario.password);
                        console.log("gravou");
                    } else {
                        await SecureStore.deleteItemAsync(fieldUser);
                        await SecureStore.deleteItemAsync(fieldPassword);
                    }
                    
                    //navegar adiante
                    
                    const AUTH_TOKEN = 'Basic ' +
                    base64.encode(usuario.username + ":" + usuario.password);
                    
                    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
                    
                    saveUser(usuario.username, usuario.password, json.id, json.name)
                    
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "ViewNav" }]
                    })

                } else {
                    Alert.alert('Que pena 😥', json.message);
                }
            }

            testLogin();

        // }, 900)

    }

    return (
        <>
            <StatusBar translucent={false} style="light" backgroundColor='#fff' />
            <SafeAreaView style={styles.container}>
                {/* {loading ? <ActivityIndicator size='large'/>
            : <> */}
                <Animatable.Image
                    //animation='slideDown'
                    style={{ width: 200 }}
                    resizeMode='contain'
                    source={require('../assets/logo-crie-ti.png')}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                <Animatable.View
                    animation='fadeInUp'
                    style={styles.formLogin}>

                    <Text style={styles.title}>Realizar Acesso</Text>
                        
                        <CustomInput
                        keyboardType="email-address"
                        value={usuario.username}
                        iconName={"mail-outline"}
                        onChangeText={(value) => setUsuario({ ...usuario, username: value })}
                        placeholder="E-mail"
                        password={false}
                    />

                        <CustomInput
                        value={usuario.password}
                        iconName={"lock-outline"}
                        onChangeText={(value) => setUsuario({ ...usuario, password: value })}
                        placeholder="Senha"
                        password={true}
                    />

                    <View style={styles.checkbox}>
                        <Checkbox
                            value={usuario.saveUser}
                            onValueChange={() => setUsuario({ ...usuario, saveUser: !usuario.saveUser })}
                            color={'#fff'}
                        />
                        <Text style={{ fontSize: 10, color: '#fff', marginLeft: 20 }}>Manter conectado</Text>
                    </View>
                    <CustomButton
                        label="Entrar"
                        onPress={() => login(usuario.username, usuario.password)} />
                </Animatable.View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#0C1A26',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formLogin: {
        borderRadius: 12,
        backgroundColor: '#FF9600',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    checkbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0C1A26',
        marginTop: 10,
        marginBottom: 10
    }
}
);

export default ViewLogin;