import { View } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import FONTS from './src/assets/fonts'
import { Text } from './src/components'

SplashScreen.preventAutoHideAsync()

const App = () => {

    const [fontsLoaded, fontError] = useFonts(FONTS.JosefinSans)

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View onLayout={onLayoutRootView} style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <Text regular = {false}>Default</Text>
            <Text>Default</Text>
            <Text regular = {true}>JosefinSans Regular</Text>
            <Text bold = {true}>JosefinSans Bold</Text>
            <Text color='blue'>JosefinSans Blue</Text>
            <Text fontSize={30}>JosefinSans 30</Text>
        </View>
    )
}

export default App