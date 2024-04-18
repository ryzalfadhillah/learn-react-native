import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BasicPropsComponent from './src/components/BasicProps';
import Flexbox from './src/components/Flexbox';

export default function App() {

  const [number, setNumber] = useState(0)

  const increment = () => {
    setNumber(number + 1)
  }

  const decrement = () => {
    setNumber(number - 1)
  }

  const resetNumber = () => {
    setNumber(0)
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.text}>Hello World!</Text>
        <StatusBar style="auto" />
        <TextInput style={styles.textInput}/>
        <Button title="Click Me" />
        <Text style={{fontSize: 32}}>{number}</Text>
        <BasicPropsComponent message="Count" number={number} increment={increment} decrement={decrement} reset={resetNumber}/>
        <Image source={require("./assets/logo-berijalan.png")} style={{backgroundColor: 'black'}} />
        <Flexbox />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },

  text: {
    color: 'red'
  },

  textInput: {
    border: '1px solid #000'
  },
});
