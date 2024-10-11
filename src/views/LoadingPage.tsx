import { PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'

const LoadingPage = ({navigation}:any) => {
  
  const [ isLoading, setLoading ] = React.useState(true);
  const [ isSMSGranted, setSMSGranted ] = React.useState(false);

  useEffect(()=>{
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS, {
      title: 'Read SMS Permission',
      message: 'This app would like to read your SMS',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    })
    .then((granted) => {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setSMSGranted(true);
      } else {
        setSMSGranted(false);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    })
  },[])

  useEffect(()=>{
    if(isSMSGranted){
      navigation.navigate('AllExpensesPage')
    }
  },[isSMSGranted])
  return (
    <View style={styles.container}>
      <Text style={styles.containerHeading}>Welcome to the app</Text>
      {
        !isLoading && !isSMSGranted && <Text style={{color:'red',fontWeight:'bold',fontSize:24}}>Permission Denied</Text>
      }
    </View>
  )
}

export default LoadingPage

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : 'rgba(0,0,0,.8)',
    gap : 16
  },
  containerHeading : {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  }
})