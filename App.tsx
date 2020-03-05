import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppNav from './AppNav';
import { store } from './redux/Reducers';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { statusBarColor } from './screens/colors';

export class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <StatusBar backgroundColor={statusBarColor} />
                <AppNav />
            </Provider>
        );
    }
}

export default App;
