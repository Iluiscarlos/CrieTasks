import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

import * as Location from 'expo-location'
// import { Container } from './styles';

const ViewMap = () => {

    
    const [ region, setRegion] = useState({
        latitude: 100,
        longitude: -33,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });
    const [ isReady, setisReady] = useState(false)

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          });
          console.log('Location =>',  location.coords)
        })();
      }, []);

      

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
            // provider='apple'
            onMapReady={() => setisReady(true)}
                initialRegion={region}
                region={{
                    latitude: region.latitude,
                    longitude: region.longitude
                }}
            >
                {isReady &&
            <Marker
                draggable
                coordinate={{ latitude: -29.44542, longitude: -51.95465 }}
                title='Univates'
                description='Crie-Ti'
                //image={require('../assets/logo_mapa.png')}
                onDragEnd={(e) => console.log('COORDENADAS =>', e.nativeEvent.coordinate)}
            />
                }
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default ViewMap;