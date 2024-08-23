import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import type {PropsWithChildren} from 'react';
import Button from "./Button";

type PillAdderProps = PropsWithChildren<{
    addPill: Function;
  }>;

const PillAdder = ({addPill}: PillAdderProps) => {
    const [name, setName] = useState("")
    const [dosage, setDosage] = useState(0)
    const [unit, setUnit] = useState("mg")
    return (
        <View style={styles.window}>
            <View style={styles.addPillForm}>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Name of Medication</Text>
                    <View style={styles.inputTextBorder}>
                        <TextInput style={styles.inputText} onChangeText={(name) => setName(name)}></TextInput>
                    </View>
                </View>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Dosage</Text>
                    <View style={styles.inputDosage}>
                        <View style={[styles.inputTextBorder, styles.inputDosageBorder]}>
                            <TextInput style={styles.inputText} onChangeText={(dosage) => setDosage(parseFloat(dosage))} keyboardType='numeric'></TextInput>
                        </View>
                        <Text style={styles.mgDisplay}>mg</Text>
                    </View>
                </View>
            </View>
            <View style={styles.addPillButton}>
                <Button
                    title="Add Pill"
                    onPress={() => addPill(name, dosage, unit)}
                    disabled={name === '' || dosage === 0 || Number.isNaN(dosage)}
                    width={300}
                    color={"lightskyblue"}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    window: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "flex-start"
    },
    addPillForm: {
        width: "80%",
        marginTop: 120
    },
    input: {

    },
    inputLabel: {
        color: "black",
        fontSize: 30,
    },
    inputText: {
        fontSize: 30,
        backgroundColor: "white",
        color: 'black'
    },
    inputTextBorder: {
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
    },
    inputDosage: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    inputDosageBorder: {
        width: "50%",
    },
    mgDisplay: {
        fontSize: 30,
        color: "black",
        margin: 5
    },
    addPillButton: {
        position: 'absolute',
        bottom: 10
    }
})

export default PillAdder