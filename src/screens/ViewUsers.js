import { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View, FlatList, useColorScheme, Alert, TouchableOpacity, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Theme } from '../styles/Theme';
import { FontAwesome } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store';
const base64 = require('base-64');
import { StatusBar } from 'expo-status-bar';

//import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AppContext } from '../contexts/AppContext';
import CustomButton from '../components/CustomButton';
import { FlotingButtom } from '../components/FloatingButton';
import { Modalize } from 'react-native-modalize';
import 'react-native-gesture-handler';
import ItemSex from '../components/ItemSex'
import axios from 'axios';
import Header from '../components/Header';


const { width, height } =  Dimensions.get('window');

const ViewUsers = ({navigation}) => {
    const initialUser ={
        birthday: undefined,
        email:"",
        name:"",
        password:"",
        sex: "",
    }

    const modalRef = useRef(null);
    const fieldUser = "myapp_usuario"
    const fieldPassword = "myapp_password"
    const [loading, setLoading] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [user, setUser] = useState(initialUser)

    const {username, password} = useContext(AppContext);
    console.log('CREDENTIALS =>', username, password);

    useEffect(() => {
        listUsers()
    }, []);

    function onOpenModal(){
        modalRef.current?.open();
    }

    function alterUser(user){
        onOpenModal()
        setUser(user)
    }

    function newUser(){
        onOpenModal()
        useState(initialUser)
    }

    async function saveUser(){
        try{

            const payloade = {
                birthday: user.birthday,
                email: user.email,
                name: user.name,
                password: user.password,
                gender: user.gender
            }

            const response = null
            if(user.id > 0){
                response = await axios.put(`/employees/${user.id}`, payloade);
            }else{
                response = await axios.post(`/employees`, payloade);
            }
            if (response.status == 200) {

                modalRef.current?.close();

                listUsers();
            } else {
                Alert.alert('Ops', 'Erro ao salvar usuário');
            }

        } catch (error) {
            Alert.alert('Ops', error.message);
        }
    }

    async function listUsers() {

        setLoading(true)

        // const _username = await SecureStore.getItemAsync(fieldUser)
        // const _password = await SecureStore.getItemAsync(fieldPassword)

        const res = await axios.get('/employees', {
            headers: {
                'Authorization': 'Basic ' +
                    base64.encode(username + ":" + password)
            },
        });
        console.log('Entrou na funcao');
        const listUser = res.data

        setLoading(false)
        if(listUser){
        setUsuarios(listUser)
        }else{
            Alert.alert('Erro', listUser.message)
        }
    }

    return (
        <View style={Theme.container}>
            <SafeAreaView style={{flex: 1 , width: '90%'}}>
                <Header
                navigation={navigation} label='Lista de Usuários'
                leftItem={<></>}
                logout={true}
                />
                {/* <Text style={Theme.title}>Lista de Usuários</Text> */}
                <View style={styles.cabecalho}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Credenciais</Text>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Sexo</Text>
                </View>

                {/* <SkeletonPlaceholder>
                    <SkeletonPlaceholder.Item
                    width={200}
                    height={45} />
                    
                </SkeletonPlaceholder> */}
                {/* <ScrollVirew>
                    <View>
                        {
                            usuarios.map((users) => {
                                console.log("Item", users)
                                const setSexIcon = () =>{
                                if(users.sex === "M"){
                                    return <FontAwesome key={users.data} name="male" size={20} color="#BDF24B" />
                                }else{
                                    return <FontAwesome key={users.data} name="female" size={20} color="#FF00C9" />
                                }}
                                return (
                                    <>
                                        <View style={Theme.cardContainer}>
                                            <View style={Theme.cardInfo}>
                                                <Text key={users.id} style={{ fontSize: 15, color: '#fff' }}>{users.name}</Text>
                                                <Text key={users.data} style={{ borderBottomWidth: 15, color: '#999' }}>{users.email}</Text>
                                            </View>
                                            <Text key={users.data + 1} style={{ fontSize: 15, color: '#fff' }}>
                                                {setSexIcon()}
                                            </Text>
                                        </View>
                                        <View style={{ height: 1, backgroundColor: '#444', margin: 4 }}></View>
                                    </>
                                )
                            })
                        }
                    </View>
                </ScrollView> */}
                <FlatList
                    data={usuarios}
                    onRefresh={() => listUsers()}
                    refreshing={loading}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        const setSexIcon = item.gender === 'Male' ? 'male' : 'female';
                        return (
                            <>
                                <TouchableOpacity
                                onPress={() => alterUser(item)}
                                >
                                <View style={Theme.cardContainer}>
                                    <View style={Theme.cardInfo}>
                                        <Text style={{ fontSize: 15, color: '#fff' }}>{item.name}</Text>
                                        <Text style={{ borderBottomWidth: 15, color: '#999' }}>{item.email}</Text>
                                    </View>
                                    <FontAwesome name={setSexIcon} size={20} color={item.gender === 'Male' ? "#BDF24B" : "#FF00C9"} />
                                </View>
                                </TouchableOpacity>
                                <View style={{ height: 1, backgroundColor: '#444', margin: 4 }}></View>
                            </>
                        )
                    }}
                />
                <FlotingButtom
                icon="plus"
                color="#fff"
                onPress={() => onOpenModal(setUser(initialUser))}
            />
            </SafeAreaView>
                <Modalize
                ref={modalRef}
                snapPoint={400}
                modalHeight={height * 0.8}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}>
                <View style={styles.modalView}>
                    <Text>{user.id > 0 ? "Alterar Usuário" : "Novo Usuário"}</Text>
                    <Text style={Theme.cardInfo}>Name</Text>
                    <TextInput
                    keyboardType='words'
                    autoCapitalize='none'
                    value={user.name}
                    onChangeText={(name) => {setUser({...user, name: name})}}
                    style={styles.input}
                    placeholder="Name"
                    />
                    <Text style={Theme.cardInfo}>Email</Text>
                    <TextInput
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={user.email}
                    onChangeText={(email) => {setUser({...user, email: email})}}
                    style={styles.input}
                    placeholder="E-mail"
                    />
                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={Theme.cardInfo}>Data de Nasc</Text>
                                <TextInput
                                    keyboardType='words'
                                    value={user.birthday}
                                    onChangeText={(age) => { setUser({ ...user, birthday: age }) }}
                                    style={[styles.input, { width: '60%' }]}
                                    placeholder="Idade" />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={Theme.cardInfo}>Sexo</Text>
                                <ScrollView horizontal={true}>
                                    <ItemSex
                                        setUser={setUser}
                                        user={user}
                                        icon="female"
                                        sex="Female" />
                                    <ItemSex
                                        setUser={setUser}
                                        user={user}
                                        icon="male"
                                        sex="Male" />
                                </ScrollView>
                            </View>
                        </View>
                    <CustomButton 
                    label={'Salvar'}
                    onPress={saveUser}
                    />
                </View>
                </KeyboardAvoidingView>
                </Modalize>
                <StatusBar translucent={false} style="light" backgroundColor='#fff' />
        </View>
    )
}

const styles = StyleSheet.create({
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 1,
        paddingBottom: 4,
        borderBottomColor: '#fff'
    },
    modalView:{
        flex: 1,
        padding: 12
    },
    input: {
        height: 35,
        padding: 8,
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 8,
        borderColor: '#BDF24B',
        borderWidth: 2
    }
})

export default ViewUsers;