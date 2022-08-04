import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./Button";
import Input from "./Input";

export const ProductEdit = () => {
  let user = JSON.parse(sessionStorage.getItem("user"));
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  console.log(user);
  const createHandler = async () => {
    let res = await fetch(
      `https://ecomappassign.herokuapp.com/products/${id}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(product),
      }
    );

    console.log(res);
    if (res.status == 403) {
      alert("permission denied Admin and manager can Only update products");
    }
    if (res.status == 200) {
      alert("product is updated");
      navigate("/products");
    }

    //
  };

  const handle = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Input name="name" text={"Product Name"} handle={handle} />
      <Input name="price" text={"Product Price"} handle={handle} />
      <Input name="description" text={"Product Description"} handle={handle} />
      <Input name="count" text={"Inventory Count"} handle={handle} />
      <Button name={"Update product"} handle={createHandler} />
    </div>
  );
};
