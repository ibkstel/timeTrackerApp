import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../AppNav';
import { lightColor } from './colors';
import { UserData, Data } from '../interfaces/Data';
import { setTimer, setUserData } from '../redux/Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import { categories } from '../categories/categories';
import Seperator from '../components/seperator/Seperator';
import { Category, SubCategory } from '../interfaces/Category';

interface Props extends StateRedux {
    navigation: StackNavigationProp<RootStackParamList>;
    setTimer: (a: Array<boolean>) => void;
    setUserData: (a: UserData) => void;
}

interface State {
    selected: boolean;
    selectedItem: Category | null;
    selectedSub: boolean;
    selectedSubItem: SubCategory | null;
}

export class AddEntryScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selected: false,
            selectedSub: false,
            selectedItem: null,
            selectedSubItem: null
        };
    }

    render() {
        return (
            <ScrollView>
                <View style={{ marginTop: 12 }}>
                    <View style={{ alignItems: 'center', paddingBottom: 16 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Category</Text>
                        <Dropdown
                            containerStyle={{ width: '80%' }}
                            data={categories.map((i) => ({ value: i.name }))}
                            label="Categories"
                            onChangeText={(text, index) => {
                                let item = null;
                                for (let i in categories) {
                                    if (categories[i].name === text) {
                                        item = categories[i];
                                    }
                                }
                                this.setState({ selected: false, selectedItem: item, selectedSubItem: null }, () =>
                                    this.setState({ selected: true }),
                                );
                            }}
                        />
                    </View>
                    <Seperator />
                    {this.state.selected ? (
                        <View style={{ alignItems: 'center', paddingBottom: 16, marginTop: 16 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Subcategory</Text>
                            <Dropdown
                                containerStyle={{ width: '80%' }}
                                data={this.state.selectedItem!.sublabel.map((i) => ({ value: i.subname }))}
                                label="Subcategories"
                                onChangeText={(text, index) => {
                                    let item = null;
                                    for (let i in this.state.selectedItem!.sublabel) {
                                        if (this.state.selectedItem!.sublabel[i].subname === text) {
                                            item = this.state.selectedItem!.sublabel[i];
                                        }
                                    }
                                    this.setState({ selected: true, selectedSubItem: item });
                                }}
                            />
                        </View>
                    ) : (
                        <View />
                    )}
                </View>
            </ScrollView>
        );
    }
}

interface StateRedux {
    UserData: UserData;
    Timer: Array<boolean>;
}

const mapStateToProps = (state: StateRedux) => {
    const { UserData, Timer } = state;
    return { UserData, Timer };
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ setTimer, setUserData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddEntryScreen);

const styles = StyleSheet.create({
    menuView: {
        marginLeft: 16,
    },
    menuIcon: {
        fontSize: 28,
        color: lightColor,
    },
});
