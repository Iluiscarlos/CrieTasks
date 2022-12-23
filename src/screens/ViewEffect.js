import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
// import { Container } from './styles';

const {width} = Dimensions.get('window');

console.log('Tamanho da tela =>',width)

const ViewEffect = () => {
const [count, setCount] = useState(0);

useEffect(() => {
    console.log('Primeira rendenização (1)')
}, []);

useEffect(() => {
    console.log('Sempre que o componente foir rendenizado (2)')
});

useEffect(() => {
    console.log('Somente quando uma das váriaves de estado for modificada (3)')
}, [count]);

return(
    <>
    <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.view}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>Contador: {count}</Text>
                    <Button
                    onPress={() => setCount(count + 1)}
                    onLongPress={() => setCount(count + 2)}
                    label="Incrementar">
                    </Button>
                    <Button
                    onPress={() => setCount(count === 0)}
                    label="Zerar">
                    </Button>
                </View>
            </SafeAreaView>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#122A57',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8
    },
    view:{
        width: width * 0.9
    },
    userContainer: {
      marginTop: 15,
      backgroundColor: '#204996',
      padding: 6,
      borderRadius: 8
    }
});

export default ViewEffect;