import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../AppNav';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/card/Card';
import { lightColor } from './colors';
import { UserData } from '../interfaces/Data';
import { setTimer, setUserData } from '../redux/Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface Props extends StateRedux {
    navigation: CompositeNavigationProp<
        DrawerNavigationProp<{ Home: undefined }, 'Home'>,
        StackNavigationProp<RootStackParamList>
    >;
    setTimer: (a: Array<boolean>) => void;
    setUserData: (a: UserData) => void;
}

export class HomeScreen extends Component<Props> {
    async componentDidMount() {
        this.props.navigation.setOptions({
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        style={styles.menuView}
                        onPress={() => {
                            this.props.navigation.openDrawer();
                        }}>
                        <Icon name="menu" style={styles.menuIcon} />
                    </TouchableOpacity>
                );
            },
        });
        let datastr = await AsyncStorage.getItem('UserData');
        let data = datastr === null ? null : JSON.parse(datastr);
        if (data !== null) {
            for (let i = 0; i < data!.Data.length; i++) {
                for (let j = 0; j < data.Data[i].Durations.length; j++) {
                    data.Data[i].Durations[j].startDate = new Date(data.Data[i].Durations[j].startDate);
                    data.Data[i].Durations[j].endDate = new Date(data.Data[i].Durations[j].endDate);
                }
            }
            this.props.setUserData(data);
        }
    }

/*     sortData =() => {
        let UserData = this.props.UserData;
        UserData!.Data.reverse().forEach((i) => {
            for(let j=0; j<i.Durations.length; j++){
                UserData!.Data = UserData!.Data.reverse();                                                        
            }
        });
        return UserData;
    } */

    render() {
        return (
            <ScrollView>
                <View style={{ marginTop: 12 }}>
                    {this.props.UserData.Data.map((i, index) => (
                        <Card
                            data={i}
                        />
                    ))}
                </View>
            </ScrollView>
        );
    }
}

interface StateRedux {
    UserData: UserData;
    Timer: Array<boolean>;
}

const mapStateToProps = (state: StateRedux) => {
    const { UserData, Timer } = state;
    return { UserData, Timer };
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ setTimer, setUserData }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HomeScreen);

const styles = StyleSheet.create({
    menuView: {
        marginLeft: 16,
    },
    menuIcon: {
        fontSize: 28,
        color: lightColor,
    },
});
