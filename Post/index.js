const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.get("/home", (req, res) => {
  res.send("Welcome to the Home Page");
});

app.post("/products", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  data.product.push(req.body);
  fs.writeFileSync("./db.json", JSON.stringify(data));
  res.send("Student data has been added");
});
app.listen(8080, () => {
  console.log("port is running on port 8080");
});
