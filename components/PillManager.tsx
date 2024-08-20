import React, { useState } from "react";
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import type {PropsWithChildren} from 'react';

type Pill = {
    name: string;
    dosage: number;
    unit: string;
}

type PillManagerProps = PropsWithChildren<{
    pills: Pill[];
  }>;

const PillManager = ({pills}: PillManagerProps) => {
    console.log(pills)
    return (
        <View style={styles.window}>
            <ScrollView>
                {pills.map((pill, index) => {
                    return(<Text style={styles.pill}>{pill.name}: {pill.dosage}{pill.unit}</Text>)
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    window: {
        width: "80%",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    pill: {
        color: "black",
        fontSize: 30,
    }
})

export default PillManager