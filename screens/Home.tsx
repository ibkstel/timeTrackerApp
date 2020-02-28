import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppNav';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/card/Card';
import { lightColor } from './colors';
import { Data } from '../interfaces/Data';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface Props extends StateRedux{
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
    console.log(this.props.Data)
    return (
      <ScrollView>
        <View style={{ marginTop: 12 }}>
          <Card
            data={this.props.Data[0]}
          />
          <Card
            data={this.props.Data[1]}
          />
        </View>
      </ScrollView >
    );
  }
}

interface StateRedux {
  Data: Array<Data>
}

const mapStateToProps = (state: StateRedux) => {
  const { Data } = state;
  return { Data };
};

const mapDispatchToProps = (dispatch: any) => (
  bindActionCreators({
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);



const styles = StyleSheet.create({
  menuView: {
    marginLeft: 16
  },
  menuIcon: {
    fontSize: 28,
    color: lightColor,
  }
})