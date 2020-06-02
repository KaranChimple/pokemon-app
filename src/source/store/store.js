import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from '../reducers';
import ReduxThunk from 'redux-thunk';

let store = compose(applyMiddleware(ReduxThunk))(createStore)(rootReducer);

export default store;
