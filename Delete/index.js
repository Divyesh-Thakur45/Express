const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.delete("/deleteProduct/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.send(id);
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const newData = JSON.parse(data);
      const deleteData = newData.product.filter((el) => el.id != id);
      console.log(deleteData);
      fs.writeFile(
        "./db.json",
        JSON.stringify({ product: deleteData }),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Product deleted successfully");
          }
        }
      );
    }
  });
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
