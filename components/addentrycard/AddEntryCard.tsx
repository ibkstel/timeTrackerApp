import React, { Component } from 'react';
import { Text, StyleSheet, FlatList, TouchableOpacity, SectionList, SectionListData, ViewStyle } from 'react-native';
import { View } from 'react-native-animatable';
import { secondaryColor, mainColor, lightColor, lightSecondaryColor } from '../../screens/colors';

interface Props {
    style?: ViewStyle;
    onPress?: () => void;
}

export class AddEntryCard extends Component<Props> {
    render() {
        return (
            <TouchableOpacity
                style={{
                    ...styles.card,
                    ...this.props.style,
                    opacity: 1,
                }}
                onPress={this.props.onPress}>
                <View style={styles.cardView}>
                    <Text style={styles.titleText}>Add Entry</Text>
                    <View
                        style={{
                            position: 'absolute',
                            right: 0,
                            justifyContent: 'center',
                        }}></View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default AddEntryCard;

const styles = StyleSheet.create({
    card: {
        paddingBottom: 12,
        paddingHorizontal: 16,
    },
    titleText: {
        fontSize: 24,
        color: lightColor,
    },
    cardView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: secondaryColor,
    },
});
