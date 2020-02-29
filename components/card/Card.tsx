import React, { Component } from 'react';
import { Text, StyleSheet, FlatList, SectionList, SectionListData, ViewStyle } from 'react-native';
import { View } from 'react-native-animatable';
import { secondaryColor, mainColor, lightColor, lightSecondaryColor } from '../../screens/colors';
import Seperator from '../../components/seperator/Seperator';
import { Data, Dates } from '../../interfaces/Data';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Graph from '../../components/graph/Graph';
import moment from 'moment';
import { getDuration } from '../../utils/time/duration';
import { groupDates } from '../../utils/date/date';
import BackgroundTimer from 'react-native-background-timer';
import { setTimer, setData } from '../../redux/Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface Props {
    data: Data;
    timerActive: boolean;
    anyTimerActive: boolean;
    style?: ViewStyle;
    graphTitle?: string;
    graphStyle?: ViewStyle;
    index: number;
    Timer?: Array<boolean>;
    Data?: Array<Data>;
    setTimer: (a: Array<boolean>) => void;
    setData: (a: Array<Data>) => void;
}

interface State {
    graph: boolean;
    expanded: boolean;
    ctr: number;
    data: Dates | null;
}

export class Card extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            graph: false,
            expanded: false,
            ctr: 0,
            data: null,
        };
    }

    getTotal = () => {
        let total = 0;
        let durations = this.props.data.Durations.map((i) => i.endDate.getTime() - i.startDate.getTime());
        for (let i in durations) total += durations[i];
        return moment(new Date(total + new Date().getTimezoneOffset() * 60000)).format('HH:mm:ss');
    };

    getAvg = () => {
        let total = 0;
        let durations = this.props.data.Durations.map((i) => i.endDate.getTime() - i.startDate.getTime());
        for (let i in durations) total += durations[i] + new Date().getTimezoneOffset() * 60000;
        return moment(new Date(total / durations.length)).format('HH:mm:ss');
    };

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
                                        <Icon
                                            name="brightness-1"
                                            color={lightColor}
                                            style={{ paddingRight: 2 }}
                                            size={8}
                                        />
                                        <Text style={styles.detailText}>
                                            {moment(getDuration(item.startDate, item.endDate)).format('HH:mm:ss')}
                                        </Text>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            );
        } else {
            return (
                <View animation="fadeIn" duration={600} style={styles.cardMidView}>
                    <Graph style={this.props.graphStyle} data={this.props.data} />
                </View>
            );
        }
    };

    render() {
        if (!this.state.expanded) {
            return (
                <View style={{ ...styles.card, ...this.props.style, opacity: 1 }}>
                    <View style={styles.cardTopView}>
                        <Text style={styles.titleText}>{this.props.data.label}</Text>
                        {!this.props.anyTimerActive || this.props.timerActive ? (
                            <View style={{ position: 'absolute', right: 0, justifyContent: 'center' }}>
                                {!this.props.timerActive ? (
                                    <Icon
                                        style={styles.iconChart}
                                        name="play-arrow"
                                        onPress={async () => {
                                            let t = new Date().getTime() % 10;
                                            await AsyncStorage.setItem('timer', 'true');
                                            let Timer = this.props.Timer!.map((i, index) =>
                                                index === this.props.index ? true : false,
                                            );
                                            this.props.setTimer(Timer);
                                            let ctr = 0;
                                            let data: Dates = { startDate: new Date(), endDate: new Date() };
                                            console.log(data);
                                            BackgroundTimer.runBackgroundTimer(() => {
                                                ctr++;
                                                console.log(ctr);
                                                this.setState({ data });
                                            }, 1000);
                                        }}
                                    />
                                ) : (
                                    <Icon
                                        style={styles.iconChart}
                                        name="pause"
                                        onPress={async () => {
                                            await AsyncStorage.setItem('timer', 'false');
                                            let Timer = this.props.Timer!.map((i, index) => false);
                                            this.props.setTimer(Timer);
                                            let Data = this.props.Data!;
                                            for (let i = 0; i < Data.length; i++) {
                                                if (Data[i].label === this.props.data.label)
                                                    Data[i].Durations.push({
                                                        startDate: this.state.data!.startDate,
                                                        endDate: new Date(),
                                                    });
                                            }
                                            console.log(Data);
                                            this.props.setData(Data);
                                            BackgroundTimer.stopBackgroundTimer();
                                        }}
                                    />
                                )}
                            </View>
                        ) : (
                            <View />
                        )}

                        {this.state.expanded ? (
                            <Icon
                                style={styles.iconChart}
                                name="insert-chart"
                                onPress={() => this.setState({ graph: !this.state.graph })}
                            />
                        ) : (
                            <View />
                        )}
                        <Icon
                            style={styles.iconArrow}
                            name="arrow-drop-down"
                            onPress={() => this.setState({ expanded: !this.state.expanded })}
                        />
                    </View>
                    <Seperator />
                    {this.props.data.Durations.length === 0 ? (
                        <View style={styles.cardBottomView}>
                            <Text style={styles.bottomText}>Start</Text>
                        </View>
                    ) : (
                        <View style={styles.cardBottomView}>
                            <Text style={styles.bottomText}>Average: {this.getAvg()}</Text>
                            <Text style={styles.bottomText}>Total: {this.getTotal()}</Text>
                        </View>
                    )}
                </View>
            );
        } else {
            return (
                <View style={{ ...styles.card, ...this.props.style, opacity: 1 }}>
                    <View style={styles.cardTopView}>
                        <Text style={styles.titleText}>{this.props.data.label}</Text>
                        {this.state.expanded ? (
                            <Icon
                                style={styles.iconChart}
                                name="insert-chart"
                                onPress={() => this.setState({ graph: !this.state.graph })}
                            />
                        ) : (
                            <View />
                        )}
                        <Icon
                            style={styles.iconArrow}
                            name="arrow-drop-up"
                            onPress={() => this.setState({ expanded: !this.state.expanded })}
                        />
                    </View>
                    <Seperator />
                    {this.details()}
                    {this.props.data.Durations.length === 0 ? (
                        <View style={styles.cardBottomView}>
                            <Text style={styles.bottomText}>Start</Text>
                        </View>
                    ) : (
                        <View style={styles.cardBottomView}>
                            <Text style={styles.bottomText}>Average: {this.getAvg()}</Text>
                            <Text style={styles.bottomText}>Total: {this.getTotal()}</Text>
                        </View>
                    )}
                </View>
            );
        }
    }
}

interface StateRedux {
    Timer: Array<boolean>;
    Data: Array<Data>;
}

const mapStateToProps = (state: StateRedux) => {
    const { Timer, Data } = state;
    return { Timer, Data };
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ setTimer, setData }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Card);

const styles = StyleSheet.create({
    card: {
        paddingBottom: 12,
        paddingHorizontal: 16,
    },
    iconChart: {
        position: 'absolute',
        fontSize: 24,
        color: lightColor,
        right: 40,
    },
    iconArrow: {
        position: 'absolute',
        fontSize: 32,
        color: lightColor,
        right: 8,
    },
    titleText: {
        fontSize: 24,
        color: lightColor,
    },
    detailTextHeader: {
        fontSize: 20,
        color: lightColor,
    },
    detailText: {
        fontSize: 20,
        color: lightColor,
    },
    detailTextRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bottomText: {
        fontSize: 20,
        color: lightSecondaryColor,
    },
    cardTopView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: secondaryColor,
    },
    cardMidView: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: secondaryColor,
    },
    cardBottomView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: mainColor,
    },
});
