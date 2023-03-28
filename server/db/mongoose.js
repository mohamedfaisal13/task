const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/employee")
  .then(() => {
    console.log("connection is successfully setup..");
  })
  .catch((e) => {
    console.log(e);
    console.log("connection is not build...");
  });
