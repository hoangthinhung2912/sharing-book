import { AuthTypes } from '../../actions';

const INIT_STATE = {
    token: null,
    payload: null,
    appState: {
        loading: false,
        error: null,
    }
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case AuthTypes.REGISTER_PENDING:
            return {
                ...state,
                appState: {
                    ...state.appState,
                    loading: true,
                }
            }

        case AuthTypes.REGISTER_FAIL:
            return {
                ...state,
                appState: {
                    ...state.appState,
                    error: action.payload
                }
            }
    
        default:
            return state;
    }
}