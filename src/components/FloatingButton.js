import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const FlotingButtom = ({ icon, color, onPress }) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: color ? color : 'green' }]}>
            <FontAwesome name="plus" size={25} color="black" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 50,
        position: 'absolute',
        bottom: 30,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',

    },
});