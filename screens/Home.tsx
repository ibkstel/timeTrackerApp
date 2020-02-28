import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppNav';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/card/Card';
import { lightColor } from './colors';
import GraphCard from '../components/card/GraphCard';

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
      <ScrollView>
        <View style={{ marginTop: 12 }}>
          <GraphCard
            data={{ Durations: [{ startDate: new Date(-86400000 + new Date().getTime() + new Date().getTimezoneOffset() * 60000), endDate: new Date(-86400000 + new Date().getTime() + 100000 + new Date().getTimezoneOffset() * 60000) }, { startDate: new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000), endDate: new Date(new Date().getTime() + 200000 + new Date().getTimezoneOffset() * 60000) }], label: 'Gym' }}
          />
          <Card
            data={{ Durations: [{ startDate: new Date(-86400000 + new Date().getTime() + new Date().getTimezoneOffset() * 60000), endDate: new Date(-86400000 + new Date().getTime() + 100000 + new Date().getTimezoneOffset() * 60000) }, { startDate: new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000), endDate: new Date(new Date().getTime() + 200000 + new Date().getTimezoneOffset() * 60000) }], label: 'Gym' }}
          />
          <Card
            data={{ Durations: [{ startDate: new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000), endDate: new Date(new Date().getTime() + 150000 + new Date().getTimezoneOffset() * 60000) }, { startDate: new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000), endDate: new Date(new Date().getTime() + 200000 + new Date().getTimezoneOffset() * 60000) }], label: 'Test' }}
          />
        </View>
      </ScrollView >
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