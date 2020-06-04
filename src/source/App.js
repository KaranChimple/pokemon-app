import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import MainScreen from './screens/MainScreen';

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <MainScreen />
            </Provider>
        )
    }
}

export default App;
