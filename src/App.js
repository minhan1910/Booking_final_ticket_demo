import "./App.css";
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "pages/Detail/Detail";
import Checkout from "pages/Checkout/Checkout";
import { lazy } from "react";
import CheckoutTemplate from "templates/CheckoutTemplate/CheckoutTemplate";
import UserTemplate from "templates/UserTemplate/UserTemplate";
import Loading from "components/Loading/Loading";
import Profile from "pages/Profile/Profile";
import AdminTemplate from "templates/AdminTemplate/AdminTemplate";
import Dashboard from "pages/Admin/Dashboard/Dashboard";
import Films from "pages/Admin/Films/Films";
import ShowTime from "pages/Admin/Showtime/ShowTime";
import AddNew from "pages/Admin/Films/AddNew/AddNew";
import Edit from "pages/Admin/Films/Edit/Edit";

//lazy loading with checkoutTemplate
const CheckoutTemplateLazy = lazy(() =>
  import("templates/CheckoutTemplate/CheckoutTemplate")
);

export const history = createBrowserHistory();


//Này trong branch DuAnDatVe còn branch master để nữa
//có gì thay đổi so với branch master thì add r commit cho nó update lại
function App() {
  
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/profile" exact Component={Profile} />

        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />

        <UserTemplate path="/register" exact Component={Register} />
        <UserTemplate path="/login" exact Component={Login} />
        {/* <Suspense fallback={<h1>Loading...</h1>}>
          <CheckoutTemplateLazy path="/checkout/:id" exact Component={Checkout} />
        </Suspense> */}

        <AdminTemplate path="/admin" exact Component={Dashboard} /> 
        <AdminTemplate path="/admin/films" exact Component={Films} />
        {/* cái URL nó y như cái đường dẫn thư mục => dễ hiểu */}
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        {/* Ở đây có thể tham vào url cho các thuộc tính như tênFim
          nhưng hạn chế vì nó làm dài url nên đổi thành setLocalStorage
        */}
        <AdminTemplate path="/admin/films/showtimes/:id/:tenPhim" exact Component={ShowTime} />
        <AdminTemplate path="/admin/users" exact Component={Dashboard} />

        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
