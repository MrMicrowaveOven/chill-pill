import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import type {PropsWithChildren} from 'react';

type PillAdderProps = PropsWithChildren<{
    isVisible: boolean;
    addPill: Function;
    closeWindow: Function;
  }>;

const PillAdder = ({isVisible, addPill, closeWindow}: PillAdderProps) => {
    const [name, setName] = useState("")
    const [dosage, setDosage] = useState(0)
    const [unit, setUnit] = useState("mg")
    return (
        <Modal visible={isVisible}>
            <View style={styles.modal}>
                <View style={styles.window}>
                    <TouchableWithoutFeedback onPress={() => closeWindow()}>
                        <View style={styles.exitButton}>
                            <Text style={styles.exitButtonText}>X</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.addPillButton}>
                        <Button title="Add Pill" onPress={() => addPill(name, dosage, unit)}></Button>
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
        width: "80%",
        height: "80%",
        backgroundColor: "red"
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
    addPillButton: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        width: "50%"
    }
})

export default PillAdder