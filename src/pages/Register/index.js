import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, InputText, Text } from '../../components';
import IMAGES from '../../assets/images';
import ICONS from '../../assets/icons';
import { HEIGHT, WIDTH } from '../../assets/styles';
import { EMAIL, NAME, NIK, PASSWORD, PHONE } from '../../utils/regex';
import { encryptAES } from '../../utils/crypto';
import satellite from '../../services/satellite';

const Register = ({ navigation }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [isEnable, setIsEnable] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        nik: '',
        password: '',
        confirmPassword: ''
    });

    const [errorMessage, setErrorMessage] = useState({
        name: '',
        email: '',
        phone: '',
        nik: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        // if(formData.name && formData.email && formData.phone && formData.nik && formData.password && formData.confirmPassword) {
        //     setIsEnable(
        //         errorMessage.name !== ''  || 
        //         errorMessage.email !== '' || 
        //         errorMessage.phone !== '' || 
        //         errorMessage.nik !== '' || 
        //         errorMessage.password !== '' || 
        //         errorMessage.confirmPassword !== '');
        // }
        if (Object.values(formData).every((value) => value !== '')) {
            const isFormValid = Object.values(errorMessage).every((error) => error === '');
            setIsEnable(!isFormValid);
        }
    }, [errorMessage]);

    const handleChange = (name, value) => {
        value = value.trim();

        switch (name) {
            case 'name':
                if(!value.trim()) {
                    setErrorMessage({ ...errorMessage, name: 'Name must be filled in' });
                }else if (!NAME.test(value)) {
                    setErrorMessage({ ...errorMessage, name: 'Name must contain only letters' });
                } else {
                    setErrorMessage({ ...errorMessage, name: '' });
                }
                break;
            case 'email':
                if(!value.trim()) {
                    setErrorMessage({ ...errorMessage, email: 'Email must be filled in' });
                }else if (!EMAIL.test(value)) {
                    setErrorMessage({ ...errorMessage, email: 'Invalid email format' });
                } else {
                    setErrorMessage({ ...errorMessage, email: '' });
                }
                break;
            case 'phone':
                if(!value.trim()) {
                    setErrorMessage({ ...errorMessage, phone: 'Phone must be filled in' });
                }else if (!PHONE.test(value)) {
                    setErrorMessage({ ...errorMessage, phone: 'Phone number must contain only digits' });
                } else {
                    setErrorMessage({ ...errorMessage, phone: '' });
                }
                break;
            case 'nik':
                if(!value.trim()) {
                    setErrorMessage({ ...errorMessage, nik: 'NIK must be filled in' });
                }else if (!NIK.test(value)) {
                    setErrorMessage({ ...errorMessage, nik: 'NIK must be a 16-digit number' });
                } else {
                    setErrorMessage({ ...errorMessage, nik: '' });
                }
                break;
            case 'password':
                if(!value.trim()) {
                    setErrorMessage({ ...errorMessage, password: 'Password must be filled in' });
                }else if (!PASSWORD.test(value)) {
                    setErrorMessage({ ...errorMessage, password: `Password must be at least 8 characters \nand contain one number and character` });
                } else {
                    setErrorMessage({ ...errorMessage, password: '' });
                }
                break;
            case 'confirmPassword':
                if(!value.trim()) {
                    setErrorMessage({ ...errorMessage, confirmPassword: 'Confirm Password must be filled in' });
                }else if (value !== formData.password) {
                    setErrorMessage({ ...errorMessage, confirmPassword: 'Passwords do not match' });
                } else {
                    setErrorMessage({ ...errorMessage, confirmPassword: '' });
                }
                break;
            default:
                break;
        }

        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = () => {
        setIsLoading(true)

        const registerData = {
            "doSendRegister": {
                name : encryptAES(formData.name),
                email : encryptAES(formData.email),
                nik : encryptAES(formData.nik),
                phoneNumber : encryptAES(formData.phone),
                password : encryptAES(formData.password)
            }
        }

        satellite.post("/rest/v1/auth/register", registerData)
        .then((response) => {
            console.log(JSON.stringify(response.data, null, 2));
            navigation.navigate("Login")
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
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <ImageBackground source={IMAGES.bgLogin} style={{ width: WIDTH, height: HEIGHT }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={ICONS.back} style={{ marginTop: 30, marginLeft: 20, width: 20, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <ScrollView>
                    <View style={{ paddingTop: 40, paddingHorizontal: 20 }}>
                        <InputText
                            title="Name"
                            name="name"
                            onChangeText={(value) => handleChange('name', value)}
                            placeholder="Enter Your Name"
                            error={errorMessage.name}
                        />
                        <InputText
                            title="Email"
                            name="email"
                            keyboardType='email-address'
                            onChangeText={(value) => handleChange('email', value)}
                            placeholder="Enter Your Email"
                            error={errorMessage.email}
                        />
                        <InputText
                            title="Phone"
                            name="phone"
                            onChangeText={(value) => handleChange('phone', value)}
                            placeholder="Enter Your Phone"
                            error={errorMessage.phone}
                        />
                        <InputText
                            title="NIK"
                            name="nik"
                            onChangeText={(value) => handleChange('nik', value)}
                            placeholder="Enter Your NIK Number"
                            error={errorMessage.nik}
                        />
                        <InputText
                            title="Password"
                            name="password"
                            onChangeText={(value) => handleChange('password', value)}
                            placeholder="Password"
                            secureTextEntry={!isShowPassword}
                            error={errorMessage.password}
                            rightIcon={ 
                                <TouchableOpacity 
                                    onPress={() => setIsShowPassword(!isShowPassword)}>
                                        <Image source={isShowPassword ? ICONS.eye : ICONS.eyeSlash} style={{height:20, width:20, resizeMode: 'contain'}} />
                                </TouchableOpacity>
                            } 
                        />
                        <InputText
                            title="Confirm Password"
                            name="confirmPassword"
                            onChangeText={(value) => handleChange('confirmPassword', value)}
                            placeholder="Confirm Password"
                            secureTextEntry={!isShowConfirmPassword}
                            error={errorMessage.confirmPassword}
                            rightIcon={ 
                                <TouchableOpacity 
                                    onPress={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>
                                        <Image source={isShowConfirmPassword ? ICONS.eye : ICONS.eyeSlash} style={{height:20, width:20, resizeMode: 'contain'}} />
                                </TouchableOpacity>
                            } 
                        />
                        <Button
                            title= {isLoading ? 'Loading...' : 'Register'}
                            styles={{ marginTop: 20, marginBottom: 100 }}
                            disabled={isEnable || isLoading}
                            onPress={() => onSubmit()}
                        />
                    </View>
                </ScrollView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default Register;
