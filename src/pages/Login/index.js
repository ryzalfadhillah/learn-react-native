import { Image, ImageBackground, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, InputText, Text } from '../../components'
import IMAGES from '../../assets/images'
import ICONS from '../../assets/icons'
import { HEIGHT, WIDTH } from '../../assets/styles'
import { EMAIL, PASSWORD } from '../../utils/regex'
import { BASE_URL, SALT_KEY } from '@env'
import { decryptAES, encryptAES } from '../../utils/crypto'
import satellite from '../../services/satellite'
import { CommonActions } from '@react-navigation/native'
import { getData, storeData } from '../../store/storages'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../../store/actions/actionLogin'

export default function Login({navigation, route}) {
    const dispatch = useDispatch()
    const dataLogin = useSelector((state) => state.dataLogin)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isEnable, setIsEnable] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        // getData("user")
        // .then((res) => {
        //     res !== null && navigation.dispatch(
        //         CommonActions.reset({
        //             index: 1,
        //             routes: [
        //                 { name: 'Main' },
        //             ],
        //         })
        //     );
        // })
        // .catch((err) => {
        //     console.log(err);
        // })

        if(dataLogin.userProfile != null){
            navigation.navigate("Main")
        }

        if(formData.email && formData.password){
            setIsEnable(errorMessage.email !== '' || errorMessage.password !== '');
        }
    }, [errorMessage, dataLogin]);

    const handleChange = (name, value) => {
        if(name === 'email') {
            if(!value.trim()) {
                setErrorMessage({ ...errorMessage, email: 'Email must be filled in' });
            } else if(!EMAIL.test(value)) {
                setErrorMessage({ ...errorMessage, email: 'Invalid email format' });
            } else {
                setErrorMessage({ ...errorMessage, email: '' });
            }
        } else {
            if(value.length === 0) {
                setErrorMessage({ ...errorMessage, password: 'Password must be filled in' });
            // } else if(!PASSWORD.test(value)) {
            //     setErrorMessage({ ...errorMessage, password: `Password must be at least 8 characters \nand contain one number and character` });
            } else {
                setErrorMessage({ ...errorMessage, password: '' });
            }
        }

        setFormData({ ...formData, [name]: value })
    }

    const onSubmit = async () => {
        setIsLoading(true)

        const emailEncrypted = encryptAES(formData.email)
        const passwordEncrypted = encryptAES(formData.password)

        const login = {
            email: emailEncrypted,
            password: passwordEncrypted
        }

        satellite.post("/rest/v1/auth/login", login)
        .then((response) => {
            console.log(JSON.stringify(response.data.data, null, 2));
            dispatch(setLogin(response.data.data))
            storeData("user", response.data.data)
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        { name: 'Main' },
                    ],
                })
            );
        })
        .catch((error) => {
            console.log(JSON.stringify(error.response.data, null, 2));
        })
        .finally(() => {
            console.log("REQUEST FINISH");
            setIsLoading(false);
        })
    }

    return (
            <ImageBackground 
                source={IMAGES.bgLogin}
                style={{width: WIDTH, height: HEIGHT}}
            >
                <View style={{ paddingTop: 122, paddingHorizontal: 20}}>
                    <InputText 
                        title={"Email"}
                        name="email"
                        keyboardType='email-address'
                        value={formData.email}
                        onChangeText={(value) => handleChange('email', value)}
                        placeholder={"Enter your email"} 
                        error={errorMessage.email}/>
                    <InputText 
                        title={"Password"} 
                        name="password"
                        value={formData.password}
                        onChangeText={(value) => handleChange('password', value)}
                        error={errorMessage.password}
                        linkText='Forgot Password?'
                        link='https://www.google.co.id/'
                        placeholder={"Password"} 
                        secureTextEntry={!isShowPassword}
                        rightIcon={ 
                            <TouchableOpacity 
                                onPress={() => setIsShowPassword(!isShowPassword)}>
                                    <Image source={isShowPassword ? ICONS.eye : ICONS.eyeSlash} style={{height:20, width:20, resizeMode: 'contain'}} />
                            </TouchableOpacity>
                        } 
                    />
                    <Button 
                        title= {isLoading ? 'Loading...' : 'Login'}
                        styles={{marginTop: 20}}
                        disabled ={isEnable || isLoading}
                        onPress={() => onSubmit()}
                    />

                    <View
                        style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center',}}
                    >
                        <Text color='#fff'>Don't have an Account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text color='#F6E58D'> Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
    )
}
