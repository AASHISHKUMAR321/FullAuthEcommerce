import * as React from "react";
import styled from "styled-components";
const InputDiv = styled.div`
  input {
    margin: auto;
    margin-top: 20px;
    padding: 15px 40px;

    outline: none;
  }
`;

export default function Input({ text, handle, name }) {
  return (
    <InputDiv>
      <input placeholder={text} id="fullWidth" name={name} onChange={handle} />
    </InputDiv>
  );
}
