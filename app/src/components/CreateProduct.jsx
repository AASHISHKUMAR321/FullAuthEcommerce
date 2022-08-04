import axios from "axios";
import React, { useState } from "react";
import { Button } from "./Button";
import Input from "./Input";

export const CreateProduct = () => {
  let user = JSON.parse(sessionStorage.getItem("user"));

  const [product, setProduct] = useState({});
  console.log(user);
  const createHandler = async () => {
    let res = await fetch("https://ecomappassign.herokuapp.com/products", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(product),
    });

    console.log(res);
    if (res.status == 403) {
      alert("permission denied Admin can Only create products");
    }
    if (res.status == 200) {
      alert("product is created");
    }

    //
  };

  const handle = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  console.log(product);
  return (
    <div>
      <Input name="name" text={"Product Name"} handle={handle} />
      <Input name="price" text={"Product Price"} handle={handle} />
      <Input name="description" text={"Product Description"} handle={handle} />
      <Input name="count" text={"Inventory Count"} handle={handle} />
      <Button name={"create product"} handle={createHandler} />
    </div>
  );
};
