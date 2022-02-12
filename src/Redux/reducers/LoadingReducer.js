import * as ActionTypes from "Redux/actions/types/LoadingType";
const stateDefault = {
    isLoading: false,
}

const LoadingReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case ActionTypes.DISPLAY_LOADING:
            return {
                ...state,
                isLoading: true,
            };

        case ActionTypes.HIDE_LOADING:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return {...state};
    }
}

export default LoadingReducer;