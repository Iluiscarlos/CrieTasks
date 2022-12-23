import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, Dimensions } from 'react-native';
const {width} = Dimensions.get('window');
// import { Container } from './styles';
import Logos from "../assets/logo-crie-ti.svg"

const ViewImages = () => {
  return (
    <View style={styles.container}>
        <SafeAreaView>
        <Text style={{color: '#fff'}}>Tela de imagens</Text>
        {/* <Image style={styles.tinyLogo}
            source={{
                uri: 'https://logodownload.org/wp-content/uploads/2017/04/instagram-logo.png',
            }}></Image> */}
            <Logos width={200} height={200} />
        </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1D435A',
      alignItems: 'center',
      justifyContent: 'top',
      padding: 8
    },
    img:{
        margin: 10
    },
    tinyLogo:{
        width:100,
        height:100,
        margin: 10
    }
});

export default ViewImages;