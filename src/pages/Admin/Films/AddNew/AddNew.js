import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { GROUPID } from 'util/settings/config';
import { themPhimUploadHinhAction } from 'Redux/actions/QuanLyPhimActions';
import { useDispatch } from 'react-redux';

const AddNew = () => {
    const dispatch = useDispatch();

    const [componentSize, setComponentSize] = useState('default');
    //Chỉ để hiển thị
    const [imgSrc, setImgSrc] = useState('');

    const formik = useFormik({
        initialValues: {
            //   Này của api nó quy định 
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            hinhAnh: {},
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,


        },
        onSubmit: (values) => {
            console.log('values', values);
            //Để đây để ko bị xóa dữ liệu của nhóm này và nhóm kia
            //Cho mặc định ở đây luôn
            values.maNhom = GROUPID;
            //Tạo đối tượng formData
            //do bên API quy định và 
            //cũng do file có base mã hóa này nọ nên phải
            //dùng formData chứ ko dùng json được
            //cứ làm theo là được
            let formData = new FormData();
            for(const key in values) {
                if(key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    //Phải đủ 3 tham số mới truyền file lên được
                    //còn cái string đầu ghi gì vào cũng được
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }

            dispatch(themPhimUploadHinhAction(formData));
        }
    })

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeDatePicker = (value) => {
        //Này nó trả về cái object moment do cái ant nó quy định
        //Định dạng nó lại string cho giống với api mới xử lý được
        // console.log('datepickerchange', moment(value).format('DD/MM/YYYY'));
        const ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
        //Cách fill vào cái initialValues
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
    }

    //Kỹ thuật closure function
    const hangdleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }

    const handleChangInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        }
    }

    const handleChangeFile = (e) => {
        //lấy file tư e
        let file = e.target.files[0]; //này là object gửi theo formData 

        //Format image html
        //Có thể dùng accept attr ngay trên html
        
        if (['image/jpeg', 'image/jpg', 'image/gif', 'image/png'].includes(file.type)) {
            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file); //đọc cái file đó lên mới load được
            reader.onload = (e) => {
                //param (e) này của FileReader chứ ko phải cái event bên ngoài 
                console.log(e.target.result); //ảnh base 64
                setImgSrc(e.target.result);
            }

            //Đem dữ liệu file lưu vào formik
            formik.setFieldValue('hinhAnh', file);
        } else {
            setImgSrc('N/A');
        }

        console.log(file);
    }

    return (
        <>
            <Form
                // onSubmit này của ant design
                onSubmitCapture={formik.handleSubmit}

                labelCol={{
                    span: 4,
                }}

                wrapperCol={{
                    span: 14,
                }}

                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}

                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <h3>Thêm mới phim </h3>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Tên Phim">
                    <Input name="tenPhim" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name="moTa" onChange={formik.handleChange} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker form={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
                </Form.Item>
                <Form.Item label="Select">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Đang Chiếu" valuePropName="checked">
                    {/* Dùng kỹ thuật closure function 
                        phối hợp tốt với các thư viện bên ngoài

                        C1: cho switch có thể onChange set cứng luôn cho nó r setField 
                        C2: cho name rồi dùng closure để thay đổi nó
                        c3: Dùng e.target.name có thể lấy được name nhưng đôi lúc nó bị undefined 
                        ===> C2: tối ưu nhất

                        //C2: tái sử dụng code đỡ dài dòng hơn khi set cái onChange trực tiếp
                    */}
                    <Switch name="dangChieu" onChange={hangdleChangeSwitch('dangChieu')} />
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch name="sapChieu" onChange={hangdleChangeSwitch('sapChieu')} />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch name="hot" onChange={hangdleChangeSwitch('hot')} />
                </Form.Item>
                <Form.Item label="Số sao">
                    {/* Ở InputNumber nó ko có lấy được cái event => ko lấy được name phải dùng closure */}
                    <InputNumber onChange={handleChangInputNumber('danhGia')} min={1} max={5} />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeFile} />
                    <br />
                    {/* Chỉ để hiển thị chứ ko đem lên server */}
                    <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
                </Form.Item>


                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-300 text-white p-2">Thêm phim</button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddNew;