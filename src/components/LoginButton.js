import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from 'antd';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button 
      type="primary" 
      size="large" 
      onClick={() => loginWithRedirect()}
    >
      Inicia Sesión / Registrate
    </Button>
  );

};
