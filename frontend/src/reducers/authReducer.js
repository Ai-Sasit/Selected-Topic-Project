import ACTIONS from '../actions/constants';

const INITIAL_STATE = {
    isSignedIn: null,
    profile: null
}

// eslint-disable-next-line
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIONS.SIGN_IN:
            return { ...state, isSignedIn: true, profile: action.payload }
        case ACTIONS.SIGN_OUT:
            return { ...state, isSignedIn: false, profile: null }
        default:
            return state;
    }
}