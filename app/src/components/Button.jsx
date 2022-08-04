import React from "react";
import styled from "styled-components";
const ButtonDiv = styled.div`
  margin-top: 20px;
  button {
    padding: 10px 80px;
    background-color: teal;
    color: white;
    border: none;
  }
`;

export const Button = ({ name, handle, index }) => {
  return (
    <ButtonDiv>
      <button onClick={() => handle(index)}>{name}</button>
    </ButtonDiv>
  );
};
