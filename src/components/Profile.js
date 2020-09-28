import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [cookies, setCookie] = useCookies(['name', 'pic_src', 'email', 'isAuth']);

  if(isAuthenticated){
      console.log(user.picture)
      setCookie('name', user.name, { path: '/' });
      setCookie('pic_src', user.picture, { path: '/' });
      setCookie('email', user.email, { path: '/' });
      setCookie('isAuth', true, { path: '/' });
      return <Redirect to="/" />
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
        isAuthenticated && (
        <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
        )
  );
};