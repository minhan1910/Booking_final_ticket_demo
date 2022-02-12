import React, { Fragment, useEffect } from 'react';
import { Button, Input, Table } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction } from 'Redux/actions/QuanLyPhimActions';
import { NavLink } from 'react-router-dom';
import { history } from 'App';
import { XoaPhimAction } from 'Redux/actions/QuanLyPhimActions';

const { Search } = Input;

//Có 2 cách pagination là phân tại client và api do backend phân ra
//Cách 1 ( tại client): 
//load hết dữ liệu từ api xong rồi phân trang ra
// Nhược điểm là: LÚC ĐẦU load chậm do phải lấy hết data // nếu tầm mấy ngàn row thì được
// Ưu điểm là: LÚC SAU bấm qua trang khác nhanh do không cần call api nữa

//Cách nâng cao là cách 2 lấy api phân trang của backend đưa lên r xử lý
//cách này search google thêm để biết

//Nặng ở đây là kết hợp với html để render ra giao diện chứ ko phải nặng ở phần data call api

export default function Films() {

  const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);

  const dispatch = useDispatch();
  // console.log(arrFilmDefault);

  //Nếu như họ vào thẳng url trang chủ thì nó sẽ call api luôn
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);

  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirection: ['descend', 'ascend'],
      width: '15%',
      align: 'center',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      defaultSortOrder: 'descend',
      render: (text, film, index) => {
        return <Fragment>
          <img key={film.maPhim} src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e) => { e.target.onerror = null; e.target.src = `http://picsum.photos/id/${index}/50/50` }} />
        </Fragment>
      },
      width: '10%',

    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        return tenPhimA > tenPhimB ? 1 : -1;
      },
      sortDirection: ['descend', 'ascend'],
      width: '25%',
    },
    {
      title: 'Mô tả phim',
      dataIndex: 'moTa',
      sorter: (a, b) => {
        let moTaA = a.moTa.toLowerCase().trim();
        let moTaB = b.moTa.toLowerCase().trim();
        return moTaA > moTaB ? 1 : -1;
      },
      render: (text, film) => {
        return <Fragment key={film.maPhim}>
          {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa}
        </Fragment>
      },
      sortDirection: ['descend', 'ascend'],
      width: '30%',
    },
    {
      title: 'Hành Động',
      dataIndex: 'N/A',
      render: (text, film) => {
        return <Fragment key={film.maPhim} >
          <NavLink key={1} className="mr-2 text-2xl" to={`/admin/films/edit/${film.maPhim}`}><EditOutlined style={{color: 'blue'}} /></NavLink>
          <span key={2} className="text-2xl" onClick={() => {
            //Gọi action xóa
            if(window.confirm('Bạn có chắc muốn xóa phim ' + film.tenPhim)) {
              //Gọi action
              dispatch(XoaPhimAction(film.maPhim));
            }
          }} ><DeleteOutlined style={{color: 'red', cursor: 'pointer'}} /></span>
          <NavLink key={3} className="ml-2 text-2xl" to={`/admin/films/showtimes/${film.maPhim}/${film.tenPhim}`} onClick={() => {
            localStorage.setItem('filmParams', JSON.stringify(film));
          }}><CalendarOutlined style={{color: 'green'}} /></NavLink>
        </Fragment>
      },
      width: '25%',
      align: 'center',
    },
  ];

  //Datas of the table 
  const data = arrFilmDefault;

  const onSearch = value => {
    console.log(value);
    //search backend nó lo rồi nên chỉ cần call api rồi search dispatch lên là được
    dispatch(layDanhSachPhimAction(value));
  };

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return <div className="">
    <h3 className="text-4xl">Quản lý phim</h3>
    <Button className="mb-5" onClick={() => {
      history.push('/admin/films/addnew');
    }}>Thêm Phim</Button>
    <Search
      className="mb-5"
      placeholder="input search text"
      // Chỗ này override được và thêm cái ReactNode như icon của nó vào được luôn
      enterButton={<SearchOutlined />}
      size="large"
      // suffix={suffix}
      onSearch={onSearch}
    />
    <Table columns={columns} dataSource={data} onChange={onChange} rowKey={'maPhim'} />
  </div>
}
