import React from "react";
import { useCookies } from 'react-cookie';
import { Button } from 'antd';

export const LogoutButton = () => {
  const [cookies, setCookie] = useCookies(['name', 'pic_src', 'email', 'isAuth']);

  return (

    <Button danger onClick={() => {
      setCookie('name', '', { path: '/' });
      setCookie('pic_src', '', { path: '/' });
      setCookie('email', '', { path: '/' });
      setCookie('isAuth', false, { path: '/' });
      window.location.reload();
    }}>
      Log Out
    </Button>

  );

};
