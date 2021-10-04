import ACTIONS from '../actions/constants';
import _ from 'lodash';


const INITIAL_STATE = {}
// eslint-disable-next-line
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_ALL_IMAGE: ;
            return { ...state, ..._.map(action.payload) }
        case ACTIONS.CREATE_IMAGE:
            return { ...state, [action.payload.id]: action.payload };
        case ACTIONS.FETCH_IMAGE:
            return { ...state, [action.payload.id]: action.payload };
        case ACTIONS.UPDATE_IMAGE:
            return { ...state, [action.payload.id]: action.payload };
        case ACTIONS.DELETE_IMAGE:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}