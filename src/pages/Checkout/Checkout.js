import React, {useEffect, Fragment} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { layChiTietPhongVeAction, datVeAction } from 'Redux/actions/QuanLyDatVeActions';
import {CheckOutlined, CloseOutlined, HomeOutlined, SmileOutlined, UserOutlined} from '@ant-design/icons';
//này dùng .module sẽ có thêm vài cái nó tự thêm
import style from './Checkout.module.css';
//Này ảnh hưởng toàn bộ component
import './Checkout.css';
import _ from 'lodash';
import { ThongTinDatVe } from '_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from 'Redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import {history} from '../../App';
import {USER_LOGIN, TOKEN} from "util/settings/config";
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;

function Checkout(props) {
    //vào đây được thì đã đăng nhập r
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();
    console.log('userLogin ', userLogin);
    useEffect(() => {
        //Nhớ để [] để thành DidMount chứ nó update hoài sẽ gây ra performance chậm
        //gọi hàm tạo ra 1 async function
        const action = layChiTietPhongVeAction(props.match.params.id);
        //này của redux-thunk
        dispatch(action);

        // Hàm này tự động chạy
        // Load danh sách vé đang đặt từ server về
        // connection.on('loadDanhSachGheDaDat', (dsGheKhachDat) => {
        //     console.log('danhSachGheKhachDat', dsGheKhachDat);
        // })
    }, []);
    
    const {thongTinPhim, danhSachGhe} = chiTietPhongVe;
    // console.log({chiTietPhongVe});

    const renderSeats = () => {
        // Do có lớp đối tượng rồi nên nó ko bị lỗi ở redux ở {}
        // nên đỡ phải dùng ?. hơn mà bù lại người đến sau sẽ ko biết
        //được các thuộc tính của danhSachGhe như thế nào
        return danhSachGhe.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            //Check của api gốc xem có cái nào đặt chưa
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            
            //Kiểm tra xem từng render xem có phải ghế  khách đặt hay không
            // let classGheKhachDat = '';
            // let indexGheKD =  danhSachGheKhachDat.findIndex((gheKD) => gheKD.maGhe === ghe.maGhe);
            // if(indexGheKD !== -1) {
            //     classGheKhachDat = 'gheKhachDat';
            // }


            let classGheDaDuocDat = '';
            if(userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }

            //Check khi click vào ghế
            //nếu có ghế đang đặt thì thêm cái classGheDangDatVao
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            if(indexGheDD !== -1) {
                classGheDaDat = 'gheDangDat';
            }
 
            return <Fragment key={ghe.maGhe}>
                 <button onClick={() => {
                    //  ============================= ĐANG LỖI =============================
                    //clip đặt vé P9 -7.26p
                    //  const action = datGheAction(ghe, props.match.params.id);
                    //  dispatch(action);
                    dispatch({
                        type: 'DAT_VE',
                        gheDuocChon: ghe,
                    })
                 }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDaDuocDat} text-center`} >

                    {ghe.daDat ? classGheDaDuocDat !== '' ? <UserOutlined style={{lineHeight: '35px', fontWeight: 'bold'}}/>  : <CloseOutlined style={{lineHeight: '35px', fontWeight: 'bold'}} />  : ghe.stt}
                </button>
                {(index + 1) % 16 === 0 ? <br/> : ''} 
            </Fragment>
        });
    }

    return (
        <div className="min-h-screen mt-2">
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col justify-center items-center mt-5">
                        <div className="bg-black" style={{width: '90%', height: '15px'}}></div>
                        <div className={`${style['trapezoid']} text-center`}>
                            <h3 className="mt-3 text-black">Màn hình</h3>
                        </div>
                        <div>
                            {renderSeats()}
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <table className="divide-y divide-gray-200 w-2/3">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế đã đặt</th>
                                    <th>Ghế mình đặt</th>
                                    <th>Ghế khách đang đặt</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="text-center">
                                    <td><button className="ghe text-center"> <CheckOutlined style={{lineHeight: '35px', fontWeight: 'bold'}} /> </button></td>
                                    <td><button className="ghe gheDangDat text-center"> <CheckOutlined style={{lineHeight: '35px', fontWeight: 'bold'}} /> </button></td>
                                    <td><button className="ghe gheVip text-center"> <CheckOutlined style={{lineHeight: '35px', fontWeight: 'bold'}} /> </button></td>
                                    <td><button className="ghe gheDaDat text-center"> <CloseOutlined style={{lineHeight: '35px', fontWeight: 'bold'}} /> </button></td>
                                    <td><button className="ghe gheDaDuocDat text-center"> <UserOutlined style={{lineHeight: '35px', fontWeight: 'bold'}} /> </button></td>
                                    <td><button className="ghe gheKhachDat text-center"> <SmileOutlined style={{lineHeight: '35px', fontWeight: 'bold'}} /> </button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>



                <div className="col-span-3">
                    <h3 className="text-green-400 text-center text-4xl">
                        {danhSachGheDangDat.reduce((tongTien, ghe) => {
                            return tongTien += ghe.giaVe;
                        }, 0).toLocaleString()} đ</h3>
                    <hr />
                    <h3 className="tetx-xl">{thongTinPhim.tenPhim}</h3>
                    <p>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
                    <p>Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                    <hr />
                    <div className="flex flex-row my-2">
                        <div className="w-3/4">
                            <span className="text-red-400 text-lg">Ghế</span>
                            {/* Này nên cải tiến thêm cho đẹp */}
                            {_.sortBy(danhSachGheDangDat, ['maGhe']).map((gheDD, index) => {
                                return <span key={index} className="text-green-500 text-xl ml-2">
                                    {gheDD.stt}
                                </span>
                            })}
                        </div>
                        <div className="text-right">
                            <span className="text-green-800 text-lg">
                                {danhSachGheDangDat.reduce((tongTien, ghe) => {
                                    return tongTien += ghe.giaVe;
                                }, 0).toLocaleString()} đ
                            </span>
                        </div>
                    </div>

                    <hr/>

                    <div className="my-5">
                        <i>Email</i> <br />
                        {userLogin.email}
                    </div>

                    <hr />

                    <div className="my-5">
                        <i>Phone</i> <br />
                        {userLogin.soDT}
                    </div>

                    <hr />

                    <div className="mb-0 flex flex-col justify-end items-center" onClick={() => {
                        const thongTinDatVe = new ThongTinDatVe();
                        thongTinDatVe.maLichChieu = props.match.params.id;
                        thongTinDatVe.danhSachVe  = danhSachGheDangDat;

                        //Khác cái type DAT_VE cái này cho thanh toán
                        dispatch(datVeAction(thongTinDatVe));
                    }}>
                        <div className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer">
                            {/* <button> <span> </span></button> dùng vậy thì phải có span xong bỏ css button ms đc */}
                            ĐẶT VÉ  
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}


// Có thể dùng nhiều component trong 1 file theo cách này
//style mấy a Ấn Độ hay viết :)))
export default function CheckoutTab(props) {
    const dispatch = useDispatch();
    const {tabActive} = useSelector(state => state.QuanLyDatVeReducer);
    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        // Khi mà qua trang khác sẽ unmount
        //nó sẽ trả ra trang số 1 chứ ko ở cái ngôi nhà
        return () => {
            // Set nó lại trang số 1 chứ ko phải nằm ở ngôi nhà do bấm vào nó
            dispatch({
                type: 'CHANGE_ACTIVE_TAB',
                number: '1',
            })
        }
    }, [])

    const operations = <Fragment>
        {!_.isEmpty(userLogin) ?
            <Fragment>
                <button 
                    style={{width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                    className="ml-5 p-2 rounded-full bg-red-200"
                    onClick={() => {
                        history.push('/profile');
                    }} 
                >
                    Hello {userLogin.taiKhoan.substr(0, 1)}
                </button>

                <button onClick={() => {
                    localStorage.removeItem(USER_LOGIN);
                    localStorage.removeItem(TOKEN);
                    history.push('/home');
                    window.location.reload();
                }} className="text-blue-800">Đăng Xuất</button>
            </Fragment> : ''
        }
    </Fragment>;

    return <div className="p-5">
        <Tabs  tabBarExtraContent={operations}  onChange={(key) => {
            // Ko viết callback bênn goài được vì ko sử dung hook dược
            dispatch({
                type: 'CHANGE_ACTIVE_TAB',
                number: key,
            })
        }} defaultActiveKey="1" activeKey={tabActive}>
            <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
                {/* Nhớ truyền props vào để có props params */}
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
            <TabPane tab={
                <div className="text-center">
                    <NavLink  style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 15, fontSize: 25}} to="/home"> <HomeOutlined /> </NavLink>
                </div>
            } key="3">
                
            </TabPane>
        </Tabs>
    </div>
}


function KetQuaDatVe(props) {
    // Có thể có thêm ảnh ng dùng, rồi nut back về home
    const dispatch = useDispatch();
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const {thongTinNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer);
    
    // console.log('thongTinNguoiDung', thongTinNguoiDung);

    useEffect(() => {
        const action = layThongTinNguoiDungAction();
        dispatch(action);
    }, [])

    const renderTickKetItem = () => {
        // console.log(thongTinNguoiDung.thongTinDatVe);
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            // lấy ra phân tử đầu tiên trong mảng nữa
            const seats = _.first(ticket.danhSachGhe);

            return  <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                                <p className="text-gray-500">
                                    Giờ Chiếu: {moment(ticket.ngayDat).format('hh:mm A')} - Ngày Chiếu: {moment(ticket.ngayDat).format('DD-MM-YYYY')}
                                </p>
                                <p>Địa điểm: {seats.tenHeThongRap}</p>
                                <p>
                                    Tên rạp: {seats.tenRap} - Ghế {ticket.danhSachGhe.map((ghe, index) => {
                                        return <span key={index}>{`[${ghe.tenGhe}] `} </span>
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
        });
    }

    return <div className="p-5">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">Lịch sử đặt vé khách hàng</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin và có thời gian vui vẻ bạn nhé !</p>
                    </div>
                    <div className="flex flex-wrap -m-2">
                        {renderTickKetItem()}   
                    </div>
                </div>
            </section>

    </div>
}