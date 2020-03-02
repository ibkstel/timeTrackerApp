import React, { Component } from 'react';
import { Text, StyleSheet, FlatList, SectionList, SectionListData, ViewStyle } from 'react-native';
import { View } from 'react-native-animatable';
import { secondaryColor, mainColor, lightColor, lightSecondaryColor } from '../../screens/colors';
import Seperator from '../../components/seperator/Seperator';
import { Data, Dates, UserData } from '../../interfaces/Data';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Graph from '../../components/graph/Graph';
import moment from 'moment';
import { getDiff, getDuration } from '../../utils/time/duration';
import { groupDates } from '../../utils/date/date';
import BackgroundTimer from 'react-native-background-timer';
import { setTimer, setUserData } from '../../redux/Actions';
import { bindActionCreators } from 'redux';
import { connect, MapStateToProps } from 'react-redux';

interface Props {
    data: Data;
    timerId: number;
    style?: ViewStyle;
    graphTitle?: string;
    graphStyle?: ViewStyle;
    UserData?: UserData;
    setTimer: (a: Array<boolean>) => void;
    setUserData: (a: UserData) => void;
}

interface State {
    graph: boolean;
    expanded: boolean;
    active: boolean;
    activeDuration: number;
    intervalid: number;
}

export class Card extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            graph: false,
            expanded: false,
            active: false,
            activeDuration: 0,
            intervalid: 0
        };
    }


    getTotal = () => {
        let total = 0;
        let filtered = this.props.data.Durations.filter((i) => !i.active);
        let durations = filtered.map((i) => (i.endDate.getTime() - i.startDate.getTime()))
        for (let i in durations) total += durations[i];
        return moment(new Date(total + new Date().getTimezoneOffset() * 60000)).format('HH:mm:ss');
    };

    getAvg = () => {
        let total = 0;
        let filtered = this.props.data.Durations.filter((i) => !i.active)
        let durations = filtered.map((i) => (i.endDate.getTime() - i.startDate.getTime()))
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

    getActive = () => {
        let Durations = this.props.data.Durations;
        for (let i = 0; i < Durations.length; i++) {
            if (Durations[i].active) {
                return Durations[i];
            }
        }
    }

    printDuration = () => {
        if (this.getActive() !== undefined) {
            this.setState({ active: true, activeDuration: getDuration(this.getActive()!.startDate, new Date(new Date().getTime() + new Date().getTimezoneOffset() + 1000)) }, () => {
                let intervalid = setInterval(() => {
                    if (this.getActive() !== undefined)
                        this.setState({ intervalid: intervalid, activeDuration: getDuration(this.getActive()!.startDate, new Date(new Date().getTime() + new Date().getTimezoneOffset() + 1000)) });
                }, 1000);
            });
        }
    }


    componentDidMount() {
        if (this.state.active)
            this.printDuration();
    }


    checkIfActiveExists = (data: Data) => {
        for (let i in data.Durations) {
            if (data.Durations[i].active) {
                return true;
            }
            return false;
        }
    }

    componentDidUpdate(props: Props) {
        if (this.checkIfActiveExists(this.props.data) && this.state.active !== true)
            this.printDuration();
    }

    render() {
        if (!this.state.expanded) {
            return (
                <View style={{ ...styles.card, ...this.props.style, opacity: 1 }}>
                    <View style={styles.cardTopView}>
                        <Text style={styles.titleText}>{this.props.data?.label}</Text>
                        <View style={{ position: 'absolute', right: 0, justifyContent: 'center' }}>
                            {
                                !this.state.active ?
                                    <Icon
                                        style={styles.iconChart}
                                        name="play-arrow"
                                        onPress={async () => {
                                            let { UserData, data } = this.props;
                                            UserData!.Data.forEach((i) => {
                                                if (i.label === data.label) {
                                                    data.Durations.push({ active: true, startDate: new Date(), id: UserData!.lastid, endDate: new Date(0) });
                                                }
                                            });
                                            UserData!.lastid++;
                                            this.props.setUserData(UserData!);
                                            await AsyncStorage.setItem('UserData', JSON.stringify(UserData));
                                            this.setState({ active: true }, () => this.printDuration());
                                        }}
                                    />
                                    :
                                    <Icon
                                        style={styles.iconChart}
                                        name="pause"
                                        onPress={async () => {
                                            if (this.state.intervalid !== 0)
                                                clearInterval(this.state.intervalid);
                                            let { UserData, data } = this.props;
                                            UserData!.Data.forEach((i) => {
                                                if (i.label === data.label) {
                                                    data.Durations.forEach((i) => {
                                                        if (i.active) {
                                                            if (getDiff(i.startDate, new Date()) < 1000) {
                                                                data.Durations.splice(data.Durations.indexOf(i));
                                                            }
                                                            else {
                                                                i.endDate = new Date();
                                                                i.active = false;
                                                            }
                                                        }
                                                    });
                                                    data.Durations = data.Durations.sort((a, b) => b.id - a.id);
                                                }
                                            });
                                            this.props.setUserData(UserData!);
                                            await AsyncStorage.setItem('UserData', JSON.stringify(UserData));
                                            this.setState({ active: false });
                                        }}
                                    />
                            }
                        </View>
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
                    {this.state.active ?
                        <View>
                            <View animation="fadeIn" duration={600} style={styles.cardMidView}>
                                <Text>{moment(new Date(this.state.activeDuration)).format('HH:mm:ss')}</Text>
                            </View>
                            <Seperator />
                        </View>
                        :
                        <View />
                    }
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
                    {this.state.active ?
                        <View>
                            <View animation="fadeIn" duration={600} style={styles.cardMidView}>
                                <Text>{moment(new Date(this.state.activeDuration)).format('HH:mm:ss')}</Text>
                            </View>
                            <Seperator />
                        </View>
                        :
                        <View />
                    }
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
    UserData: UserData;
}

const mapStateToProps = (state: StateRedux) => {
    const { Timer, UserData } = state;
    return { Timer, UserData };
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ setTimer, setUserData }, dispatch);

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
