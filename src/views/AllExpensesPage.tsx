import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { expenseItemInterface } from '../interfaces/interface'
import ExpenseCard from '../components/ExpenseCard'
import Icon from 'react-native-vector-icons/AntDesign';
import SmsAndroid from 'react-native-get-sms-android';

function extractCurrencyAmounts(smsBody:string) {
    const currencyAmountRegex = /(\$₹|INR|Rs|Rs.|rupees|Rupees)\s*(\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?)/g;
    const matches = smsBody.match(currencyAmountRegex);
    
    if (matches) {
        return matches[0].toString(); 
    } else {
        return "Error"; 
    }
}

function determineTransactionType(smsBody:string) {
    const transactionRegex = /(credited|debited)/i;
    const match = smsBody.match(transactionRegex);
    if (match) {
        if (/credited/i.test(match[0])) {
            return 1;
        } else if (/debited/i.test(match[0])) {
            return -1;
        }
    }
    return 0;
}


const AllExpensesPage = ({navigation}:any) => {
    const [ filterModalVisible, setFilterModalVisible ] = useState(false)
    const [ messages,setMessages ] = useState<expenseItemInterface[]>([])

    useEffect(()=>{
        SmsAndroid.list(
            JSON.stringify({
                box: '', 
                bodyRegex:'(.*)(credited|debited)(.*)',
                body: ''
            }),
            (fail) => {
                Alert.alert('Error: ', JSON.stringify(fail));
            },
            (count, smsList) => {
                const messages = JSON.parse(smsList);
                setMessages(messages.map((message:any) => {
                    return {
                        id: message._id,
                        address : message.address,
                        body: message.body,
                        date : message.date,
                        amount : extractCurrencyAmounts(message.body),
                        type : determineTransactionType(message.body)
                    }
                }));
            }
            );
    },[])

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.containerHeading}>Expenses</Text>
            <TouchableOpacity onPress={()=>{setFilterModalVisible(true)}}
                style={[styles.filterIconButton]}
            > 
                <Icon name="filter" size={28} color='white'/> 
            </TouchableOpacity>
        </View>
        <FlatList 
            data={messages} 
            contentContainerStyle={{gap:16}}
            showsVerticalScrollIndicator={false} keyExtractor={(item) => String(item.id)} 
            renderItem={({item}) => <ExpenseCard expenseItem={item} navigation={navigation}/>} 
        />
        </View>
    )
}

export default AllExpensesPage

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor : 'rgba(0,0,0,.8)',
        padding:16
    },
    header : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : 16
    },
    containerHeading : {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    filterIconButton : {

    }
})