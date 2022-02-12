import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import MultipleRows from "components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "Redux/actions/QuanLyPhimActions";
import { layDanhSachHeThongRapAction } from "Redux/actions/QuanLyRapAction";
import HomeCarousel from "templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";

export default function Home() {
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);
  //nên để home r props xuống HomeMenu vì nắm hết cái trang chủ
  const {heThongRapChieu} = useSelector((state) => state.QuanLyRapReducer);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layDanhSachHeThongRapAction());
  }, []);

  return (
    <div className="">
      <HomeCarousel/>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-20 mx-auto">
          <MultipleRows arrFilm={arrFilm} />
        </div>
      </section>

      {/* Cái này dùng PureComponent vì khi nào dispatch r nó mới render
          Vì mình dispatch cái multipleRows trước nên nó render lại 1 lần
          r dispatch lần 2 cái của HomeMenu lại render tiếp
          ===> dùng Pure để khi nào dispatch của nó thì nó sẽ render lại
      */}
      <div className="container">
        <HomeMenu heThongRapChieu={heThongRapChieu}/>
      </div>
    </div>
  );
}
