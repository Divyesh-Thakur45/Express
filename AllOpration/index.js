const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

// Middleware
app.use((req, res, next) => {
  const start = new Date().getTime();
  next();
  const end = new Date().getTime();
  const duration = end - start;
  console.log(`Request processed in ${duration} ms`);
});

// Logger middle
app.use((req, res, next) => {
  fs.appendFile(
    "./file.txt",
    `\n the method is ${req.method} and link is ${req.url}`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Done");
      }
    }
  );
  next();
});
// Get requvest
app.get("/product", (req, res) => {
  res.send("ok");
  console.log("Product Page");
});

// Post Method Request
app.post("/product", (req, res) => {
  // console.log(req.body)
  res.send(req.body);
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let newData = JSON.parse(data);
      newData.product.push(req.body);
      fs.writeFile("./db.json", JSON.stringify(newData), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Data saved successfully");
        }
      });
    }
  });
});

// Delete Method Requvest
app.delete("/product/:id", (req, res) => {
  res.send(req.params);
  const { id } = req.params;
  //   console.log(id);
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let newData = JSON.parse(data);
      newData.product = newData.product.filter((el) => el.id != id);
      console.log(newData);
      fs.writeFile("./db.json", JSON.stringify(newData), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Data deleted successfully");
        }
      });
    }
  });
});

// patch Method Request
app.patch("/product/:id", (req, res) => {
  res.send(req.params);
  let { id } = req.params;
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //   console.log(JSON.parse(data));
      let newData = JSON.parse(data);
      index = newData.product.findIndex((el) => el.id == id);
      if (index != -1) {
        newData.product[index] = { ...newData.product[index], ...req.body };
        // Write the updated data back to db.json
        fs.writeFile("./db.json", JSON.stringify(newData), (err) => {
          if (err) {
            res.send("Failed to write updated data.");
          } else {
            res.send("Product updated successfully.");
          }
        });
      } else {
        console.log("No product found with given id");
      }
    }
  });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
