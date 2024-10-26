const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("Start");
  const start = new Date().getTime();
  next();
  console.log("End");
  const end = new Date().getTime();

  console.log(`Runtime is ${start - end}`);
});

app.get("/home", (req, res) => {
  res.send("Hello World!");
  console.log("Hellow World!");
});

app.listen(8080, () => {
  console.log("port is 8080");
});
