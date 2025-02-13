import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const Login = () => {
  return (
    <div>
        <div className="text-3xl text-blue-600">Google Login</div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          console.log("=====>>>", jwtDecode(credentialResponse.credential))
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default Login;
