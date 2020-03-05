import React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-animatable';

interface Props {
    pictureUrl: string,
    nickname: string,

}

export class ProfileCard extends Component<Props>{
    render() {

        return (
            <View style={{ margin: 15,}}>
                <View style={style.Circular}>
                    <Image style={style.profileImg} source={{ uri: this.props.pictureUrl }} />
                </View>
                <Text style={style.nicknameText}> {this.props.nickname}</Text>
            </View>

        )
    }
}
const style = StyleSheet.create({

    Circular: {
        width: 151,
        height: 151,
        color: "blue",
        justifyContent: "center",
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
    },
    profileImg: {

        justifyContent: "center",
        alignSelf: "center",
        height: 150,
        width: 150,
        borderRadius: 150 / 2,
    },
    nicknameText: {
        marginTop:10,
        textAlign: "center",
        fontSize: 33
    }

});