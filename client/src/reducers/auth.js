import { AUTH, LOGOUT, LOGIN_FAIL } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

            return { ...state, authData: action?.data, error: "" };

        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null, error: "" };

        case LOGIN_FAIL:
            return { error: action?.payload }

        default:
            return state;
    }
}

export default authReducer;