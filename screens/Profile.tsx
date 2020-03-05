import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Profile } from '../interfaces/Profile';


interface Props{
    profile:Profile;
}


export class ProfileScreen extends Component<Props>{
    render() {
        return (
            <View>
                <Text> Profil Page </Text>
            </View>
        );
    }
}

export default ProfileScreen;
