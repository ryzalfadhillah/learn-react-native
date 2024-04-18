import { Button, Image, View } from 'react-native'
import React, { useState } from 'react'
import { Text } from '../../components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Home'
import ProfileScreen from '../Profile'
import ICONS from '../../assets/icons'
import TaskScreen from '../Task'
import PerformScreen from '../Perform'
import AddTaskScreen from '../Task/AddTask'

const Tab = createBottomTabNavigator()

export default function Main({navigation, route}) {

    const [page, setPage] = useState('Home')

    return (
        <Tab.Navigator 
            initialRouteName='Home'
            screenOptions={({route}) => ({
                headerShown: false,
                tabBarActiveTintColor: '#04325F',
                tabBarInactiveTintColor: '#CED1D4',
                tabBarIcon: ({focused, color}) => {
                    const iconTabActive = {
                        Home: ICONS.homeActive,
                        Task: ICONS.taskActive,
                        AddTask: ICONS.addLeads,
                        Performance: ICONS.performActive,
                        Profile: ICONS.profileActive,
                    }

                    const iconTabInactive = {
                        Home: ICONS.homeInactive,
                        Task: ICONS.taskInactive,
                        AddTask: ICONS.addLeads,
                        Performance: ICONS.performInactive,
                        Profile: ICONS.profileInactive,
                    }

                    return (
                        <View style={{ width: 24, height: 24 }}>
                            {route.name === "AddTask" ? (
                                <Image
                                    source={iconTabActive.AddTask}
                                    style={{ width: 80, height: 80, marginTop: -50, marginStart: -25 }}
                                />
                            ) : (
                                <Image
                                    source={focused ? iconTabActive[route.name] : iconTabInactive[route.name]}
                                    style={{ width: 24, height: 24, resizeMode: "contain" }}
                                />
                            )}
                        </View>
                    )
                },

                tabBarLabel: ({ focused, color }) => (
                    route.name === "AddTask" ? null :
                    <Text bold={focused} fontSize={10} color={color}>
                        {route.name}
                    </Text>
                ),                

                tabBarStyle: {
                    paddingTop: 10,
                    paddingBottom: 10,
                    height: 70
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} listeners={() => {
                setPage("Home")
            }}/>
            <Tab.Screen name="Task" component={TaskScreen} listeners={() => {
                setPage("Task")
            }}/>
            <Tab.Screen 
                name="AddTask" 
                component={AddTaskScreen}                         
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('AddTask', {page: page}); 
                    }
                })}
                options={{
                    tabBarStyle: { display: 'none' } 
                }} 
            />
            <Tab.Screen name="Performance" component={PerformScreen} listeners={() => {
                setPage("Performance")
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreen} listeners={() => {
                setPage("Profile")
            }}/>
        </Tab.Navigator>
    )
}