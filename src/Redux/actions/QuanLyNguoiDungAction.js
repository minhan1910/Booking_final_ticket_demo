import { quanLyNguoiDungService } from "services/QuanLyNguoiDung";
import { quanLyDatVeServices } from "services/QuanLyDatVeService";
import * as ActionTypes from './types/QuanLyNguoiDungType';
import {history} from "../../App";
export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            console.log('result', result);

            //Mốt quản lý các tham số 200 luôn
            //nhữ export ra tên Succcess = 200 ^^
            if(result.status === 200) {
                dispatch({
                    type: ActionTypes.DANG_NHAP_ACTION, 
                    thongTinDangNhap: result.data.content,
                });

                //Chuyển hướng về trnag trước đó
                history.goBack();
            }
        } catch (error) {
            console.log(error.response.data);
        }

    }
}

export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeServices.layThongTinNguoiDung();
            

            //Mốt quản lý các tham số 200 luôn
            //nhữ export ra tên Succcess = 200 ^^
            if(result.status === 200) {
                dispatch({
                    type: ActionTypes.SET_THONG_TIN_NGUOI_DUNG, 
                    thongTinNguoiDung: result.data.content,
                });
            }

            console.log('result', result);
        } catch (error) {
            console.log(error.response?.data);
        }

    }
}