import React from "react";
import Input from "./Input";
import styled from "styled-components";
import { Button } from "./Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginDiv = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 50px;
  a {
    text-decoration: none;
  }
`;

export const Login = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const HandleClick = async () => {
    let { data } = await axios.post(
      `https://ecomappassign.herokuapp.com/login`,
      user
    );
    // {
    //   data.errors
    //     ? alert(`${data.errors[0].msg} of ${data.errors[0].param}`)
    //     : navigate("/products");
    // }
    // console.log(data);
    sessionStorage.setItem("user", JSON.stringify(data));
    navigate("/products");
    console.log(JSON.parse(sessionStorage.getItem("user")));
  };

  return (
    <LoginDiv>
      <Input text={"Email"} name={"email"} handle={handle} />
      <Input text={"Password"} name={"password"} handle={handle} />
      <Button name={"Login"} handle={HandleClick} />
      <br />
      <h4>
        Don't Have Account ? <Link to={"/register"}>Sign</Link>{" "}
      </h4>
    </LoginDiv>
  );
};
