import axios from "axios";

//Này set up theo anh Nguyên còn trog dự án này chạy theo a Khải ;>
const api = axios.create({
    baseURL: "http://movienew.cybersoft.edu.vn/api/",
});

//Dùng cái này nó tự động lấy chứ ko cần lấy dưới localStorage ra
api.interceptors.request.use((config) => {
    config.headers = {
        TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyMCIsIkhldEhhblN0cmluZyI6IjE3LzA3LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1ODAxNjAwMDAwMCIsIm5iZiI6MTYyNjcxNDAwMCwiZXhwIjoxNjU4MTYzNjAwfQ.CyAnnc8e2Rp7YmuJCdtEj-Wp7RvlDenB9Dad6NV0R20',
        Authorization: localStorage.getItem("UserAdmin") ? `Bearer ${JSON.parse(localStorage.getItem("UserAdmin")).accessToken} ` : "",
    };

    return config;
});

export default api;

