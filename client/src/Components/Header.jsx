import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  let username = userInfo?.username;

  return (
    <header>
      <Link to={"/"}>
        <a className="logo">BBB</a>
      </Link>

      <nav>
        {username && (
          <>
            <Link to={"/create"}>Create New Post</Link>
            <div onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </div>
          </>
        )}
        {!username && (
          <>
            <Link to={"/login"}>
              <a>Login</a>
            </Link>
            <Link to={"/register"}>
              <a>Register</a>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
