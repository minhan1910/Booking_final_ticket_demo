import React, { useEffect } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import 'assets/circle.scss';
import { Tabs, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinChiTietPhimAction } from 'Redux/actions/QuanLyRapAction';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

const { TabPane } = Tabs;
export default function Detail(props) {

    const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail);
    console.log({filmDetail});
    const dispatch = useDispatch();
    useEffect(() => {
        //Lấy thông tin param từ url
        let {id} = props.match.params;

        dispatch(layThongTinChiTietPhimAction(id));
    }, []);

    return (
        <div style={{backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundPosition:'center', backgroundSize: '100%', minHeight:'100vh'}}>
            <CustomCard
                style={{minHeight:'100vh', paddingTop: '150px'}}
                effectColor="#C780FF" // required
                color="#14AEFF" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-3 text-white">
                            <img className="col-span-1" src={filmDetail.hinhAnh} alt="hinhAnh" style={{ width: '100%', height: 300 }} />
                            <div className="col-span-2 flex items-center ml-3" >
                                <div>
                                    <p className="text-sm">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                    <p className="text-4xl leading-2">{filmDetail.tenPhim}</p>
                                    <p>{filmDetail.moTa?.slice(0, 150)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4">
                        <h1 style={{ marginLeft: '15%', color: 'yellow', fontWeight: 'bold', fontSize: 15 }}>Đánh giá</h1>
                        <h1 style={{ marginLeft: '5%' }} className="text-green-400 text-2xl">
                            <Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: '#78ed78', fontSize: 30 }} />
                        </h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                            <span>{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div  className="mt-10 ml-60 w-2/3 bg-white p-5 container">
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Lịch Chiếu" key="1" style={{minHeight: 300}}>
                            {/* w-2/3 bg-white p-5 => chuẩn luôn ghi nhớ note lại :)) */}
                            <div>
                                <Tabs tabPosition={'left'}>
                                    {
                                        // Đi vào từng hệ thống rạp như BHD, CDV,... 
                                        filmDetail.heThongRapChieu?.map((htr, index) => {
                                            return <TabPane 
                                            tab={
                                                <div className="flex flex-row items-center justify-center">
                                                    <img src={htr.logo} alt={htr.logo} width="50" className="rounded-full" />
                                                    <p className="text-center ml-2 mt-5" >{htr.tenHeThongRap}</p>
                                                </div>
                                            } key={index}>
                                                {/* Cụm Rạp Chiếu: địa điểm */}
                                                {htr.cumRapChieu?.map((cumRap) => {
                                                    return <div className="mt-5" key={cumRap.maHeThongRap}>
                                                                <div className="flex flex-row">
                                                                    <img style={{width: 60, height: 60}} src={cumRap.hinhAnh} alt={cumRap.tenCumRap}/>
                                                                    <div className="ml-2">
                                                                        <p style={{fontSize: 20, fontWeight: 'bold', lineHeight: 1}}>{cumRap.tenCumRap}</p>
                                                                        <p className="text-gray-400">{cumRap.tenCumRap}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="thong-tin-lich-chieu grid grid-cols-4">
                                                                    {cumRap.lichChieuPhim?.slice(0, 10).map((lichChieu) => {
                                                                        return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className="col-span-1 text-green-800">
                                                                            {moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
                                                                        </NavLink>
                                                                    })}
                                                                </div>
                                                            </div>
                                                })}
                                            </TabPane>
                                        })
                                    }
                                </Tabs>
                            </div>
                        </TabPane>
                        <TabPane tab="Thông Tin" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Đánh Giá" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </div>
               

            </CustomCard>
        </div>
    )
}
