import { Fragment, useEffect} from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "util/settings/config";


 const CheckoutTemplate = (props) => {
  // path, exact, Component trong props
  const { Component, ...restRoute } = props;

  useEffect(() => {
    //ko có depencency vì khi này nó sẽ scroll lên đầu trang mỗi khi redirect vào
    //ko sợ lập vô tận vì ko có setState
    window.scrollTo(0, 0);
  })

  if(!localStorage.getItem(USER_LOGIN)) {
      return <Redirect to="/login" />;
  }

  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <Fragment>

            <Component {...propsRoute} />

          </Fragment>
        );
      }}
    />
  );
};

export default CheckoutTemplate;
