import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Flexbox = () => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, padding:20, margin:20 }}>
            <View style={{ width: 50, height: 50, backgroundColor: 'red' }}></View>
            <View style={{ width: 50, height: 50, backgroundColor: 'green' }}></View>
            <View style={{ width: 50, height: 50, backgroundColor: 'blue' }}></View>
        </View>
    )
}

export default Flexbox