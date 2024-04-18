import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainScreen from '../../pages/Main'
import LoginScreen from '../../pages/Login'
import AddTask from '../../pages/Task/AddTask'
import RegisterScreen from '../../pages/Register'
import { getData } from '../../store/storages'

const Stack = createNativeStackNavigator()

export default function Router() {

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        try {
            const userData = await getData("user");
            setIsLogin(userData !== null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Stack.Navigator
            initialRouteName={isLogin ? "Main" : "Login"}
            screenOptions={{headerShown: false}}
            // screenListeners={{
            //     state: (event) => {
            //         console.log("EVENT SCREEN", JSON.stringify(event, null, 2));
            //     }
            // }}
        >
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="AddTask" component={AddTask} />
        </Stack.Navigator>
    )
}