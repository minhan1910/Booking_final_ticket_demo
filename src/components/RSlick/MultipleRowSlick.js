import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from "./MultipleRowSlick.module.css"; // dùng css như object
import "./MultipleRowSlick.module.css"; // dùng css như object
import Film_Flip from "../Film/Film_Flip";
import * as ActionTypes from "Redux/actions/types/QuanLyPhimType";
import { useDispatch, useSelector } from "react-redux";




//Custom lại theo của react-slick
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "4px", zIndex: "100" }}
      onClick={onClick}
    ></div>
  );
}

const MultipleRowSlick = (props) => {
  const {dangChieu, sapChieu} = useSelector(state => state.QuanLyPhimReducer);

  //cần xem lại logic khúc này lúc set trên redux này nọ
  let activeClassDC = dangChieu === false ? 'active_Film' : 'none_active_Film';
  let activeClassSC = sapChieu === false ? 'active_Film' : 'none_active_Film';

  const dispatch = useDispatch();

  const renderFilms = () => {
    //chỉ lấy ra 12 phim và show sẽ đỡ bị ảnh hưởng
    return props.arrFilm.slice(0, 12).map((item, index) => {
      // tại sao lại có styleSlick thì maybe đó là các import css r dùng selector trong đó
      //nếu import có alias thì nó thành object có thể styleSlick.width-item nhưng do có -
      // => dùng ['width-item'] cho nó ăn cái selecttor
      return (
        <div
          // className={
          //     `${styleSlick['width-item']}` //do có dấu - chính giữa
          //     // `${styleSlick.widthItem}`  //cách 2 cho them cái css đặt tên theo camelcase để .
          // }
          className="mt-2"
          key={index}
        >
          <Film_Flip item={item} />
        </div>
      );
    });
  };

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    rows: 2,
    // slidesPerRow: 2,
    //variableWidth: true là có thể set lại width cho nó
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="container">
      <button
        className={` ml-14 px-8 py-3 font-semibold rounded mr-2 bg-gray-800 text-white border ${styleSlick[activeClassDC]}`}
        onClick={() => {
          dispatch({
            type: ActionTypes.SET_PHIM_DANG_CHIEU,
          });
        }}
      >
        PHIM ĐANG CHIẾU
      </button>
      <button
        className={` px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border ${styleSlick[activeClassSC]}`}
        onClick={() => {
          dispatch({
            type: ActionTypes.SET_PHIM_SAP_CHIEU,
          });
        }}
      >
        PHIM SẮP CHIẾU
      </button>
      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRowSlick;
