import Toast from 'react-native-toast-message';


export function sucesso(title, text){
    Toast.show({
        type: 'success',
        text1: title,
        text2: text
    })
}

export function atencao(title, text){
    Toast.show({
        type: 'info',
        text1: title,
        text2: text
    })
}

export function danger(title, text){
    Toast.show({
        type: 'danger',
        text1: title,
        text2: text
    })
}
