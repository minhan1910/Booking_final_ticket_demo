import { quanLyRapServices } from "services/QuanLyRapServices";
import * as ActionTypes from './types/QuanLyRapType';
export const layDanhSachHeThongRapAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapServices.layDanhSachHeThongRap();
            if(result.status === 200) {
                dispatch({
                    type: ActionTypes.SET_HE_THONG_RAP_CHIEU,
                    heThongRapChieu: result.data.content,
                });
            }
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}

//Tuy viết bên này nhưng nội dung dispatch lên ở QuanLyPhim
export const layThongTinChiTietPhimAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapServices.layThongTinLichChieuPhim(id);

            // Lấy được dữ liệu từ api về reducer
            dispatch({ 
                type: ActionTypes.SET_CHI_TIET_PHIM,
                filmDetail: result.data.content,
            });

        } catch (error) {
            console.log(error);
        }
    }
}