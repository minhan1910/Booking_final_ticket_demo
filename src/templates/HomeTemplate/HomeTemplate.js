import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export const HomeTemplate = (props) => {
  // path, exact, Component trong props
  const { Component, ...restRoute } = props;

  useEffect(() => {
    //ko có depencency vì khi này nó sẽ scroll lên đầu trang mỗi khi redirect vào
    //ko sợ lập vô tận vì ko có setState
    window.scrollTo(0, 0);
  })


  return (
    <Route
      {...restRoute}
      //propsRoute có cũng đc ko có cũng được
      //nếu ko cần điều hướng trang trong url như params, ....
      render={(propsRoute) => {
        //props.location, props.history, props.match
        return (
          <Fragment>
            {/* Nếu truyền vào cái component thôi thì ko truyền được cái header,....
                nên có thêm cái render để truyền vào trung gian
            */}
            <Header {...propsRoute} />

            {/* Truyền vào cái component như Home, ItemDetail, ... do cái này xài chung
                nên setup chung hết
            */}
            <Component {...propsRoute} />

            <hr className="mt-5"/>
            <Footer/>
          </Fragment>
        );
      }}
    />
  );
};
