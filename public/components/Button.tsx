import React, { PropsWithChildren } from 'react'
import { DimensionValue, StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonProps = PropsWithChildren<{
    fontColor?: string;
    width?: DimensionValue;
    height?: DimensionValue;
    color?: string;
    title: string;
    onPress: Function;
    disabled?: boolean;
}>;

const Button = ({fontColor, width, height, color, title, onPress, disabled} : ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={() => !disabled && onPress()}
            style={[styles.button, {
                width: width || 300,
                height: height || 50,
                backgroundColor:
                    disabled
                        ? "lightgray"
                        : (color || "lightskyblue")
            }]}
        >
            <Text style={[styles.text, {color: fontColor || "black"}]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid"
    },
    text: {
        fontSize: 20,
    }
})

export default Button