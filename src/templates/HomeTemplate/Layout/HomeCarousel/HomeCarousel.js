import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getCarouselAction } from "Redux/actions/CarouselActions";
import './HomeCarousel.css';
const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
};

export default function HomeCarousel() {
  const { arrImg } = useSelector((state) => state.CarouselReducer);

  const [dotPosition, setDotPosition] = React.useState("bottom");

  const dispatch = useDispatch();
  //Sẽ tự kích hoạt khi component load ra // componentDidMount
  useEffect(() => {
    //Để tái sử dụng lại ta sẽ cho lên rudux
    //mà redux ko cho process Aysnc => dùng reudx-thunk
    //mà trong file action làm gì có useDispatch => dùng redux-thunk dispatch của nó

    //Ở đây dispatch của redux-thunk nó sẽ tự động gọi hàm
    //dispatch thực hiện được trong 2 trường hợp sau:

    //1- Nhận 1 action là object {type: '', data: ''}
    //2- Nhận 1 cái callBackFunction (hàm chưa thcự hiện) và phải có middleware như redux-thunk

    //solution =>viết lại

    //ở đây sẽ có 2 cách viết dispatch của redux-thunk
    //cách 1: Nếu bên action export ra hàm ko có tham số
    //là ko dùng closure function thì viết ko có dấu ()
    //do redux-thunk nó sẽ gọi

    //dispatch(getCarouselAction);

    //Cách 2: do bên kia trả về 1 hàm để dispatch lên
    // => phải thực thi hàm mới return lại đc hàm
    //còn cách khác nếu muốn truyền tham số 
    //dispatch(getCarouselAction.bind(this, thamSoNeuCo));
    dispatch(getCarouselAction());
  }, []);

  //Cách chỉnh cái ảnh carousel nó ko bị kích thucớ xấu
  //vẫn render nó ra xong opacity-0 cho nó
  //dùng backgroundImg giúp responsive được
  const renderImg = () => {
    return arrImg.map((item, index) => {
      return (
        <div key={item.maBanner}>
          <div
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            {/* Vẫn có thẻ img để gg vẫn index được nó */}
            <img src={item.hinhAnh} className="w-full opacity-0" alt="123" />
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {/* đè lại css khi import thằng react-slick */}
      <Carousel dotPosition={dotPosition}  style={{width:'100%',padding:0,margin:0}}>{renderImg()}</Carousel>
    </>
  );
}
