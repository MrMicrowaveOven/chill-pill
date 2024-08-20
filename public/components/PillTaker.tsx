import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import type {PropsWithChildren} from 'react';
import DropDownPicker from "react-native-dropdown-picker";

type Pill = {
    name: string;
    dosage: number;
    unit: string;
}

type PillTakerProps = PropsWithChildren<{
    pills: Pill[];
    takePill: Function;
}>;

const PillTaker = ({pills, takePill}: PillTakerProps) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(0)
    const [items, setItems] = useState(pills.map((pill, index) => {
        return {label: `${pill.name}: ${pill.dosage}${pill.unit}`, value: index}
    }))

    return (
        <View>
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                items={items}
                setItems={setItems}
                value={value}
                setValue={setValue}
                placeholder={'Choose a pill'}
            />
            <Button title="Take Pill" onPress={() => takePill(pills[value])}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
})

export default PillTaker