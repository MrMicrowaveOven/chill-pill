import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import type {PropsWithChildren} from 'react';
import { Pill } from '../types'

type PillManagerProps = PropsWithChildren<{
    pills: Pill[];
    pillTrash: Pill[];
    deletePill: Function;
    restorePill: Function;
    emptyTrash: Function;
    switchToPillAdder: Function;
}>;

const PillManager = ({pills, pillTrash, deletePill, restorePill, emptyTrash, switchToPillAdder}: PillManagerProps) => {
    return (
        <View style={styles.window}>
            {pills.length === 0 && pillTrash.length === 0 &&
                <View>
                    <Text style={styles.noPillsText}>No pills to manage!</Text>
                    <TouchableOpacity onPress={() => switchToPillAdder()}>
                        <Text style={[styles.noPillsText, styles.addPillsText]}>Add some pills!</Text>
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.pills}>
                <ScrollView style={styles.scroll}>
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    pills: {
        width: '100%',
        height: '70%'
    },
    scroll: {
        width: '100%',
        height: '80%',
    },
    noPillsText: {
        fontSize: 20,
        textAlign: "center",
        margin: 5,
    },
    addPillsText: {
        color: 'blue',
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
        bottom: 20,
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