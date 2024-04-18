import { View, Text, Button } from 'react-native'
import React from 'react'

export default function AddTask({navigation, route}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' ,gap:10 }}>
            <Text>Add Task Screen</Text>
            <Button title='Go Back' onPress={() => navigation.navigate("Main", {screen: route.params.page})}/>
        </View>
    )
}