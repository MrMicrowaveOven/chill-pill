import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type {PropsWithChildren} from 'react';
import { SessionDate } from '../types'
import Button from "./Button";

type PillHistoryProps = PropsWithChildren<{
    pillHistory: SessionDate[];
    historyreverse: boolean;
    reverseHistory: Function;
}>;

const PillHistory = ({pillHistory, historyreverse, reverseHistory}: PillHistoryProps) => {
    const downloadHistory = () => {
        console.log(pillHistory)
    }
    return (
        <View style={styles.window}>
            <View style={styles.history}>
                <ScrollView style={styles.historyScroll}>
                    <Text selectable={true}>
                    {pillHistory.map((sessionDate: SessionDate, index) => {
                        const { session } = sessionDate
                        const date = new Date(sessionDate.date)
                        return (
                            <Text style={styles.session} key={index}>
                                <Text style={styles.dateText}>{date.toDateString()}, {date.toLocaleTimeString()}{"\n"}</Text>
                                {session.map(((swallow, index) => {
                                    return(
                                        <Text style={styles.dose} key={index}>{"\t\t"}{swallow.pill.name}, {swallow.pill.dosage}{swallow.pill.unit} X {swallow.quantity}{"\n"}</Text>
                                    )
                                }))}
                                {"\n"}
                            </Text>
                        )
                    })}
                    </Text>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.reverseHistoryButton} onPress={() => reverseHistory()}>
                <Text style={styles.reverseHistoryButtonText}>
                    {historyreverse ? 'Old → New' : 'New → Old'}
                </Text>
            </TouchableOpacity>
            <View style={styles.downloadHistoryButton}>
                <Button title="Download Pill History" onPress={() => downloadHistory()}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    window: {
        width: "100%",
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    history: {
        marginTop: 120,
        width: '100%',
        height: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    historyScroll: {
        width: '90%',
        height: '80%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'darkgray'
    },
    swallow: {
        color: "black"
    },
    session: {
        margin: 10
    },
    dose: {
        color: "black",
        marginLeft: 10,
    },
    dateText: {
        color: "black",
        fontSize: 20
    },
    reverseHistoryButton: {
        position: 'absolute',
        top: 100,
        left: 10,
    },
    reverseHistoryButtonText: {
        color: 'blue'
    },
    downloadHistoryButton: {
        position: 'absolute',
        bottom: 10,
        display: 'none'
    }
})

export default PillHistory