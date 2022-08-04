import React, { useReducer } from "react";
import FullWidthTextField from "./Input";
import styled from "styled-components";
import { Button } from "./Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SignupDiv = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 50px;
  a {
    text-decoration: none;
  }
  select {
    padding: 10px 70px;
    margin-top: 20px;
  }
`;

export const Register = () => {
  const [user, setUser] = useState({});
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handle = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log(user);

  const HandleClick = async () => {
    let { data } = await axios.post(
      `https://ecomappassign.herokuapp.com/register`,
      user
    );
    {
      data.errors
        ? alert(`${data.errors[0].msg} of ${data.errors[0].param}`)
        : navigate("/login");
    }
  };

  return (
    <SignupDiv>
      <h1>Register</h1>
      <FullWidthTextField text={"userName"} name={"username"} handle={handle} />
      <FullWidthTextField text={"email"} name={"email"} handle={handle} />
      <FullWidthTextField text={"password"} name={"password"} handle={handle} />
      <FullWidthTextField text={"phone"} name={"phone"} handle={handle} />
      <select name="role" id="" onChange={handle}>
        <option value="">Chose role</option>
        <option value="admin">admin</option>
        <option value="manager">manager</option>
        <option value="staff">staff</option>
      </select>

      <Button name={"SignUp"} handle={HandleClick} />
      <br />
      <h4>
        I Have Account ? <Link to={"/login"}>Login</Link>{" "}
      </h4>
    </SignupDiv>
  );
};
