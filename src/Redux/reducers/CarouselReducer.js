import * as ActionTypes from "Redux/actions/types/CarouselType";

const stateDefault = {
  arrImg: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
};

const CarouselReducer = (state = stateDefault, action) => {
  switch (action.type) {

    case ActionTypes.SET_CAROUSEL: 
        return {
            ...state,
            arrImg: action.arrImg,
        };

    default:
      return { ...state };
  }
};

export default CarouselReducer;
