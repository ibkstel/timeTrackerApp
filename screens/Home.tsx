import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppNav';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/card/Card';
import { lightColor } from './colors';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export class HomeScreen extends Component<Props> {

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity style={styles.menuView}
            onPress={() => { }}
          >
            <Icon name="menu" style={styles.menuIcon} />
          </TouchableOpacity>
        );

      }
    })
  }


  render() {
    return (
      <View>
        <Card
          data={{ Durations: [{startDate: new Date(0), endDate: new Date(10)}, {startDate: new Date(15), endDate: new Date(20)}], label: 'Gym' }}
          expanded={false}
        />
      </View>
    );
  }
}

export default HomeScreen;


const styles = StyleSheet.create({
  menuView: {
    marginLeft: 16
  },
  menuIcon: {
    fontSize: 28,
    color: lightColor,
  }
})