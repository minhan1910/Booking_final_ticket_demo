import * as ActionTypes from "Redux/actions/types/QuanLyDatVeType";
import {ThongTinLichChieu} from '_core/models/ThongTinPhongVe';
import _ from 'lodash';

const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [], //Danh sách ghế đang đặt cho realtime
    // danhSachGheKhachDat: [
    //     {maGhe: 51241},
    //     {maGhe: 51261},
    // ],
    tabActive: '1',
}

 const QuanLyDatVeReducer = (state= stateDefault, action) => {
    switch (action.type) {

        case ActionTypes.SET_CHI_TIET_PHONG_VE: 
            return {
                ...state,
                chiTietPhongVe: action.chiTietPhongVe,
            }

        // Cái DAT_VE này xử lý cho phần click vào GHẾ
        case ActionTypes.DAT_VE:
            //Cập nhập danh sách ghế đang nhập 
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];

            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);

            if(index !== -1) {
                //Ở đây có thể dùng splice và filter nên tối ưu hơn bằng cách dùng filter
                danhSachGheCapNhat =  danhSachGheCapNhat.filter((gheDD, indexGheDD) => indexGheDD !== index);
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon);
            }   

            return {
                ...state,
                danhSachGheDangDat: danhSachGheCapNhat,
            };

        case ActionTypes.DAT_VE_HOAN_TAT: 
            return {
                ...state,
            };
        
        case ActionTypes.CHUYEN_TAB:
            return {
                ...state,
                tabActive: '2',
            }

        // Chuyển ở checkout pages 
        case 'CHANGE_ACTIVE_TAB':
            return {
                ...state,
                tabActive: action.number,
            }

        default:
            return {...state}
    }
}

export default QuanLyDatVeReducer;