import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./Button";
import { CreateProduct } from "./CreateProduct";
const ProductDiv = styled.div`
  table {
    font-size: 20px;
    margin: auto;
  }
  th {
    padding: 5px;
  }
`;

export const ProductList = () => {
  let user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [get, setGet] = useState(false);
  const createHandler = () => {
    setGet(!get);
  };
  console.log(user);
  const gethandler = async () => {
    setGet(false);
    let res = await fetch("https://ecomappassign.herokuapp.com/products", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    let data = await res.json();

    if (res.status == 403) {
      alert("permission denied Admin and manager can see the  products");
    }
    if (res.status == 200) {
      setData(data);
    }
  };

  return (
    <div>
      {get ? (
        <CreateProduct />
      ) : (
        <Button name="Create Products" handle={createHandler} />
      )}

      <Button name="Get All  Products" handle={gethandler} />
      <ProductDiv>
        <h1>productss</h1>
        <table width="80%">
          <thead>
            <tr>
              <th>Products Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Count</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((e) => {
                  return (
                    <tr>
                      <th>{e.name}</th>
                      <th>{e.price}</th>
                      <th>{e.description}</th>
                      <th>{e.count}</th>
                      <th>
                        <button
                          onClick={() => {
                            navigate(`/products/${e._id}`);
                          }}
                        >
                          Edit
                        </button>
                      </th>
                      <th></th>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </ProductDiv>
    </div>
  );
};
