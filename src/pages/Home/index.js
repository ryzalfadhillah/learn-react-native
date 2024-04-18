import { ScrollView, View } from 'react-native'
import React from 'react'
import { deleteData, getData } from '../../store/storages'
import { Button, Text } from '../../components'
import { useDispatch, useSelector } from 'react-redux';
import { setCount } from '../../store/actions/actionCount';
import dataLogin from '../../store/reducers/dataLogin';

export default function Home() {
    const dispatch = useDispatch()
    // const data = useSelector((state) => ({
    //     dataCount: state.dataCount,
    //     dataLogin: state.dataLogin,
    // }));

    const dataCount = useSelector((state) => state.dataCount)
    const dataLogin = useSelector((state) => state.dataLogin)
    

    return (
        <ScrollView>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' ,gap:10, paddingVertical: 60 }}>
            <Text>Home Screen</Text>
            <Button 
                title="Cek Storage" 
                color='white'
                onPress={async() => {
                    getData("user")
                    .then((res) => {
                        console.log("STORAGE", JSON.stringify(res, null, 2));
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    // const authStorage = await getData("auth")
                    // console.log("STORAGE", JSON.stringify(authStorage, null, 2));
                } }
            />
            <Button 
                title="Delete Storage" 
                color='white'
                onPress={async() => {
                    deleteData("user")
                    .then((res) => {
                        console.log("STORAGE DELETED");
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                } }
            />
            <Text>DATA COUNT REUDX: {dataCount.increment}</Text>
            <Button 
                title='+'
                color='white'
                styles={{width: 60, height: 60}}
                onPress ={() => dispatch(setCount(dataCount.increment + 1))}
            />
            <Button 
                title='-'
                color='white'
                styles={{width: 60, height: 60}}
                onPress ={() => dispatch(setCount(dataCount.increment - 1))}
            />
        </View>
        </ScrollView>
    )
}