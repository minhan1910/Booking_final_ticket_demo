import { ThongTinDatVe } from '_core/models/ThongTinDatVe';
import { baseService } from './baseServices';
export class QuanLyDatVeServices extends baseService {
    layChiTietPhongVe = (maLichChieu) => { // mã lich chiếu lấy từ url
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }

    // {
    //     "maLichChieu": 0,    
    //     "danhSachVe": [
    //       {
    //         "maGhe": 0,
    //         "giaVe": 0
    //       }
    //     ]
    //   }

    datVe = (thongTinDatVe = new ThongTinDatVe()) => {
        return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
    }

    layThongTinNguoiDung = () => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    }

    taoLichChieu = (thongTinLichChieu) => {
        return this.post(`/api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu);
    }

}

export const quanLyDatVeServices = new QuanLyDatVeServices();   
