import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import type {PropsWithChildren} from 'react';

type PillAdderProps = PropsWithChildren<{
    addPill: Function;
  }>;

const PillAdder = ({addPill}: PillAdderProps) => {
    const [name, setName] = useState("")
    const [dosage, setDosage] = useState(0)
    const [unit, setUnit] = useState("mg")
    return (
        <View>
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
                    disabled={name === '' || dosage === 0}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addPillForm: {
        width: "80%",
        height: "80%",
    },
    input: {

    },
    inputLabel: {
        color: "black",
        fontSize: 30,
    },
    inputText: {
        fontSize: 30,
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
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
})

export default PillAdder