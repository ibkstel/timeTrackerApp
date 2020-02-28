import React, { Component, } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { mainColor, lightColor, secondaryColor } from './screens/colors';
import HomeScreen from './screens/Home';
import SecondScreen from './screens/Second';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

export type RootStackParamList = {
    Home: undefined;
    Second: undefined;
};

class StackScreen extends Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: mainColor, elevation: 1 }, headerTintColor: lightColor }} >
                <Stack.Screen options={{
                    headerLeft: (props) => {
                        return (
                            <View {...props}></View>
                        );
                    }
                }} name="Home" component={HomeScreen} />
                <Stack.Screen name="Second" component={SecondScreen} />
            </Stack.Navigator>
        );
    }
}

const Tab = createBottomTabNavigator();


export default class AppNav extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    tabBarOptions={{
                        activeBackgroundColor: mainColor,
                        inactiveBackgroundColor: mainColor,
                        activeTintColor: lightColor,
                        inactiveTintColor: secondaryColor,
                    }}
                >
                    <Tab.Screen name="Home" component={StackScreen}
                        options={() => ({
                            tabBarIcon: ({ color, size }: any) => {
                                return <Icon name="home" size={size} color={color} />;
                            },
                        })} />
                    <Tab.Screen name="Settings" component={SecondScreen}
                        options={() => ({
                            tabBarIcon: ({ color, size }: any) => {
                                return <Icon name="account-circle" size={size} color={color} />;
                            },
                        })} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}