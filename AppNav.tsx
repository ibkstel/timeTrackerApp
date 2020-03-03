import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { mainColor, lightColor, secondaryColor } from './screens/colors';
import HomeScreen from './screens/Home';
import SecondScreen from './screens/Second';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CategoriesScreen from './screens/Category';

const Stack = createStackNavigator();

export type RootStackParamList = {
    Home: undefined;
    Second: undefined;
    Categories: undefined;
};

function StackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: mainColor, elevation: 1 },
                headerTintColor: lightColor,
            }}>
            <Stack.Screen
                options={{
                    headerLeft: (props) => {
                        return <View {...props} />;
                    },
                }}
                name="Home"
                component={HomeScreen}
            />
        </Stack.Navigator>
    );
}

function StackCategory() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: mainColor, elevation: 1 },
                headerTintColor: lightColor,
            }}>
            <Stack.Screen
                options={{
                    headerLeft: (props) => {
                        return <View {...props} />;
                    },
                }}
                name="Categories"
                component={CategoriesScreen}
            />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

function TabScreen() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeBackgroundColor: mainColor,
                inactiveBackgroundColor: mainColor,
                activeTintColor: lightColor,
                inactiveTintColor: secondaryColor,
            }}>
            <Tab.Screen
                name="Home"
                component={StackScreen}
                options={() => ({
                    tabBarIcon: ({ color, size }: any) => {
                        return <Icon name="home" size={size} color={color} />;
                    },
                })}
            />
            <Tab.Screen
                name="Categories"
                component={StackCategory}
                options={() => ({
                    tabBarIcon: ({ color, size }: any) => {
                        return <Icon name="view-list" size={size} color={color} />;
                    },
                })}
            />
            <Tab.Screen
                name="Profile"
                component={SecondScreen}
                options={() => ({
                    tabBarIcon: ({ color, size }: any) => {
                        return <Icon name="account-circle" size={size} color={color} />;
                    },
                })}
            />
        </Tab.Navigator>
    );
}

function CustomDrawerContent(props: any) {
    return (
        <DrawerContentScrollView {...props}>
            <View
                style={{
                    backgroundColor: mainColor,
                    height: 140,
                    marginTop: -4,
                    justifyContent: 'center',
                }}>
                <Text style={{ textAlign: 'center', fontSize: 32, color: 'white' }}>Logo</Text>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem label="Help" onPress={() => {}} />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

export default function AppNav() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={CustomDrawerContent}>
                <Drawer.Screen name="Home" component={TabScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
