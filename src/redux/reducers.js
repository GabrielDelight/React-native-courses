import {SET_USER_AGE, SET_USER_NAME, ICREASE_AGE} from './actions';

const initialState = {
    name: '',
    age: 0,
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_NAME:
            return { ...state, name: action.payload };
        case SET_USER_AGE:
            return { ...state, age: action.payload };
        case ICREASE_AGE:
            return { ...state, age: state.age + 1 };
       
        default:
            return state;
    }
}

export default userReducer;