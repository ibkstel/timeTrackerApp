import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppNav from './AppNav';
import { store } from './redux/Reducers';
import 'react-native-gesture-handler';

export class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppNav />
            </Provider>
        );
    }
}

export default App;
