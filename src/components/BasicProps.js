import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BasicPropsComponent = (props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 50, borderWidth:1}}>
      <Text>{props.message}</Text>
      <Text style={{fontSize: 36}}>{props.number}</Text>
      <View style={{flex: 1, flexDirection: 'row', gap: 10}}>
        <TouchableOpacity onPress={props.increment} style={styles.btnAdd}>
            <Text style={{color: 'white'}}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.decrement} style={styles.btnMin}>
            <Text style={{color: 'white'}}>Min</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.reset} style={styles.btnReset}>
            <Text style={{color: 'white'}}>Reset</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

export default BasicPropsComponent;

const styles = StyleSheet.create({
    btnAdd: {
        backgroundColor: 'green',
        padding: 10
    },

    btnMin: {
        backgroundColor: 'orange',
        padding: 10
    },
    
    btnReset: {
        backgroundColor: 'red',
        padding: 10
    }
})