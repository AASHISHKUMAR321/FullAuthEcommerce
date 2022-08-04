import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  margin-top: 20px;
  width: 90%;
  font-size: 20px;
  height: 50px;
  a {
    margin-left: 60px;
    margin-top: 10px;
    font-size: 20px;
  }
`;
export const Navbar = () => {
  const link = [
    { name: "Home", to: "/" },
    { name: "Register", to: "/register" },
    { name: "Login", to: "/login" },
    { name: "Products", to: "/products" },
  ];
  return (
    <Nav>
      {link.map((e) => (
        <Link to={e.to} key={Math.random()}>
          {e.name}
        </Link>
      ))}
    </Nav>
  );
};
