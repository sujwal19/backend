import express from "express";

const app = express();

// config ejs
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome",
    message: "Hello from EJS",
    people: ["sujwal", "bheem", "ujjwal"],
  });
});

app.listen(8000, () => console.log("Serer is runnig on port 8000"));
