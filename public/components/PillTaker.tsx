import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import type {PropsWithChildren} from 'react';
import DropDownPicker from "react-native-dropdown-picker";
import { Pill, Dose } from '../types'

type PillTakerProps = PropsWithChildren<{
    pills: Pill[];
    takePills: Function;
    switchToPillAdder: Function;
}>;

const PillTaker = ({pills, takePills, switchToPillAdder}: PillTakerProps) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0)
    const [items, setItems] = useState(pills.map((pill, index) => {
        return {label: `${pill.name}: ${pill.dosage}${pill.unit}`, value: index}
    }))
    const QUANTITY_LIST = [1,2,3,4,5,6,7,8,9].map((num) => {return {label: num.toString(), value: num}})
    const [openQ, setOpenQ] = useState(false)
    const [valueQ, setValueQ] = useState(1)
    const [itemsQ, setItemsQ] = useState(QUANTITY_LIST)

    const [pillSession, setPillSession] = useState<Dose[]>([])

    const addPillsToSession = (pill: Pill, quantity: number) => {
        const oldSession = pillSession
        let newSession = oldSession.concat([{pill: pill, quantity: quantity}])
        // newSession = simplifySession(newSession)
        setPillSession(newSession)
    }

    const deletePillFromSession = (indexToDelete: number) => {
        const oldSession = pillSession
        let newSession = oldSession.filter((el, index) => index !== indexToDelete)
        setPillSession(newSession)
    }

    // const simplifySession = (oldSession: Dose[]) => {
    //     const sessionIndex = {}
    //     oldSession.forEach((dose) => {
    //         if(sessionIndex[dose.pill.name]) {
    //             const pillsOfThatName = sessionIndex[dose.pill.name]
    //             const matchingPill = pillsOfThatName.find((pill: Pill) => pill.dosage === dose.pill.dosage)
    //             if (matchingPill) {
    //                 const indexOfMatchingPill = pillsOfThatName.findIndex((pill) => pill ===matchingPill)
    //                 sessionIndex[dose.pill.name][indexOfMatchingPill] = pillsOfThatName[indexOfMatchingPill] + dose.quantity
    //             } else {
    //                 sessionIndex[dose.pill.name] = sessionIndex[dose.pill.name].concat([{dosage: dose.pill.dosage, quantity: dose.quantity}])
    //             }
    //         } else {
    //             sessionIndex[dose.pill.name] = [{dosage: dose.pill.dosage, quantity: dose.quantity}]
    //         }
    //     })
    //     console.log("============")
    //     console.log("OLD SESSION")
    //     console.log(oldSession)
    //     console.log("SESSION INDEX")
    //     console.log(sessionIndex)
    //     let newSession : Dose[] = []
    //     Object.keys(sessionIndex).sort().forEach((name) => {
    //         sessionIndex[name].sort((a:Pill,b:Pill) => a.dosage - b.dosage).forEach((dose) => {
    //             newSession = newSession.concat([{
    //                 quantity: dose.quantity,
    //                 pill: {
    //                     name: name,
    //                     dosage: dose.dosage,
    //                     unit: "mg"
    //                 }
    //             }])
    //         })
    //     })
    //     return newSession
    // }

    return (
        <View style={styles.window}>
            {pills.length === 0 &&
                <View>
                    <Text style={styles.noPillsText}>No pills to take!</Text>
                    <TouchableOpacity onPress={() => switchToPillAdder()}>
                        <Text style={[styles.noPillsText, styles.addPillsText]}>Add some pills!</Text>
                    </TouchableOpacity>
                    
                </View>
            }
            {pills.length > 0 && <View style={styles.pillsView}>
                <View style={styles.picker}>
                    <View style={styles.pillPicker}>
                        <DropDownPicker
                            open={open}
                            setOpen={setOpen}
                            items={items}
                            setItems={setItems}
                            value={value}
                            setValue={setValue}
                            placeholder={'Choose a pill'}
                            textStyle={{fontSize: 20}}
                        />
                    </View>
                    <Text style={styles.xText}>X</Text>
                    <View style={styles.quantityPicker}>
                        <DropDownPicker
                            open={openQ}
                            setOpen={setOpenQ}
                            items={itemsQ}
                            setItems={setItemsQ}
                            value={valueQ}
                            setValue={setValueQ}
                            placeholder={'0'}
                            textStyle={{fontSize: 20}}
                        />
                    </View>
                </View>
                <Button
                    title="Add Pill"
                    onPress={() => addPillsToSession(pills[value], valueQ)}
                    disabled={items.length == 0}
                    width={300}
                    color={'lightskyblue'}
                />
                <View style={styles.pillSession}>
                    {pillSession.map((dose, index) => {
                        return (
                            <View style={styles.sessionDose} key={index}>
                                <TouchableOpacity style={styles.deleteIconButton} onPress={() => deletePillFromSession(index)}>
                                    <Image style={styles.deleteIcon} source={require("../images/delete.png")}/>
                                </TouchableOpacity>
                                <Text style={styles.sessionDoseText} key={index}>{dose.pill.name}: {dose.pill.dosage}{dose.pill.unit} X {dose.quantity}</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.takePillsButton}>
                    <Button
                        title="Take Pills"
                        color="lightskyblue"
                        onPress={() => takePills(pillSession)}
                        disabled={pillSession.length === 0}
                        width={300}
                    />
                </View>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    window: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 150,
    },
    noPillsText: {
        fontSize: 20,
        textAlign: "center",
        margin: 5,
    },
    addPillsText: {
        color: 'blue',
    },
    pillsView: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    picker: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        height: 50,
        marginBottom: 20,
    },
    pillPicker: {
        width: "70%",
    },
    xText: {
        fontSize: 30,
        color: "black",
        margin: 5
    },
    quantityPicker: {
        width: "20%"
    },
    pillSession: {
        height: "40%",
        margin: 10,
    },
    sessionDose: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    sessionDoseText: {
        fontSize: 20,
        color: "black"
    },
    deleteIcon: {
        width: 20,
        height: 20,
    },
    deleteIconButton: {
        width: 20,
        height: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 15
    },
    takePillsButton: {
        position: "absolute",
        bottom: 10,
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

export default PillTaker