import axios from "axios";
import * as ActionTypes from "Redux/actions/types/CarouselType";
import { quanLyPhimServices } from "services/QuanLyPhimServices";

//lý giải tại sao 1 hàm trả về 1 hàm ở đây
//logic là dùng cái hàm bên ngoài để nhận các tham số thông 
//qua cơ chế closure nếu không nhận tham số thì ko cần
//hàm bên ngoài mà viết thẳng nhgưng để thống nhất thì viết như
//bên dưới rồi gọi nó lập tức trả về function để redux-thunk dispatch
//lên redux  --- bên kia View giải thích lúc gọi hàm có tham số và ko

export const getCarouselAction = (thamSoNeuCo) => {
    return async dispatch => {
        try {
            //KO nên gọi API trong action
            //=> khó nắm trong nghiệp vụ backend
            const result = await quanLyPhimServices.layDanhSachBanner();
            
            //chỗ này dispatch lên redux 
            dispatch({
                type: ActionTypes.SET_CAROUSEL, 
                arrImg: result.data.content
            });
        } catch (error) {
            console.log(error);
        }
    }
}

