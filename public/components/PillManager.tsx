import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type {PropsWithChildren} from 'react';

type Pill = {
    name: string;
    dosage: number;
    unit: string;
}

type PillManagerProps = PropsWithChildren<{
    pills: Pill[];
    pillTrash: Pill[];
    deletePill: Function;
    restorePill: Function;
  }>;

const PillManager = ({pills, pillTrash, deletePill, restorePill}: PillManagerProps) => {
    return (
        <View style={styles.window}>
            <ScrollView>
                {pills.map((pill, index) => {
                    return(
                        <View style={styles.pill} key={index}>
                            <TouchableOpacity style={styles.deleteIconButton} onPress={() => deletePill(index)}>
                                <Image style={styles.deleteIcon} source={require("../images/delete.png")}/>
                            </TouchableOpacity>
                            <Text key={index} style={styles.pillText}>{pill.name}: {pill.dosage}{pill.unit}</Text>
                        </View>
                    )
                })}
                {pillTrash.length > 0 && <Text style={styles.trashTitle}>Trash</Text>}
                {pillTrash.map((pill, index) => {
                    return (
                        <View style={styles.pill} key={index}>
                            <TouchableOpacity style={styles.deleteIconButton} onPress={() => restorePill(index)}>
                                <Image style={styles.deleteIcon} source={require("../images/reload.png")}/>
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
    },
    trashTitle: {
        fontSize: 40,
        color: 'black',
        marginTop: 100,
        fontWeight: '500'
    }
})

export default PillManager