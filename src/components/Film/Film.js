import React from "react";
import { NavLink } from "react-router-dom";

export default function Film(props) {


  const {phim} = props;




  return (
    //chỉnh lại cái w-full ở đây để nó ăn theo cái div
    //bên ngoài với className = width-item khi set bên file css
    <div className="p-4 lg:w-full">
      <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-4 rounded-lg overflow-hidden text-center relative">
        {/* Cách fix hình trả về xấu */}
        <div
          style={{backgroundImage: `url(${phim.hinhAnh}), url(https://picsum.photos/300)`, backgroundPosition: 'center', backgroundSize: '100%, 100%'}}
        >
          <img className="opacity-0 w-full" style={{height:'300px'}} src={phim.hinhAnh} alt={phim.tenPhim} />
        </div>

        <h1 className="title-font sm:text-1xl text-xl font-medium text-gray-900 mb-3 h-16">
          {phim.tenPhim}
        </h1>
        <p className="leading-relaxed mb-3 h-16">
          {phim.moTa.length > 100 ? <span>{phim.moTa.slice(0, 100)}...</span> : <span>{phim.moTa}</span>}
        </p>
        <NavLink className="text-indigo-500 inline-flex items-center">
          ĐẶT VÉ
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </NavLink>
      </div>
    </div>
  );
}
