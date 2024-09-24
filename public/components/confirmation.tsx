import { Alert } from 'react-native'

const confirmation = (
    title: string,
    text: string,
    cancelText: string,
    confirmText: string,
    onConfirm: Function
) => {
    Alert.alert(
        title,
        text,
        [
          { text: cancelText, style: 'cancel' },
          { text: confirmText, onPress: () => { onConfirm() } }
        ]
      );
}

export default confirmation