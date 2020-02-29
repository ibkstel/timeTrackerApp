import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { seperatorColor } from '../../screens/colors';

export class Seperator extends Component {
    render() {
        return <View style={styles.seperator} />;
    }
}

export default Seperator;

const styles = StyleSheet.create({
    seperator: {
        height: 1,
        backgroundColor: seperatorColor,
    },
});
