import { Linking, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '../Text'

export default function InputText({
    title, 
    rightIcon = <View></View>,
    linkText = '',
    link = '',
    error = '',
    ...props}) 
    {
    return (
        <View style={{marginBottom:0}}>
            <Text color='#fff'>{title}</Text>
            <View style={{
                borderWidth:1,
                borderRadius:8,
                borderColor: error ? '#EA8685' : '#273C75',
                backgroundColor: '#132040',
                padding: 12,
                marginTop: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                }}>
                    <TextInput 
                        placeholderTextColor={"#fff"}
                        style={{
                            color: '#fff',
                            fontSize:16,
                    }}
                    {...props}
                    />
                    {rightIcon && <View>{rightIcon}</View>}
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,}}>
                <TouchableOpacity onPress={async () => {
                    try {                        
                        await Linking.openURL(link);
                        console.log('URL berhasil dibuka:', link);
                    } catch (error) {
                        console.error('Gagal membuka URL:', error);
                    }                    
                }}>
                    <Text fontSize={10} color={'#F6E58D'}>{linkText}</Text>
                </TouchableOpacity>
                <Text fontSize={10} color={'#EA8685'}>{error}</Text>
            </View>
        </View>
    )
}