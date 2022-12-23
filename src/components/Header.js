import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Theme} from '../styles/Theme';
import Toast from 'react-native-toast-message';
import { atencao, sucesso } from '../util/messages';
const { width, height } = Dimensions.get('window');

const widthScreen = width * 0.95;

const Header = ({ navigation ,label, logout, avatar, leftItem }) => {


    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                {leftItem ? leftItem : navigation.canGoBack() ?
                <TouchableOpacity
                onPress={() => {navigation.goBack()}}>
                <MaterialIcons
                    name='arrow-back-ios'
                    size={24}
                    color={'#BDF24B'} />
                </TouchableOpacity>
                :
                <></>}
            </View>

            <View style={styles.headerText}>
                <Text style={Theme.title}>{label}</Text>
            </View>

            {logout ?
                <TouchableOpacity style={styles.logout} onPress={() => atencao('Desconectado', 'Você se desconectou!')} >
                 <Text style={[Theme.title, { color: 'red' }]}>Sair</Text>
                </TouchableOpacity>
                :
                <View style={styles.logout}></View>
            }
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        height: 100,
        width: width,
        paddingHorizontal: 8,
        backgroundColor: '#0C1A26',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1
    },
    headerLeft: {
        width: '20%'
    },
    headerText: {
        width: widthScreen * 0.6,
    },
    logout: {
        width: widthScreen * 0.2,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})