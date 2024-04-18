import { TouchableOpacity } from 'react-native'
import React from 'react'
import Text from '../Text'

export default function Button({title = "BUTTON", styles, color = "#000", bgColor = "#18DCFF", disabled = false, ...props}) {
    return (
        <TouchableOpacity
        disabled = {disabled}
            style={[{
                backgroundColor: bgColor,
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
                opacity: disabled? 0.3: 1
            }, styles]}
            {...props}
        >
            <Text bold={true} style={{color: color}}>{title}</Text>
        </TouchableOpacity>
    )
}