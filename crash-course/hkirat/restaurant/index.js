const express = require("express");
const app = express();

app.use(express.json()); // To read JSON orders

app.get("/menu", (req, res) => {
  res.json([
    { id: 1, name: "Margherita", price: 10 },
    { id: 2, name: "Pepperoni", price: 12 },
  ]);
});

function checkLogin(req, res, next) {
  const isLoggedIn = true; // pretend check

  if (isLoggedIn) {
    next();
  } else {
    res.send("Please login first");
  }
}

let orders = [];

app.post("/order", checkLogin, (req, res) => {
  orders.push(req.body);
  console.log(req.body);
  res.send("Order placed successfully!");
});

app.get("/admin/orders", (req, res) => {
  res.json(orders);
});

app.put("/order/:id", (req, res) => {
  res.send(`Order ${req.params.id} updated`);
});

app.delete("/order/:id", (req, res) => {
  res.send(`Order ${req.params.id} cancelled`);
});

app.listen(3000, () => {
  console.log("Pizza restaurant server running on port 3000");
});
