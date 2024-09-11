import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';
const storage = new MMKVLoader().initialize();
import emailjs, { send } from '@emailjs/react-native';
import {REACT_APP_EMAIL_SERVICE_ID, REACT_APP_EMAIL_TEMPLATE_ID, REACT_APP_EMAIL_USER_ID} from '@env';
import { SessionDate } from '../types';
import Button from './Button';

type EmailModalProps = PropsWithChildren<{
    pillHistory: SessionDate[];
    show: boolean;
    close: Function;
}>;

const EmailModal = ({pillHistory, show, close}: EmailModalProps) => {
    const [emailEditable, setEmailEditable] = useState<boolean>(false)
    const emailEdit = useRef<TextInput>(null)
    const [userEmail, setUserEmail] = useMMKVStorage<string>('userEmail', storage, '')
    const [sendEmailButtonDisabled, setSendEmailButtonDisabled] = useState<boolean>(false)
    const [emailConfirmation, setEmailConfirmation] = useState<boolean>(false)
    const [emailFailure, setEmailFailure] = useState<boolean>(false)

    useEffect(() => {
        if(emailEditable) emailEdit.current?.focus()},
        [emailEditable]
    )

    useEffect(() => setEmailEditable(false), [show])

    useEffect(() => {
        if(emailConfirmation) {
            setTimeout(() => {
                setEmailConfirmation(false)
                setSendEmailButtonDisabled(false)
            }, 5000)
        }
    }, [emailConfirmation])

    useEffect(() => {
        setEmailFailure(false)
        setSendEmailButtonDisabled(false)
    }, [emailEditable, show])

    const sendEmail = () => {
        setSendEmailButtonDisabled(true)
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
                setEmailConfirmation(true)
            })
            .catch((err) => {
                console.log('FAILED...', err);
                setEmailFailure(true)
            });
    }

    return (
        <Modal animationType='slide' visible={show} transparent={true}>
            <View style={styles.modal}>
                <TouchableWithoutFeedback onPress={() => close()}>
                    <View style={styles.exitButton}>
                        <Text style={styles.exitButtonText}>✖</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.title}>Email my Pill History</Text>
                    <TouchableOpacity onPress={() => setEmailEditable(!emailEditable)}>
                        <Text style={styles.editEmailButton}>{emailEditable ? 'save' : 'edit email'}</Text>
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
                    <Button
                        title='Send email'
                        onPress={() => {sendEmail()}}
                        disabled={emailEditable || sendEmailButtonDisabled}
                    />
                    <View style={styles.emailResponseText}>
                        {emailConfirmation && <Text style={styles.emailConfirmationText}>{`Email sent to ${userEmail}`}</Text>}
                        {emailFailure && <Text style={styles.emailFailureText}>{`Email failed.`}</Text>}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
    },
    container: {
        width: '100%',
        backgroundColor: 'darkgray',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    exitButton: {
        position: "absolute",
        top: 0,
        right: 10,
        zIndex: 100,
    },
    exitButtonText: {
        fontSize: 35,
        color: "black"
    },
    title: {
        fontSize: 30,
        padding: 20,
        color: 'black'
    },
    editEmailButton: {
        fontSize: 20,
        color: 'blue'
    },
    emailInputBorder: {
        width: '90%',
        flex: 1,
        margin: 20,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
    },
    emailInput: {
        fontSize: 30,
        backgroundColor: "white",
    },
    emailConfirmationText: {
        color: 'blue',
        fontSize: 20,
    },
    emailFailureText: {
        color: 'red',
        fontSize: 20,
    },
    emailResponseText: {
        height: 50,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default EmailModal