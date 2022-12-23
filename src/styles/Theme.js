import {StyleSheet} from 'react-native';

export const Theme =  StyleSheet.create({
    input: {
        height: 35,
        padding: 8,
        width: '80%',
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 8,
        borderColor: '#BDF24B',
        borderWidth: 2
    },
    title: {
        fontSize: 24,
        color: '#BDF24B',
        margin: 20,
        marginLeft: 0
    },
    container: {
        flex: 1,
        backgroundColor: '#0C1A26',
        alignItems: 'center',
        paddingTop: 45
    },
    cardContainer:{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 8
    },
    cardInfo:{
        display: 'flex',
        flexDirection: 'column',
        paddingRight: 50
        
    },
    login:{
        flex: 1,
        backgroundColor:"#0C1A26"
    }
})