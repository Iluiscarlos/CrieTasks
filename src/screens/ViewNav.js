import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import Button from '../components/Button';
import * as Animatable from 'react-native-animatable';
import Header from '../components/Header';
import { StatusBar } from 'expo-status-bar';
import Avatar from '../components/Avatar';



const ViewNav = (props) => {
  return (
    <>
    <SafeAreaView style={styles.container}>
    <Header navigation={props.navigation} label="Menu Principal"
    leftItem={<Avatar />}
        logout={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}>
    <Animatable.View animation='fadeIn' >
        <Button 
        label="Lista de Usuários"
        onPress={() => props.navigation.navigate("ViewUsers")}>
        </Button>
        <Button 
        label="Lista de Tarefas"
        onPress={() => props.navigation.navigate("ViewTasks")}>
        </Button>
        <Button 
        label="Quiz"
        onPress={() => props.navigation.navigate("ViewQuiz")}>
        </Button>
        <Button 
        label="ViewMap"
        onPress={() => props.navigation.navigate("ViewMap")}>
        </Button>
        <Button 
        label="ViewChart"
        onPress={() => props.navigation.navigate("ViewChart")}>
        </Button>
        <Button 
        label="ViewState"
        onPress={() => props.navigation.navigate("ViewState")}>
        </Button>
        <Button 
        label="ViewEffect"
        onPress={() => props.navigation.navigate("ViewEffect")}>
        </Button>
        <Button 
        label="ViewPicker"
        onPress={() => props.navigation.navigate("ViewPicker")}>
        </Button>
        <Button 
        label="ViewImages"
        onPress={() => props.navigation.navigate("ViewImages")}>
        </Button>
    </Animatable.View>
    </ScrollView>
    <StatusBar translucent={false} style="light" backgroundColor='#fff' />
    </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0C1A26'
    }
})

export default ViewNav;