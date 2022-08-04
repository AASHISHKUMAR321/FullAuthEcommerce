const express = require("express");

const productsModel = require("../models/products.model");
const authorise = require("../middlwear/Authorise");
const router = express.Router();

router.get("", authorise(["admin", "manager"]), async (req, res) => {
  try {
    const products = await productsModel.find().lean().exec();
    res.send(products);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("", authorise(["admin"]), async (req, res) => {
  try {
    const products = await productsModel.create(req.body);
    res.send(products);
  } catch (err) {
    console.log(err.message);
  }
});
router.patch("/:id", authorise(["admin", "manager"]), async (req, res) => {
  try {
    console.log("PATCH");
    // console.log(req.params.id)
    const products = await productsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(products);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/:id", authorise(["admin"]), async (req, res) => {
  try {
    console.log("delete");
    const products = await productsModel.findOneAndDelete(req.params._id);
    res.send(products);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
