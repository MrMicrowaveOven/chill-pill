import React, { PropsWithChildren } from 'react'
import { Text, TouchableHighlight } from 'react-native';

type ButtonProps = PropsWithChildren<{
    fontColor: string;
    width: number;
    height: number;
    color: string;
    title: string;
    onPress: Function;
    disabled: boolean;
}>;

const Button = ({fontColor, width, height, color, title, onPress, disabled} : ButtonProps) => {
    return (
        <TouchableHighlight onPress={() => onPress()}
            style={{
                width: width || 100, height: height || 50, backgroundColor: disabled ? "lightGray" : color}}
        >
            <Text style={{color: fontColor}}>{title}</Text>
        </TouchableHighlight>
    )
}

export default Button