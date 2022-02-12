import { quanLyDatVeServices } from "services/QuanLyDatVeService";
import {ThongTinDatVe} from '_core/models/ThongTinDatVe';
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import * as ActionTypes from './types/QuanLyDatVeType';

export const layChiTietPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeServices.layChiTietPhongVe(maLichChieu);
            
            if(result.status === 200) {
                dispatch({
                    type: ActionTypes.SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                });
            }

        } catch (error) {
            console.log('error',error.response?.data);
        }
    }
}

// Này cho nút thanh toán chứ ko phải chọn ghế
export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)

            const result = await quanLyDatVeServices.datVe(thongTinDatVe);
            console.log(result.data.content);
            //Đặt vé thành công gọi lại api load lại phòng vé
            //Ở đây bị bất đòng bộ 
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            await dispatch({
                type: 'DAT_VE_HOAN_TAT',
            });
            dispatch(hideLoadingAction)
            await dispatch({
                type: 'CHUYEN_TAB',
            });
        } catch (error) {
            dispatch(hideLoadingAction)
            console.log(error.response?.data);           
        }
    }    
}


//Chức năng này lỗi rùi mốt làm backend thì làm thêm cái realtime cho nó

// export const datGheAction = (ghe, maLichChieu) => {
//     //thunk nó còn cái getState do ko có useSelector ở đây
//     //lấy các state khác
//     return async (dispatch, getState) => {

//         //Đưa thông tin ghế lên reducer
//         await dispatch({
//             type: 'DAT_GHE',
//             gheDuocChon: ghe,
//         });

//         //Call api về backend bằng cái hub 
//         //code bên backend quy định
//         // Xài như useSelector
//         let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
//         let taiKhoan           = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;

//         console.log('danhSachGheDangDat', danhSachGheDangDat);
//         console.log('taiKhoan', taiKhoan);
//         console.log('maLichChieu', maLichChieu);
//     }
// }
