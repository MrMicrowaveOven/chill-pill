import React from "react";
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import type {PropsWithChildren} from 'react';

type PillModalProps = PropsWithChildren<{
    isVisible: boolean;
    closeWindow: Function;
    name: string;
  }>;

const PillModal = ({isVisible, closeWindow, name, children}: PillModalProps) => {
    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.modal}>
                <View style={styles.window}>
                    <TouchableWithoutFeedback onPress={() => closeWindow()}>
                        <View style={styles.exitButton}>
                            <Text style={styles.exitButtonText}>X</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>{name}</Text>
                    <View style={styles.children}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    window: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgray"
    },
    exitButton: {
        position: "absolute",
        top: 0,
        right: 5
    },
    exitButtonText: {
        fontSize: 30,
        fontWeight: "900"
    },
    title: {
        position: "absolute",
        top: 20,
        fontSize: 50,
        color: "black",
        marginBottom: 20,
    },
    children: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default PillModal