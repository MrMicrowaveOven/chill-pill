import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type {PropsWithChildren} from 'react';
import { Pill, SessionDate } from '../types'
import Button from "./Button";
import DropDownPicker from "react-native-dropdown-picker";

type PillHistoryProps = PropsWithChildren<{
    pillHistory: SessionDate[];
    historyreverse: boolean;
    pillList: Pill[];
}>;

const PillHistory = ({pillHistory, historyreverse, pillList}: PillHistoryProps) => {
    const [filterOptionsOpen, setFilterOptionsOpen] = useState<boolean>(false)
    const [filterPickerOpen, setFilterPickerOpen] = useState<boolean>(false)
    const [pills, setPills] = useState(pillList.map((pill, index) => {
        return { label: `${pill.name}: ${pill.dosage}${pill.unit}`, value: index }
    }))
    const [filterValue, setFilterValue] = useState<number|null>(null)

    const downloadHistory = () => {
        console.log(pillHistory)
    }

    const samePill = (pill1: Pill, pill2: Pill) => {
        return pill1.name === pill2.name && pill1.dosage === pill2.dosage && pill1.unit === pill2.unit
    }

    const pillHistoryDisplay = filterValue !== null
        ? pillHistory.filter(sessionDate => {
            const session = sessionDate.session
            const filteredPill = pillList[filterValue]
            const includesFilteringPill = (session.filter(dose => samePill(dose.pill, filteredPill)).length > 0)
            return includesFilteringPill
        })
        : pillHistory

    return (
        <View style={styles.window}>
            <View style={[styles.history, {marginTop: 80}]}>
                <View style={{width: '80%', height: 20, display: 'flex', justifyContent: 'space-between',
                    flexDirection: filterOptionsOpen ? 'column': 'row',
                }}>
                    <Text style={styles.isReverseHistoryLabel}>
                        {historyreverse ? 'Old → New' : 'New → Old'}
                    </Text>
                    {filterOptionsOpen
                        ?   <View style={[styles.filterContainer, {marginTop: 10}]}>
                                <TouchableOpacity onPress={() => {setFilterOptionsOpen(false); setFilterValue(null)}}>
                                    <Text style={styles.closeFilterButton}>
                                        ✖
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.filterDropdownContainer}>
                                    <DropDownPicker
                                        open={filterPickerOpen}
                                        setOpen={setFilterPickerOpen}
                                        items={pills}
                                        setItems={setPills}
                                        value={filterValue}
                                        setValue={setFilterValue}
                                        placeholder={'Filter by Pill'}
                                        textStyle={{fontSize: 20}}
                                    />
                                </View>
                            </View>
                        :   <TouchableOpacity onPress={() => setFilterOptionsOpen(true)}>
                                <Text style={styles.openFilterButton}>
                                    Filter
                                </Text>
                            </TouchableOpacity>
                    }
                </View>
                <ScrollView style={[styles.historyScroll, filterOptionsOpen && {marginTop: 70}]}>
                    <Text selectable={true}>
                    {pillHistoryDisplay.map((sessionDate: SessionDate, index) => {
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
    isReverseHistoryLabel: {
        color: 'black'
    },
    openFilterButton: {
        color: 'blue',
    },
    closeFilterButton: {
        color: 'black',
        padding: 5,
        fontSize: 20
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: 100,
    },
    filterDropdownContainer: {},
    history: {
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
    downloadHistoryButton: {
        position: 'absolute',
        bottom: 10,
        display: 'none'
    }
})

export default PillHistory