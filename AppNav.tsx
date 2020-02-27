import React, { Component, } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { mainColor, lightColor } from './screens/colors';
import HomeScreen from './screens/Home';
import SecondScreen from './screens/Second';

const Stack = createStackNavigator();

export type RootStackParamList = {
    Home: undefined;
    Second: undefined;
};

export default class AppNav extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: mainColor, elevation: 1}, headerTintColor: lightColor}}>
                    <Stack.Screen options={{headerLeft: (props) => {
                        return (
                            <View {...props}></View>
                        );
                    }}}  name="Home" component={HomeScreen} />
                    <Stack.Screen name="Second" component={SecondScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}