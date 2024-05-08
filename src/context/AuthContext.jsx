import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  let requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  let baseUrl = "https://upskilling-egypt.com:3006/api/v1";
  let [loginData, setLoginData] = useState(null);
  let saveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    setLoginData(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ baseUrl, requestHeaders, loginData, saveLoginData }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
