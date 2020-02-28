import React, { Component } from 'react'
import { Text, StyleSheet, FlatList, SectionList, SectionListData, ViewStyle } from 'react-native'
import { View } from 'react-native-animatable';
import { secondaryColor, mainColor, lightColor, lightSecondaryColor } from '../../screens/colors';
import Seperator from '../../components/seperator/Seperator';
import { Data } from '../../interfaces/Data';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Graph from '../../components/graph/Graph'
import moment from 'moment';
import { getDuration } from '../../utils/time/duration';
import { groupDates } from '../../utils/date/date';


interface Props {
    data: Data,
    style?: ViewStyle,
    graphTitle?: string,
    graphStyle?: ViewStyle
}

interface State {
    graph: boolean,
    expanded: boolean
}

export class Card extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            graph: false,
            expanded: true
        }
    }

    public static defaultProps = {
        graph: false
    };

    getTotal = () => {
        let total = 0;
        let durations = this.props.data.Durations.map((i) => i.endDate.getTime() - i.startDate.getTime());
        for (let i in durations)
            total += durations[i];
        return moment(new Date(total + new Date().getTimezoneOffset() * 60000)).format("HH:mm:ss")
    }

    getAvg = () => {
        let total = 0;
        let durations = this.props.data.Durations.map((i) => i.endDate.getTime() - i.startDate.getTime());
        for (let i in durations)
            total += durations[i] + new Date().getTimezoneOffset() * 60000;
        return moment(new Date(total / durations.length)).format("HH:mm:ss")
    }


    details = () => {
        if (!this.state.graph) {
            return (
                <View animation="fadeIn" duration={600} style={styles.cardMidView}>
                    <SectionList
                        sections={groupDates(this.props.data)}
                        keyExtractor={(_, index) => index.toString()}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.detailTextHeader}>{title}</Text>
                        )}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <View style={styles.detailTextRow}>
                                        <Icon name="brightness-1" color={lightColor} style={{ paddingRight: 2 }} size={8} />
                                        <Text style={styles.detailText}>{moment(getDuration(item.startDate, item.endDate)).format("HH:mm:ss")}</Text>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            );
        }
        else {
            return (
                <View animation="fadeIn" duration={600} style={styles.cardMidView}>
                    <Graph
                        style={this.props.graphStyle}
                        data={this.props.data}
                    />
                </View>
            )
        }
    }

    render() {
        if (!this.state.expanded) {
            return (
                <View style={{ ...styles.card, ...this.props.style, opacity: 1 }}>
                    <View style={styles.cardTopView}>
                        <Text style={styles.titleText}>{this.props.data.label}</Text>
                        {
                            this.state.expanded ?
                                <Icon style={styles.iconChart} name="insert-chart" onPress={() => this.setState({ graph: !this.state.graph })} />
                                :
                                <View />
                        }
                        <Icon style={styles.iconArrow} name="arrow-drop-down" onPress={() => this.setState({ expanded: !this.state.expanded })} />
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
                <View style={{ ...styles.card, ...this.props.style, opacity: 1 }}>
                    <View style={styles.cardTopView}>
                        <Text style={styles.titleText}>{this.props.data.label}</Text>
                        {
                            this.state.expanded ?
                                <Icon style={styles.iconChart} name="insert-chart" onPress={() => this.setState({ graph: !this.state.graph })} />
                                :
                                <View />
                        }
                        <Icon style={styles.iconArrow} name="arrow-drop-up" onPress={() => this.setState({ expanded: !this.state.expanded })} />
                    </View>
                    <Seperator />
                    {this.details()}
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
    }
}

export default Card

const styles = StyleSheet.create({
    card: {
        paddingBottom: 12,
        paddingHorizontal: 16
    },
    iconChart: {
        position: 'absolute',
        fontSize: 24,
        color: lightColor,
        right: 40
    },
    iconArrow: {
        position: 'absolute',
        fontSize: 32,
        color: lightColor,
        right: 8
    },
    titleText: {
        fontSize: 24,
        color: lightColor
    },
    detailTextHeader: {
        fontSize: 20,
        color: lightColor
    },
    detailText: {
        fontSize: 20,
        color: lightColor
    },
    detailTextRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    bottomText: {
        fontSize: 20,
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
    cardMidView: {
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