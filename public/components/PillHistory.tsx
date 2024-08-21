import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type {PropsWithChildren} from 'react';

type Pill = {
    name: string;
    dosage: number;
    unit: string;
}

type PillSwallow = {
    pill: Pill,
    date: Date;
}

type SessionDate = {
    date: Date;
    session: Dose[];
}

type Dose = {
    pill: Pill;
    quantity: number;
}

type PillHistoryProps = PropsWithChildren<{
    pillHistory: SessionDate[]
}>;

const PillHistory = ({pillHistory}: PillHistoryProps) => {
    return (
        <View style={styles.window}>
            <ScrollView>
                {pillHistory.map((sessionDate: SessionDate, index) => {
                    const { session } = sessionDate
                    const { date } = sessionDate
                    return (
                        <View style={styles.session} key={index}>
                            <Text style={styles.dateText}>{date.toDateString()}, {date.toTimeString()}</Text>
                            {session.map(((swallow, index) => {
                                return(
                                    <Text style={styles.dose} key={index}>{swallow.pill.name}, {swallow.pill.dosage}{swallow.pill.unit} X {swallow.quantity}</Text>
                                )
                            }))}
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    window: {
        height: "80%",
        width: "100%"
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
    }
})

export default PillHistory