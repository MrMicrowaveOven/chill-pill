import React, { useState } from "react";
import { Button, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import type {PropsWithChildren} from 'react';

type Pill = {
    name: string;
    dosage: number;
    unit: string;
}

type PillManagerProps = PropsWithChildren<{
    pills: Pill[];
    deletePill: Function;
  }>;

const PillManager = ({pills, deletePill}: PillManagerProps) => {
    return (
        <View style={styles.window}>
            <ScrollView>
                {pills.map((pill, index) => {
                    return(
                        <View style={styles.pill}>
                            <TouchableOpacity style={styles.deleteIconButton} onPress={() => deletePill(index)}>
                                <Image style={styles.deleteIcon} source={require("../public/images/delete.png")}/>
                            </TouchableOpacity>
                            <Text key={index} style={styles.pillText}>{pill.name}: {pill.dosage}{pill.unit}</Text>
                        </View>
                    )
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
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    pillText: {
        color: "black",
        fontSize: 30,
    },
    deleteIconButton: {
        width: 25,
        height: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    },
    deleteIcon: {
        width: 25,
        height: 25,
        margin: 20
    }
})

export default PillManager