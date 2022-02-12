import { history } from "App";
import { quanLyPhimServices } from "services/QuanLyPhimServices";
import * as ActionTypes from './types/QuanLyPhimType';

//Cho tham số tên phim để search
export const layDanhSachPhimAction = (tenPhim='') => {
    return async (dispatch) => {
        try {

            //này nhớ thêm validate cho axios
            const result = await quanLyPhimServices.layDanhSachPhim(tenPhim);

            dispatch({
                type: ActionTypes.SET_DANH_SACH_PHIM,
                arrFilm: result.data.content
            });
            
        } catch (error) {
            console.log('errors');
        }
    }
}


export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimServices.themPhimUploadHinh(formData);
            // console.log(result);
            alert('Thêm phim thành công');
            // kkhông cần dispatch lên luôn cũng được vì đang dùng post method ở đây
            // có thể phần edit sẽ hoàn thiện chức năng này hơn
            console.log(result.data.content);
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimServices.layThongTinPhim(maPhim);
            dispatch({
                type: ActionTypes.SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content,
            });
            
        } catch (error) {
            console.log(error.response?.data);
        }   
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimServices.capNhatPhimUpload(formData);
            alert('Cập nhật phim thành công');
            console.log('result', result.data.content);
            //Load lại cái danhSachPhim
            dispatch(layDanhSachPhimAction());
            history.push('/admin/films');
        } catch (error) {
            console.log(error);
        }
    } 
}

export const XoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimServices.xoaPhim(maPhim);
            console.log(result.data.content);
            alert('Xóa phim thành công');
            //Sau khi xóa load lại danh sách phim
            dispatch(layDanhSachPhimAction());
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}
