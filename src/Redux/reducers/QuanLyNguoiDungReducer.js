import { TOKEN } from 'util/settings/config';
import { USER_LOGIN } from 'util/settings/config';
import * as ActionTypes from '../actions/types/QuanLyNguoiDungType';

let hasUser = {};
if(localStorage.getItem(USER_LOGIN)) {  
    hasUser = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: hasUser,
    // Nên tạo ra đối tượng class r new ra như các bài trước
    thongTinNguoiDung: {},
}


const QuanLyNguoiDungReducer = (state= stateDefault, action) => {
    switch (action.type) {

        case ActionTypes.DANG_NHAP_ACTION: 
            const { thongTinDangNhap } = action;
            console.log(thongTinDangNhap)
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN, JSON.stringify(thongTinDangNhap.accessToken));
            return {
                ...state,
                userLogin: thongTinDangNhap,
            }
        
        case ActionTypes.SET_THONG_TIN_NGUOI_DUNG: 
            return {
                ...state,
                thongTinNguoiDung: action.thongTinNguoiDung,
            }

        default:
            return {...state}
    }
}

export default QuanLyNguoiDungReducer;