import React, { PropsWithChildren } from 'react'
import { StyleSheet, Switch, Text, View } from "react-native"

type SettingsCheckboxProps = PropsWithChildren<{
    title: string;
    leftLabel: string;
    rightLabel: string;
    onChange: Function;
    defaultChecked: boolean;
}>;

const SettingsCheckbox = ({title, leftLabel, rightLabel, onChange, defaultChecked}: SettingsCheckboxProps) => {
    return (
        <View style={styles.window}>
            <Text style={styles.optionTitle}>{title}</Text>
            <View style={styles.checkboxRow}>
                <Text style={styles.optionText}>{leftLabel}</Text>
                <View style={styles.optionCheckboxContainer}>
                    <Switch
                        onValueChange={(isChecked: boolean) => onChange(isChecked)}
                        value={defaultChecked}
                        trackColor={{false: '#BDBDBD', true: '#BDBDBD'}}
                        thumbColor={defaultChecked ? '#020202' : "#020202"}
                        style={styles.switch}
                    />
                </View>
                <Text style={styles.optionText}>{rightLabel}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    window: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        width: "100%",
        marginTop: 10,
    },
    optionTitle: {
        textAlign: 'center',
        margin: 10,
        fontSize: 26,
        color: 'black',
        textDecorationLine: 'underline'
    },
    checkboxRow: {
        display: 'flex',
        flexDirection: 'row',

    },
    optionCheckboxContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: 10,
        marginLeft: 15,
    },
    switch: {
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
    },
    optionTextContainer: {
    },
    optionText: {
        fontSize: 18,
        color: 'black'
    },
})

export default SettingsCheckbox