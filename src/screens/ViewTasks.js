import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, StyleSheet, Text, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import Button from "../components/Button";
import LottieView from 'lottie-react-native';
import Checkbox from 'expo-checkbox';
import {Ionicons} from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Container } from './styles';



const ViewTasks = () => {

    const [taskList, setTaskList] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {

        const getTasksAsync = async () => {
            try {
                const variavel = await AsyncStorage.getItem('@tasklist');
                if (variavel != null) {
                    setTaskList(JSON.parse(variavel));
                }
            } catch (e) {
                console.log('ERROR GET=>', e)
            }
        }

        getTasksAsync()

    }, [])

    useEffect(() => {

        const setTaskAsync = async () => {
            try {
                if (taskList) {
                    await AsyncStorage.setItem('@tasklist', JSON.stringify(taskList));
                }
            } catch (e) {
                console.log('ERROR=>', e);
            }
        }

        setTaskAsync()

    }, [taskList])

    const upgradeList = () => {
            if (task) {
                const newTask = {
                id: String(new Date().getTime()),
                name: task,
                done: false
            }

            const orderTaskList = [...taskList, newTask].sort((a, b) => (a.name > b.name ? 1 : (b.name > a.name ? -1 : 0)))
            setTaskList(orderTaskList)
            setTask("")

        } else {
            Alert.alert('Ops', 'Tarefa não pode ser em branco')
        }
    }
    const deleteTask = (id) => {
        //queremos excluir o item que contém este ID da lista
        Alert.alert('Atenção', 'Deseja excluir a tarefa?', [
            {
                text: "Sim",
                onPress: async () => {
                    setTaskList([...taskList.filter((item) => item.id !== id)])
                }
            },
            {
                text: "Não",
                onPress: () => { console.log('NAO') }
            }
        ])

    }

    const handleCheckTask = (id) => {

        const newTaskList = taskList.map(item => {
            if(item.id == id){
                //encontramos o elemento a ser alterado
                return {...item, done: !item.done}
            }
            return item;
        })

        setTaskList(newTaskList);

    }


    return (
        <View style={styles.container}>
        <StatusBar translucent={false} style="light" backgroundColor='#fff' />
            <SafeAreaView>
                <Text style={styles.label}>Tarefa</Text>
                <TextInput
                    keyboardType='default'
                    placeholder='Digite sua tarefa'
                    placeholderTextColor='#bebebe'
                    value={task}
                    onChangeText={(value) => setTask(value)}
                    style={styles.input} />

                <Button
                    onPress={upgradeList}
                    label="Salvar">
                </Button>



                {
                    taskList.length > 0 ?
                        taskList.map((item) => {
                            console.log(item)
                            return (
                                <View
                                key={item.id}
                                style={styles.itemList}>
                                <Checkbox
                                    value={item.done}
                                    onValueChange={() => handleCheckTask(item.id)}
                                    color={item.done ? '#444' : '#fff'}
                                />
                                <Text style={[styles.itemText, { textDecorationLine: item.done ? 'line-through' : 'none' }]}>{item.name}</Text>
                                <TouchableOpacity
                                    onPress={() => deleteTask(item.id)}>
                                        <Ionicons name="trash-outline" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>

                                // <TouchableOpacity
                                //     key={item.id}
                                //     onLongPress={() => deleteTask(item.id)}>
                                //     <Text style={{ color: '#fff', fontSize: 24, marginTop: 10 }}>{item.name}</Text>
                                // </TouchableOpacity>
                            )
                        })
                        :
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <LottieView
                                autoPlay
                                style={{
                                    width: 200,
                                    height: 200,
                                }}
                                source={require('../assets/animations/empty.json')}
                            />
                            <Text style={{ fontSize: 21, color: "#fff" }}>Nenhuma tarefa</Text>
                        </View>
                }
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0C1A26',
        alignItems: 'center',
        paddingTop: 45
    },
    input: {
        width: 300,
        height: 40,
        color: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
    },
    label: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },
    itemList: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemText: {
        color: '#fff',
        fontSize: 24
    }
});

export default ViewTasks;