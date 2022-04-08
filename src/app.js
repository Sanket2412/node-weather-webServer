const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = 3000;

//Define Path for Express Config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup Static Directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Sanket Khardekar" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About Me", name: "Sanket Khardekar" });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Hey I am Here!!",
    name: "Sanket Khardekar",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must Provide Address" });
  }
  geocode(req.query.address, (error,{latitude,longitude,location }={}) => {
      if(error)
      {
          return res.send({ error})
      }
    forecast(latitude,longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forcastData,
        location,
        address: req.query.address,
      });
    });
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Sanket Khardekar",
    errorMessage: "Help Article Not Found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    name: "Sanket Khardekar",
    errorMessage: "Page Not Found",
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
