import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, DatePicker, InputNumber, Select  } from 'antd';
import { quanLyRapServices } from 'services/QuanLyRapServices';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeServices } from 'services/QuanLyDatVeService';
// import { layDanhSachPhimAction } from 'Redux/actions/QuanLyPhimActions';
import { useDispatch } from 'react-redux';
import { filter } from 'lodash';
// import { history } from 'App';


export default function ShowTime(props) {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: '',
      maRap: '',
      giaVe: '',
    },
    onSubmit : async (values) => {
      console.log(values);

      try {
        const result = await quanLyDatVeServices.taoLichChieu(values);
        // alert('Tạo lịch chiếu thành công');
        console.log('result', result);
        // history.push(`/admin/films`);
      } catch (error) {
        console.log(error.response?.data);
      }
    }
  })


  //Thay vì dùng redux thì dùng useState sẽ tối ưu vì
  //đỡ cho redux nó quét hết
  //gộp cả 2 cái api lại luôn cho tối ưu
  //tránh khi setState lại thì nó sẽ re-render ngược lại đúng cái state cũ
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  console.log(state);

  useEffect(async () => {
    try {
      //Này nó chỉ lấy mã tên chứ ko load hết do bên backend xửu lý vây

      const result = await quanLyRapServices.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: result.data.content,
      });

    } catch (error) {

    }
  }, [])

  //Này cho chọn vào thì nó sẽ lấy ra hệ thống rạp
  const handleChangeHeThongRap = async (values, option) => {
    //từ hệ thống rạp call api lấy thông tin rạp
    try {
      console.log(values);
      const result = await quanLyRapServices.layThongTinCumRap(values);
      //gán giá trị cụm rạp vào state
      setState({
        ...state,
        cumRapChieu: result.data.content,
      })

    } catch (error) {
      console.log(error.response?.data);
    }
  }

  const handleChangeCumRap = (value, option) => {
    formik.setFieldValue('maRap', value);
  }

  const onOk = values => {
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));
  }

  const onChangeDate = values => {
    //Định hình lại thành string do backend yêu cầu
    formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));

  }

  const onChangeInputNumber = value => {
    formik.setFieldValue('giaVe', value);
  }

  //Này để show ra cái phần select cho 1 api
  const convertSelectHeThongRap = () => {
    //state.heThongRapChieu?.map((htr, index) => ({ label: htr.tenHeThongRap, value: htr.tenHeThongRap}))
    return state.heThongRapChieu?.map((htr, index)=> ({ label: htr.tenHeThongRap, value: htr.maHeThongRap}));
  }

  let filmParams = {};
  if(localStorage.getItem('filmParams')) {
    filmParams = JSON.parse(localStorage.getItem('filmParams'));
  }

  return <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    initialValues={{
      remember: true,
    }}
    autoComplete="off"
    wrapperCol={{
      span: 16,
    }}
    onSubmitCapture={formik.handleSubmit}
  >
    <h3 className="text-2xl">Tạo lịch chiếu - {props.match.params.tenPhim}</h3>
    <img src={filmParams.hinhAnh} alt={filmParams.maPhim} width={200} height={200} />
    <Form.Item
      label="Hệ thống rạp"
    >
      <Select options={convertSelectHeThongRap()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
    </Form.Item>
    <Form.Item
      label="Cụm rạp"
    >
      <Select options={state.cumRapChieu?.map((cumRap, index) => ({ label: cumRap.tenCumRap, value: cumRap.maCumRap}))} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
    </Form.Item>
    <Form.Item
      label="Ngày chiếu giờ chiếu"
    >
        <DatePicker format="DD/MM/YYYY HH:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
    </Form.Item>
    <Form.Item
      label="Ngày chiếu giờ chiếu"
    >
      <InputNumber min={75000} max={150000} onChange={onChangeInputNumber} />
    </Form.Item>
    <Form.Item label="Chức năng">
      <Button htmlType="submit">Tạo lịch chiếu</Button>
    </Form.Item>
  </Form>;
}
