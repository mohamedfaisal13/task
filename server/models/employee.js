const mongoose = require("mongoose");

const emplyeeSchema = new mongoose.Schema({
  taskname: {
    type: String,
    required: true,
    unique: false,
  },
  startdate: {
    type: Date,
    default: Date,
    unique: false,
  },
  enddate: {
    type: Date,
    default: Date,
    unique: false,
  },
  priority: {
    type: String,
    required: true,
    unique: false,
  },
  // status: {
  //   type: String,
  //   required: true,
  //   unique: false,
  // },
  addedon: {
    type: String,
    default: Date.now,
  },
});

const employee = new mongoose.model("employee", emplyeeSchema);

module.exports = employee;