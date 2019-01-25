//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const items = [];
const workItems = [];
app.get("/", function(req, res) {
const day = date.getDate();
  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {
  if(req.body.list === "Work")
  {
    workItems.push(req.body.newItem);
    res.redirect("/work");
  }else{
    items.push(req.body.newItem);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post("/work", function(req, res) {
  workItems.push(req.body.newItem);
  res.redirect("/work");
});

app.get("/about", function(req, res)
{
  res.render("about");
});

app.get("/contact", function(req, res)
{
  res.render("contact");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000");
});
