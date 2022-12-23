import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Theme } from '../styles/Theme';

// import { Container } from './styles';

const ViewQuiz = () => {

    const [count, setCount] = useState(0);

    const perguntas = [
        {
            pergunta: 'Qual o ano de descobrimento do Brasil?',
            op1: '1422',
            op2: '1500',
            op3: '1992',
            op4: '1899',
            correcao: '1500'
        }
    ]

    const validarResposta = (alternativa) => {
        console.log('Correto? ',
        alternativa === perguntas[count].correcao ? 'SIM' : 'NÃO');
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
            <Text style={Theme.title}>Pergunta:</Text>
            <Text style={styles.quiz}>{perguntas[count].pergunta}</Text>
            </View>
            <TouchableOpacity style={styles.cardAnswer} onPress={() => validarResposta(perguntas[count].op1)}>
                <View>
                    <Text style={styles.text}>A){perguntas[count].op1}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardAnswer} onPress={() => validarResposta(perguntas[count].op2)}>
                <View>
                    <Text style={styles.text}>B){perguntas[count].op2}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardAnswer} onPress={() => validarResposta(perguntas[count].op3)}>
                <View>
                    <Text style={styles.text}>C){perguntas[count].op3}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardAnswer} onPress={() => validarResposta(perguntas[count].op4)}>
                <View>
                    <Text style={styles.text}>D) {perguntas[count].op4}</Text>
                </View>
            </TouchableOpacity>
            <StatusBar translucent={false} style="light" backgroundColor='#fff' />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#2D77A6',
        alignItems: 'center',

    },
    cardContainer:{
        width: '80%',
        height: 150,
        borderRadius: 10,
        backgroundColor: '#A0D3D9',
        marginTop: 80,  
        alignItems: 'center',
        marginBottom: 15

    },
    quiz:{
        fontSize: 20,
        color: '#000',
        marginTop: 10,
        marginLeft: 0,
        textAlign: 'center'

    },
    text:{
        fontSize: 15,
        color: '#000',
        
    },
    cardAnswer:{
        width: '80%',
        height: 60,
        backgroundColor: '#75AABF',
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ViewQuiz;