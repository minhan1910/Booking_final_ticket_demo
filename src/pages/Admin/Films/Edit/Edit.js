import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Radio,
    Select,
    DatePicker,
    InputNumber,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { GROUPID } from 'util/settings/config';
import { capNhatPhimUploadAction } from 'Redux/actions/QuanLyPhimActions';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinPhimAction } from 'Redux/actions/QuanLyPhimActions';

const Edit = (props) => {
    const dispatch = useDispatch();
    const {thongTinPhim} = useSelector(state => state.QuanLyPhimReducer);
    // console.log('thongTinPhim', thongTinPhim);
    const [componentSize, setComponentSize] = useState('default');
    //Chỉ để hiển thị
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const {id} = props.match.params;
        dispatch(layThongTinPhimAction(id));
    }, []);

    const formik = useFormik({
        //Thuộc tính này nó sẽ cảnh báo 
        //do nếu ko xử lý khéo thì nó sẽ re-render lại liên tục
        //mặc định cái này nó tắt
        //Phải có thuộc tính này của formik mới thay đổi initialValues được 
        enableRendering: true,  
        //phải cho thêm thuộc tính này để khi reload lại sẽ không bị mất value trong form
        enableReinitialize: true,
        initialValues: {
            // Này của api nó quy định
            // phải dùng optional chaining để khi nó render trước khi call api ko bị lỗi
            // hoặc nên tạo các thuộc tính này ở class như bên kia sẽ tránh được lõi này
            maPhim: thongTinPhim?.maPhim,
            tenPhim: thongTinPhim?.tenPhim,
            trailer: thongTinPhim?.trailer,
            moTa: thongTinPhim?.moTa,
            ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
            // Vì nêu như ko có ảnh thì nó sẽ không để
            dangChieu: thongTinPhim?.dangChieu,
            sapChieu: thongTinPhim?.sapChieu,
            hot: thongTinPhim?.hot,
            danhGia: thongTinPhim?.danhGia,
            maNhom: GROUPID,
            hinhAnh: null,
        },
        onSubmit: (values) => {
            // console.log('values', values);


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
                    if(values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    } 
                }
            }

            //cập nhật phim upload action
            dispatch(capNhatPhimUploadAction(formData));
        }
    });

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeDatePicker = (value) => {
        //Này nó trả về cái object moment do cái ant nó quy định
        //Định dạng nó lại string cho giống với api mới xử lý được
        // console.log('datepickerchange', moment(value).format('DD/MM/YYYY'));
        const ngayKhoiChieu = moment(value);
        console.log(ngayKhoiChieu);
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

    const handleChangeFile = async (e) => {
        //lấy file tư e
        let file = e.target.files[0]; //này là object gửi theo formData 

        //Format image html
        //Có thể dùng accept attr ngay trên html
        
        if (['image/jpeg', 'image/jpg', 'image/gif', 'image/png'].includes(file.type)) {
            //Đem dữ liệu file lưu vào formik
            //Để đây thì ko bị bất đồng bộ vì cái setFieldValue trả về cái promise
            await formik.setFieldValue('hinhAnh', file);
            
            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file); //đọc cái file đó lên mới load được
            reader.onload = (e) => {
                //param (e) này của FileReader chứ ko phải cái event bên ngoài 
                console.log(e.target.result); //ảnh base 64
                setImgSrc(e.target.result);
            }

            //Khổng để ở đây được vì sẽ bị bất đồng bộ bắt buộc nó phải lưu vào formik trươc
            // //Đem dữ liệu file lưu vào formik        
            // formik.setFieldValue('hinhAnh', file);
        } else {
            setImgSrc('N/A');
        }

        // console.log(file);
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
                    {/* Để gán value trực tiếp vào đây thì không được
                        vì khi đó onChange nó sẽ làm thay đổi state và re-render lại
                        => Nó gán giá trị của redux về tiếp nên không thể thay đổi giá trị được
                        =>Solution là dùng state hiện tại là init của formik để gán nó vào ko bị đè
                    */}
                    <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker form={"DD/MM/YYYY"} onChange={handleChangeDatePicker} 
                    // Set 2 lần mới ra được ngày định dạng của nó 
                    // Set ở trên cho backend nó biét cái moment xuống đây mới set
                    
                    value={moment(formik.values.ngayKhoiChieu)}/>
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
                    <Switch name="dangChieu" onChange={hangdleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
                </Form.Item>
                <Form.Item label="Sắp chiếu" valuePropName="checked">
                    <Switch name="sapChieu" onChange={hangdleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
                </Form.Item>
                <Form.Item label="Hot" valuePropName="checked">
                    <Switch name="hot" onChange={hangdleChangeSwitch('hot')} checked={formik.values.hot} />
                </Form.Item>
                <Form.Item label="Số sao">
                    {/* Ở InputNumber nó ko có lấy được cái event => ko lấy được name phải dùng closure */}
                    <InputNumber onChange={handleChangInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeFile}  accept={"image/png, image/jpeg,image/gif,image/png"}  />
                    <br />
                    {/* Chỉ để hiển thị chứ ko đem lên server */}
                    <img style={{ width: 150, height: 150 }} src={imgSrc !== '' ? imgSrc : thongTinPhim.hinhAnh} alt="..." />
                </Form.Item>


                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-300 text-white p-2">Cập nhật</button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Edit;