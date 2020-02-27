import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { secondaryColor, mainColor, lightColor, lightSecondaryColor } from '../../screens/colors';
import Seperator from '../../components/seperator/Seperator';
import { Data } from '../../interfaces/Data';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
    data: Data,
    expanded: boolean
}

export class Card extends Component<Props> {
    getTotal = () => {
        let total = 0;
        let durations = this.props.data.Durations.map((i) => i.endDate.getTime() - i.startDate.getTime());
        for (let i in durations)
            total += durations[i];
        return total;
    }

    getAvg = () => {
        let total = 0;
        let durations = this.props.data.Durations.map((i) => i.endDate.getTime() - i.startDate.getTime());
        for (let i in durations)
            total += durations[i];
        return total / durations.length;
    }

    render() {
        if (!this.props.expanded) {
            return (
                <View style={styles.card}>
                    <View style={styles.cardTopView}>
                        <Text style={styles.titleText}> {this.props.data.label} </Text>
                        <Icon style={styles.icon} name="arrow-drop-down" />
                    </View>
                    <Seperator />
                    {this.props.data.Durations.length === 0 ?
                        <View style={styles.cardBottomView}>
                            <Text style={styles.bottomText}>Start</Text>
                        </View>
                        :
                        <View style={styles.cardBottomView}>
                            <Text style={styles.bottomText}>Average: {this.getAvg()}</Text>
                            <Text style={styles.bottomText}>Total: {this.getTotal()}</Text>
                        </View>
                    }
                </View>
            );
        }
        else {
            return (
                <View style={styles.card}>
                    <View style={styles.cardTopView}>
                        <Text style={styles.titleText}> {this.props.data.label} </Text>
                        <Icon style={styles.icon} name="arrow-drop-down" />
                    </View>
                    <Seperator />
                    <View style={styles.cardBottomView}>
                        <Text style={styles.titleText}> {this.props.data.label} </Text>
                    </View>
                </View>
            );
        }
    }
}

export default Card

const styles = StyleSheet.create({
    card: {
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    icon: {
        position: 'absolute',
        fontSize: 32,
        color: lightColor,
        right: 16
    },
    titleText: {
        fontSize: 24,
        color: lightColor
    },
    detailText: {
        fontSize: 24,
        color: lightColor
    },
    bottomText: {
        fontSize: 24,
        color: lightSecondaryColor
    },
    cardTopView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: secondaryColor
    },
    cardBottomView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: mainColor
    }
});