import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { expenseItemInterface } from '../interfaces/interface'

const ExpenseCard:React.FC<{expenseItem:expenseItemInterface,navigation:any}> = ({expenseItem,navigation}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('ExpensesDetails',{id:expenseItem.id,amount:expenseItem.amount,type:expenseItem.type,date:expenseItem.date,address:expenseItem.address,body:expenseItem.body})} style={styles.container}>
            <Text style={styles.text}>
                {expenseItem.address}
            </Text>
            <Text style={[styles.text,expenseItem.type === 1 ? {color:'lightgreen'} : 
                expenseItem.type === 0 ? {color:'skyblue'} : {color:'darkorange'}
            ]}>{expenseItem.amount}</Text>
        </TouchableOpacity>
    )
}

export default ExpenseCard

const styles = StyleSheet.create({
    container : {
        flex:1,
        flexDirection : "row",
        height : 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor : 'rgba(0,0,0,1)',
        gap : 16,
        borderRadius : 16,
        padding : 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
    }
})