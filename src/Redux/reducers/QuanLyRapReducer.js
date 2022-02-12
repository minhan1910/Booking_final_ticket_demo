import * as ActionTypes from "Redux/actions/types/QuanLyRapType";

const stateDefault = {
  heThongRapChieu: [],
};

const QuanLyRapReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case ActionTypes.SET_HE_THONG_RAP_CHIEU:
      return { 
        ...state,
        heThongRapChieu: action.heThongRapChieu,
      };

    default:
      return { ...state };
  }
};

export default QuanLyRapReducer;
