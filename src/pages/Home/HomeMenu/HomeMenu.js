import React, { Fragment } from "react";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment";
const { TabPane } = Tabs;

//Dùng PureComponent cho tối ưu vì do dispatch 2 lần phải render lại
//trên redux -> dùng pure
export default class HomeMenu extends React.PureComponent {
  state = {
    tabPosition: "left",
  };

  componentDidMount() {}

  renderHeThongRap() {
    return this.props.heThongRapChieu?.map((heThongRap, index) => {
      let { tabPosition } = this.state;
      return (
        <TabPane tab={<img src={heThongRap.logo} alt="123" className="rounded-full" width="50"/>} key={index}>
          {/* List Cụm Rạp */}
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane tab={
                    <div style={{width: '300px', display: 'flex'}}>
                      <img src={heThongRap.logo} alt="123" className="rounded-full" width="50"/> 
                      <div className="text-left ml-3">
                        {cumRap.tenCumRap}  
                        <p className="text-red-300 cursor-pointer">Chi tiết</p>
                      </div>
                    </div>
                  } 
                  key={index} 
                >
                  {/* Load Phim Tương ứng*/}
                  {cumRap.danhSachPhim?.slice(0, 6).map((phim, index) => {
                    return <Fragment key={phim.maPhim}>
                      <div className="my-5">
                        <div className="flex">
                          <img style={{width: '100px', height: '100px'}} src={phim.hinhAnh} alt={phim.tenPhim} width="50"
                            onError={(e) => {e.target.onerror = null; e.target.src="https://picsum.photos/75/75"}}
                          />
                          <div className="ml-3">
                            <p className="text-green-700 text-2xl mb-1">{phim.tenPhim}</p>
                            <p>{cumRap.diaChi}</p>

                            {/* Lịch chiếu phim */}
                            <div className="grid grid-cols-6 gap-5">
                              {phim.lstLichChieuTheoPhim?.slice(0, 12).map((lichChieu) => {
                                return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className="text-green-500 text-2xl" key={lichChieu.maLichChieu}>
                                  {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                </NavLink>
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr/>
                    </Fragment>
                  })}

                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  }

  render() {
    const { tabPosition } = this.state;
    return (
      <>
        <Tabs tabPosition={tabPosition}>
          {this.renderHeThongRap()}
        </Tabs>
      </>
    );
  }
}
