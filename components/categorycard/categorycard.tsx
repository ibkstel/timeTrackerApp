import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { category } from 'categories/categories';
import { mainColor, secondaryColor } from '../../screens/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
    category: category;
}

interface State {}

export class CategoryCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={styles.categoryCard}>
                    <Icon name={this.props.category.icon} style={styles.icon} />
                    <Text style={styles.text}>{this.props.category.name} </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    categoryCard: {
        flex: 10,
        flexDirection: 'row',
        padding: 25,
        margin: 10,
        borderRadius: 15,
        // backgroundColor: secondaryColor,
    },
    text: {
        flex: 8,
        fontSize: 19,
    },
    icon: {
        fontSize: 35,
        flex: 3,
    },
});
