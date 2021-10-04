import { combineReducers } from 'redux';
import { reducer } from 'redux-form';
import imageReducer from './imageReducer';

export default combineReducers({
    form: reducer,
    image: imageReducer,
})