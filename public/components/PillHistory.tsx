import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
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

type PillHistoryProps = PropsWithChildren<{
    pillHistory: PillSwallow[]
}>;

const PillHistory = ({pillHistory}: PillHistoryProps) => {
    return (
        <View>
            {pillHistory.map((swallow: PillSwallow, index) => {
                const {name, dosage, unit} = swallow.pill
                const {date} = swallow
                return (<Text key={index} style={styles.swallow}>{date.toDateString()}, {date.toTimeString()}: {name}, {dosage}{unit}</Text>)
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    swallow: {
        color: "black"
    }
})

export default PillHistory