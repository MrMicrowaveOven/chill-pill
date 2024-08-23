import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type {PropsWithChildren} from 'react';
import { Pill } from '../types'

type PillManagerProps = PropsWithChildren<{
    pills: Pill[];
    pillTrash: Pill[];
    deletePill: Function;
    restorePill: Function;
    emptyTrash: Function;
}>;

const PillManager = ({pills, pillTrash, deletePill, restorePill, emptyTrash}: PillManagerProps) => {
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
            {pillTrash.length > 0 && <TouchableOpacity style={styles.emptryTrashButton} onPress={() => emptyTrash()}>
                <Image source={require('../images/empty_trash.png')} style={styles.emptyTrashIcon}/>
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    window: {
        width: "100%",
        height: "100%",
        marginTop: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
    },
    emptryTrashButton: {
        position: 'absolute',
        bottom: 485,
        right: -75,
        width: 100,
        height: 100,
    },
    emptyTrashIcon: {
        width: 100,
        height: 100,
    }
})

export default PillManager