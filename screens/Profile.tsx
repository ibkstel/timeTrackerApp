import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, TouchableOpacity, Alert } from 'react-native';
import { Profile } from '../interfaces/Profile';
import { ProfileCard } from '../components/profile/profileCard';
import { ProfileAboutCard } from '../components/profile/profileAbout';
import { ProfileActivityCard } from '../components/profile/profileActivityCard';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from 'AppNav';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
    navigation: StackNavigationProp<ProfileStackParamList>
    profile: Profile;
}

{/** */}

export class ProfileScreen extends Component<Props> {

    componentDidMount = () => {
        this.props.navigation.setOptions({
            headerRight: () => {
                return (
                    <View style={{ flexDirection: 'row' }}>
                        {
                            // Editin profile functions going to be added here.
                        }
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')}>
                            <Icon name="edit" size={28} color={'white'} style={{ marginRight: 15 }} />
                        </TouchableOpacity>
                       {/* {
                            // Log out functions going to be added here.
                        }
                        <TouchableOpacity onPress={() => Alert.alert('Log Out')}>
                            <Icon name="arrow-forward" size={28} color={'white'} style={{ marginRight: 15 }} />
                    </TouchableOpacity>*/}
                    </View>
                );
            },
        });
    };
    


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
