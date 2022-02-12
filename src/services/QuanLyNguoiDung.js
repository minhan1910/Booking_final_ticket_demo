import { baseService } from './baseServices';

export class QuanLyNguoiDungService extends baseService {
    dangNhap = (thongTinDangNhap) => { //{taiKhoan: '', matKhau: ''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();   