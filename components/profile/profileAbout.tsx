import React from 'react';
import { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Props {
    job: string;
    workinghour: string;
    country: string;
}

export class ProfileAboutCard extends Component<Props> {
    render() {
        return (
            <View
                style={{
                    margin: 15,
                }}>
                <View style={style.aboutCard}>
                    <Text style={style.aboutHeader}>About</Text>
                    <Text style={style.aboutText}>Country: {this.props.country}</Text>
                    <Text style={style.aboutText}>Job: {this.props.job}</Text>

                    <Text style={style.aboutText}>Working Hour: {this.props.workinghour}</Text>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    aboutCard: {
        borderRadius: 10,
        height: 220,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    aboutText: {
        margin: 2,
        fontSize: 25,
    },
    aboutHeader: {
        fontWeight: 'bold',
        fontSize: 27,
        marginBottom: 15,
    },
});
