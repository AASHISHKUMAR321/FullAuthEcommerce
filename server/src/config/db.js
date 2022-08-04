const mongoose = require("mongoose");

const Connect = () => {
  return mongoose.connect(
    "mongodb+srv://aashish:aashish123@cluster0.kwzd6sk.mongodb.net/Ecommerce"
  );
};

module.exports = Connect;
