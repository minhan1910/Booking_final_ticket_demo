//Làm cho các file kkhác như vậy
//Dùng OOP has a relationship
export class ThongTinLichChieu {
    thongTinPhim = new ThongTinPhim();
    danhSachGhe  = [];
}

//Nên chia ra các module khác này để đây cho dễ
//Mục đích của cái này để khi mới vào nó có các thuộc tính mặc định
//để khi component render lần đầu sẽ ko bị lỗi / 
//cách lười hơn dùng ?. ở các obj .

//Dùng y như của backend trả lên => tạo class

// diaChi: "L4-Vincom Plaza, 50 Lê Văn Việt, Q.9"
// gioChieu: "03:03"
// hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/aladinvfd_gp09.jpg"
// maLichChieu: 42864
// ngayChieu: "01/03/2021"
// tenCumRap: "BHD Star Cineplex - Vincom Lê Văn Việt"
// tenPhim: "Harry Potter"
// tenRap: "Rạp 2"


export class ThongTinPhim {
    maLichChieu = '';
    tenCumRap   = '';
    tenRap      = '';
    diaChi      = '';
    tenPhim     = '';
    hinhAnh     = '';
    ngayChieu   = '';
    gioChieu    = '';
}



//Ghe lấy từ backend
// daDat: false
// giaVe: 100000
// loaiGhe: "Thuong"
// maGhe: 52361
// maRap: 482
// stt: "01"
// taiKhoanNguoiDat: null
// tenGhe: "01"

export class Ghe {
    maGhe            = '';
    tenGhe           = '';
    maRap            = '';
    loaiGhe          = '';
    stt              = '';
    giaVe            = '';
    daDat            = '';
    taiKhoanNguoiDat = '';
}