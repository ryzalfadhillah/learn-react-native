import { Text as RNText } from 'react-native'
import React from 'react'

export default function Text({
        fontSize = 16, 
        color = '#160520', 
        regular = true, 
        bold = false, 
        style, 
        children, 
        ...props
    }) {
    return (
        <RNText {...props} style={[
            {fontSize: fontSize, color: color},
            regular && {fontFamily: 'regular'},
            bold && {fontFamily: 'bold'},
            style
        ]
        }>
            {children}
        </RNText>
    )
}