import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View } from 'react-native';
import AllExpensesPage from './src/views/AllExpensesPage';
import ExpensesDetails from './src/views/ExpensesDetails';
import LoadingPage from './src/views/LoadingPage';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  
  return (
    <SafeAreaView style={{ flex:1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='LoadingPage'>
            <Stack.Screen name="LoadingPage" component={LoadingPage} />
            <Stack.Screen name="AllExpensesPage" component={AllExpensesPage} />
            <Stack.Screen name="ExpensesDetails" component={ExpensesDetails} />
          </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
