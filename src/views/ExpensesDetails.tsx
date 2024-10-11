import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';

type ExpenseDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ExpenseDetails'>;

const ExpensesDetails = () => {
  const { id,address,body,date, amount ,type } = useRoute<ExpenseDetailsScreenRouteProp>().params;
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.containerHeading}>{address}</Text>
        <Text style={[styles.containerHeading,type === 1 ? {color:'lightgreen'} : 
          type === 0 ? {color:'skyblue'} : {color:'darkorange'}
        ]}>{amount}</Text>
      </View>
      <Text style={styles.text}>{body}</Text>
      <Text style={[styles.textDate,{alignSelf:'flex-end'}]}>{new Date(date).toLocaleString()}</Text>
    </View>
  )
}

export default ExpensesDetails

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    padding:16,
    backgroundColor : 'rgba(0,0,0,.8)',
    gap : 16
  },
  containerHeading : {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  text : {
      color : 'white',
      fontWeight : 'bold',
      fontSize : 18
  },
  textDate : {
      color : 'white',
      fontWeight : 'bold',
      fontSize : 14
  }
})