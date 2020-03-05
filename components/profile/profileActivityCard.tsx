import React from 'react';
import { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Props {
    allActivityTime: number;
    last7dayActivity: number;
    last30dayActivity: number;
}

export class ProfileActivityCard extends Component<Props> {
    render() {
        return (
            <View
                style={{
                    margin: 15,
                    marginBottom: 30,
                }}>
                <View style={style.activityCard}>
                    <Text style={style.activityHeader}>All Time Activity</Text>
                    <Text style={style.activityText}>Last 7 Days: {this.props.last7dayActivity} Hours</Text>
                    <Text style={style.activityText}>Last 30 Days: {this.props.last30dayActivity} Hours</Text>
                    <Text style={style.activityText}>Total: {this.props.allActivityTime} Hours</Text>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    activityCard: {
        borderRadius: 10,
        height: 220,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activityText: {
        margin: 2,
        fontSize: 23,
    },
    activityHeader: {
        fontWeight: 'bold',
        fontSize: 27,
        marginBottom: 15,
    },
});
