import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();
import emailjs from '@emailjs/react-native';
import {REACT_APP_EMAIL_SERVICE_ID, REACT_APP_EMAIL_TEMPLATE_ID, REACT_APP_EMAIL_USER_ID} from '@env';
import { SessionDate } from '../types';

type EmailModalProps = PropsWithChildren<{
    pillHistory: SessionDate[];
    show: boolean;
    close: Function;
}>;

const EmailModal = ({pillHistory, show, close}: EmailModalProps) => {
    const [emailEditable, setEmailEditable] = useState<boolean>(false)
    const emailEdit = useRef<TextInput>(null)
    const [userEmail, setUserEmail] = useMMKVStorage<string>('userEmail', storage, '')

    useEffect(() => {
        if(emailEditable) emailEdit.current?.focus()},
        [emailEditable]
    )

    const sendEmail = () => {
        emailjs.send(
            REACT_APP_EMAIL_SERVICE_ID,
            REACT_APP_EMAIL_TEMPLATE_ID,
            {
                user_email: userEmail,
                pillHistory: pillHistory
            },
            { publicKey: REACT_APP_EMAIL_USER_ID },
          )
            .then((response) => {
              console.log('SUCCESS!', response.status, response.text);
            })
            .catch((err) => {
              console.log('FAILED...', err);
            });
    }

    return (
            <Modal animationType='slide' visible={show} transparent={true}>
                <Text>Email my Pill History</Text>
                <TouchableWithoutFeedback onPress={() => close()}>
                    <View style={styles.exitButton}>
                        <Text style={styles.exitButtonText}>✖</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.emailSection}>
                    <TouchableOpacity onPress={() => setEmailEditable(!emailEditable)}>
                        <Text style={styles.editEmailButton}>{emailEditable ? 'save' : 'edit'}</Text>
                    </TouchableOpacity>
                    <View style={styles.emailInputBorder}>
                        <TextInput
                            style={[styles.emailInput, {color: emailEditable ? 'black' : 'gray'}]}
                            editable={emailEditable} ref={emailEdit}
                            value={userEmail}
                            onChangeText={(value) => setUserEmail(value)}
                            inputMode='email'
                            keyboardType='email-address'
                        />
                    </View>
                    <TouchableOpacity onPress={() => {sendEmail(); close()}} style={styles.sendEmailButton}>
                        <Image style={styles.sendEmailImage} source={require("../images/sendEmailIcon.png")}/>
                    </TouchableOpacity>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // bottom: 400,
        // backgroundColor: 'darkgray',
    },
    exitButton: {
        position: "absolute",
        bottom: 250,
        right: 10,
        zIndex: 100,
    },
    exitButtonText: {
        fontSize: 35,
        color: "black"
    },
    emailSection: {
        height: 300,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    editEmailButton: {
        fontSize: 20,
        marginLeft: 10,
        color: 'blue'
    },
    emailInputBorder: {
        flex: 1,
        margin: 20,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
    },
    emailInput: {
        width: '100%',
        fontSize: 30,
        backgroundColor: "white",
    },
    sendEmailButton: {
        marginRight: 10,
    },
    sendEmailImage: {},
})

export default EmailModal