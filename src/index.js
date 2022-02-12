import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//antd
import "antd/dist/antd.css";
//react slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store} from './Redux/configStore';
import './i18n';


// Chức năng realtime lỗi
//Cấu hình realtime (Websocket);
// import * as signalR from '@microsoft/signalr';;

//Đoạn code để kết nối đến sever lắng nghe sự kiện từ server
// export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

// connection.start().then(() => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     document.getElementById('root')
//   );
// }).catch((error) => {
//   console.log(error);
// })


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
