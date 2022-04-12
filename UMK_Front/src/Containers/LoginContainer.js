import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { AuthService } from "../Service/auth";
import Login from "../Components/Login";
import Language from "../Components/Language";
import { notify } from "../Utils/notify";
import { userState } from "../State/user";
import { appName } from "../Service/http";
export function LoginContainer() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUser({ isAuthenticated: false, data: null, isLoading: true });

    AuthService.login({ login, password }).then(
      ({ data, status, message, error }) => {
        setIsLoading(false);
        if (error) {
          setUser({ isAuthenticated: false, data: null, isLoading: false });
          notify(message, "error");
        } else {
          setUser({ isAuthenticated: true, data, isLoading: false });
          notify(message, "success");
          navigate(`${appName}/`);
        }
      }
    );
  };

  if (!user.isLoading && user.isAuthenticated) {
    navigate(`${appName}/`);
  }
  useEffect(() => {
    if (user.isAuthenticated) {
      navigate(`${appName}/`);
    }
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleLogin(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <>
      <Language />
      <Login
        login={login}
        password={password}
        setLogin={setLogin}
        setPassword={setPassword}
        loginRef={loginRef}
        passwordRef={passwordRef}
        handleLogin={handleLogin}
        isLoading={isLoading}
      />
    </>
  );
}
