import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Second" component={SecondScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}