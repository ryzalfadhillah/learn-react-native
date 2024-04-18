import { Button, Image, ImageBackground, ScrollView, TouchableOpacity, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from '../../components'
import IMAGES from '../../assets/images'
import { SHADOW, WIDTH } from '../../assets/styles'
import { AppInfo, Person, ProfileID } from './data'
import ICONS from '../../assets/icons'
import { deleteData, getData } from '../../store/storages'
import { useDispatch, useSelector } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import { setLogin, setLogout } from '../../store/actions/actionLogin'
import { decryptAES } from '../../utils/crypto'

export default function Profile({navigation}) {
    const dispatch = useDispatch();
    // const [user, setUser] = useState({})
    const dataUser = useSelector((state) => state.dataLogin)
    const [person, setPerson] = useState(Person.length)

    const handleLogout = async (route) => {
        try {
            deleteData("user")
            dispatch(setLogout())
            console.log("SESSION ENDED");
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: route },
                    ],
                })
            );
        } catch (error) {
            console.log('Error logging out:', error)
        }
    }

    // console.log("DATA USER",JSON.stringify(dataUser, null, 2));

    return (
        <ScrollView>
        <View>
            {/* Profile Section */}
            <ImageBackground 
                source={IMAGES.bgProfile} 
                style={{
                    width: WIDTH,
                    height: 495,
                    alignItems: 'center'
                }}>
                    <View style={{borderWidth: 2, borderRadius: 90, borderColor: '#FBD2A5', marginTop: 90}}>
                        <Image source={IMAGES.person2} style={{width: 120, height: 120, borderRadius: 90}}/>
                    </View>
                    <Text semiBold fontSize={20} style={{marginTop: 16}}>{dataUser.userProfile[0].nameUser}</Text>
                    <Text semiBold fontSize={14} color='#909090'>{dataUser.userProfile[0].roleUser}</Text>
            </ImageBackground>

            {/* Profile Section Detail */}
            <View
                style={{
                marginTop: -180,
                paddingHorizontal: 16,
                paddingVertical: 10,
                }}
            >
                <View style={[{ borderRadius: 12, backgroundColor: "#fff" }, SHADOW]}>
                    {ProfileID.length > 0 && ProfileID.map((item, index) =>(
                        <View
                        key={index}
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginHorizontal: 8,
                            paddingVertical: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#D3D3D3",
                        }}
                        >
                            <Text semiBold fontSize={14}>{item.name}</Text>
                            <Text semiBold fontSize= {14} color="#A7A7A7">
                                {item.name === "ID" ? dataUser.userProfile[0][item.value]:decryptAES(dataUser.userProfile[0][item.value])}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>


            {/* Team Section */}
            <View style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
            }}>
                <View style={[{
                    flexDirection: "row", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    paddingHorizontal: 8, 
                    paddingVertical: 10, 
                    borderRadius: 12, 
                    backgroundColor: "#fff" }, 
                    SHADOW
                ]}>
                    <View style={{gap:10}}>
                        <Text semiBold fontSize={14}>Team</Text>
                        <Text semiBold fontSize={14} color='#A7A7A7'>React Native</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        {Person.map((item, index) => (
                            index < 3 && 
                            <Image
                                key={index}
                                source={item.avatar}
                                style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: 90,
                                    marginStart: -15,
                                    borderWidth: 2,
                                    borderColor: '#fff'
                                }}
                            />
                        ))}
                        {
                            person > 3 && (
                                <TouchableOpacity>
                            <View style={{width: 35, height: 35, backgroundColor: '#C16262', borderRadius: 90,
                                marginStart: -15,
                                borderWidth: 2,
                                borderColor: '#fff',
                                justifyContent: 'center',
                                alignItems: 'center'
                                }}>
                                    <Text fontSize={14} color='#ffffff'>+{person - 3}</Text>
                            </View>
                        </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            </View>

            {/* App Info Section */}
            <View
                style={{
                paddingHorizontal: 16,
                paddingVertical: 10,
                }}
            >
                <View style={[{ borderRadius: 12, backgroundColor: "#fff" }, SHADOW]}>
                {AppInfo.map((item, index) => (
                    <TouchableOpacity
                    onPress={() => item.name === 'Logout' ? handleLogout(item.navigate) : navigation.navigate(item.navigate)}
                    key={index}
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 8,
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "#D3D3D3",
                    }}
                    >
                        <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center', gap: 5}}>
                            <View style={{padding: 5, backgroundColor: item.color, borderRadius: 8}}>
                                <Image source={item.icon}/>
                            </View>
                            <Text fontSize={14} semiBold>{item.name}</Text>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                            <Image source={ICONS.detail}/>
                        </View>
                    </TouchableOpacity>
                ))}
                </View>
            </View>

            {/* Version */}
            <View style={{marginTop: 16, marginBottom:32, justifyContent: 'center', alignItems: 'center'}}>
                <Text fontSize={14}>v0.0.1</Text>
            </View>
        </View>
        </ScrollView>
    )
}