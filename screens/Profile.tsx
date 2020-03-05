import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView } from 'react-native';
import { Profile } from '../interfaces/Profile';
import { ProfileCard } from '../components/profile/profilecard';
import { ProfileAboutCard } from '../components/profile/profileAbout';
import { ProfileActivityCard } from '../components/profile/profileActivityCard';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    profile: Profile;
}

export class ProfileScreen extends Component<Props> {
    render() {
        return (
            <View>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={style.profileCard}>
                        <ProfileCard
                            pictureUrl="https://icons.iconarchive.com/icons/graphicloads/100-flat/256/home-icon.png"
                            nickname="stelselim"
                        />
                    </View>
                    <View style={{ height: 1, backgroundColor: 'gray', marginHorizontal: 10 }} />
                    <ProfileAboutCard job="Software Developer" workinghour="45 Hours" country="USA" />
                    <ProfileActivityCard allActivityTime={200} last30dayActivity={100} last7dayActivity={25} />
                </ScrollView>
            </View>
        );
    }
}

export default ProfileScreen;

const style = StyleSheet.create({
    profileCard: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 15,
        justifyContent: 'flex-start',
    },
});
