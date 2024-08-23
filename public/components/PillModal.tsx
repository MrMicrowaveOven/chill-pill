import React from "react";
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import type {PropsWithChildren} from 'react';

type PillModalProps = PropsWithChildren<{
    isVisible: boolean;
    closeWindow: Function;
    name: string;
    backgroundColor?: string;
  }>;

const PillModal = ({isVisible, closeWindow, name, backgroundColor, children}: PillModalProps) => {
    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.modal}>
                <View style={[styles.window, {backgroundColor: backgroundColor || "lightgray"}]}>
                    <TouchableWithoutFeedback onPress={() => closeWindow()}>
                        <View style={styles.exitButton}>
                            <Text style={styles.exitButtonText}>✖</Text>
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
    },
    exitButton: {
        position: "absolute",
        top: 0,
        right: 5
    },
    exitButtonText: {
        fontSize: 35,
        color: "black"
    },
    title: {
        position: "absolute",
        top: 20,
        fontSize: 50,
        color: "black",
        paddingBottom: 20,
    },
    children: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default PillModal