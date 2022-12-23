import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewLogin from './src/screens/ViewLogin';
import ViewTasks from './src/screens/ViewTasks';
import axios from 'axios';
import { Roboto_100Thin, Roboto_300Light, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import {useFonts} from 'expo-font';
import ViewUsers from './src/screens/ViewUsers';
import { AppProvider } from './src/contexts/AppContext';
import ViewNewLogin from './src/screens/ViewNewLogin';
import ViewCreate from './src/screens/ViewCreate';
import config from './src/config/config';
import ViewQuiz from './src/screens/ViewQuiz';
import ViewNav from './src/screens/ViewNav';
import ViewEffect from './src/screens/ViewEffect';
import ViewImages from './src/screens/ViewImage';
import ViewPicker from './src/screens/ViewPicker';
import ViewChart from './src/screens/ViewChart';
import Toast from 'react-native-toast-message';
import ViewMap from './src/screens/ViewMap';


const Stack = createNativeStackNavigator();

export default function App() {

    const[fontsLoader] = useFonts({
      'Roboto-thin': require('./src/assets/fonts/Roboto-Thin.ttf'),
      Roboto_100Thin,
      Roboto_300Light,
      Roboto_500Medium,
      Roboto_700Bold
    })

    axios.defaults.baseURL = config.baseURL;

    console.log(axios.defaults.baseURL)

    if(fontsLoader){
  return (

    <AppProvider>
      <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName='ViewLogin'
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="ViewLogin" component={ViewLogin}/>
        {/* <Stack.Screen name="ViewLogin" component={ViewLogin}/> */}
        <Stack.Screen name="ViewNav" component={ViewNav}/>
        <Stack.Screen name="ViewUsers" component={ViewUsers}/>
        <Stack.Screen name="ViewTasks" component={ViewTasks}/>
        <Stack.Screen name="ViewCreate" component={ViewCreate}/>
        <Stack.Screen name="ViewQuiz" component={ViewQuiz}/>
        <Stack.Screen name="ViewEffect" component={ViewEffect}/>
        <Stack.Screen name="ViewImages" component={ViewImages}/>
        <Stack.Screen name="ViewPicker" component={ViewPicker}/>
        <Stack.Screen name="ViewChart" component={ViewChart}/>
        <Stack.Screen name="ViewMap" component={ViewMap}/>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
      </>
  </AppProvider>
  );
    }else{
      return(
        <>
        <ActivityIndicator size="large" />
        <StatusBar style="auto" />
        </>
      )
    }
}
