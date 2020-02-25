import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../AppNav';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export class HomeScreen extends Component<Props> {
  render() {
    return (
      <View>
        <Text>Home</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Second');
          }}>
          <Text>Second Page</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;
