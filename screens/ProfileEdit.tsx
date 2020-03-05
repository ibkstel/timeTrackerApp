import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView } from 'react-native';
import { Profile } from '../interfaces/Profile';
import { ProfileCard } from '../components/profile/profileCard';
import { ProfileAboutCard } from '../components/profile/profileAbout';
import { ProfileActivityCard } from '../components/profile/profileActivityCard';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {

}

class ProfileEditScreen extends Component<Props> {
    render() {
        return (
            <View >
                <Text>Profile Edit Screen Here</Text>
                
            </View>
        );
    }
}

export default ProfileEditScreen;


const styles = StyleSheet.create({

})