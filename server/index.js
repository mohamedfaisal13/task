const express = require("express");
const app = express();
require("./db/mongoose");
const employee = require("./Routes/employeeRoute");
var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(employee);

app.listen(8000, (req, res) => {
  console.log(`connection is setup at Port 8000`);
});
