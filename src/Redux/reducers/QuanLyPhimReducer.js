import { SET_CHI_TIET_PHIM } from 'Redux/actions/types/QuanLyRapType';
import * as ActionTypes from '../actions/types/QuanLyPhimType';

const stateDefault = {
    arrFilm: [],
    arrFilmDefault: [],
    // Coi lại logic khúc này 
    dangChieu: true,
    sapChieu: true,
    filmDetail: {},
    thongTinPhim: {},
}

const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case ActionTypes.SET_DANH_SACH_PHIM:
            return {
                ...state,
                arrFilm: action.arrFilm,
                arrFilmDefault: action.arrFilm,
            }
        
        case ActionTypes.SET_PHIM_DANG_CHIEU:
            return {
                ...state,
                dangChieu: !state.dangChieu,
                // Query từ thằng default sang arrFilm để render ra 
                //vì filter nó tham chiếu tạo ra cái mảng mới => đè lên lại cái arrFilm
                arrFilm: state.arrFilmDefault.filter(film => film.dangChieu === state.dangChieu),
            }
        case ActionTypes.SET_PHIM_SAP_CHIEU:
            return {
                ...state,
                sapChieu: !state.sapChieu,
                // Query từ thằng default sang arrFilm để render ra 
                //vì filter nó tham chiếu tạo ra cái mảng mới => đè lên lại cái arrFilm
                arrFilm: state.arrFilmDefault.filter(film => film.sapChieu === state.sapChieu),
            }
        
        case SET_CHI_TIET_PHIM: 
            return {
                ...state,
                filmDetail: action.filmDetail,
            }

        case ActionTypes.SET_THONG_TIN_PHIM: 
            return {
                ...state,
                thongTinPhim: action.thongTinPhim,
            }

        default:
            return {...state};
    }
}

export default QuanLyPhimReducer;

