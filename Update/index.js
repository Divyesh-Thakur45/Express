const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.patch("/updateProduct/:id", (req, res) => {
  const { id } = req.params;
  //   res.send(id);
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const newdata = JSON.parse(data);
      const index = newdata.findIndex((el) => el.id == id);
      if (index != -1) {
        newdata[index] = { ...newdata[index], ...req.body };
        res.send("ok");
      } else {
        res.send("error");
      }
    }
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
