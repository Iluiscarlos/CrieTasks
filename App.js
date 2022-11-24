import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewLogin from './src/screens/ViewLogin';
import ViewTasks from './src/screens/ViewTasks';

import { Roboto_100Thin, Roboto_300Light, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import {useFonts} from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {

    const[fontsLoader] = useFonts({
      'Roboto-thin': require('./src/assets/fonts/Roboto-Thin.ttf'),
      Roboto_100Thin,
      Roboto_300Light,
      Roboto_500Medium,
      Roboto_700Bold
    })
    if(fontsLoader){
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="ViewLogin" component={ViewLogin}/>
        <Stack.Screen name="ViewTasks" component={ViewTasks}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
