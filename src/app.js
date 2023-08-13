const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath); // to give custom directory for views
hbs.registerPartials(partialPath);

//Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App Index",
    description: "Weather App Home Page",
    name: "Nirbhay Gupta",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App About",
    description: "Weather app shares weather detail based on location",
    name: "Nirbhay about",
  });
});

app.get("/help", (req, res) => {
  // const helpDirectoryPath = path.join(__dirname, "../public/help.html");
  // app.use(express.static(helpDirectoryPath));
  res.render("help", {
    title: "Weather App Help",
    description: "Weather app shares weather detail based on location",
    name: "Nirbhay help",
  });
});

app.get("/weather", (req, res) => {
  let address = req.query.address;
  if (!address) {
    console.log("Please provide an address");
  } else {
    geocode(address, (error, data) => {
      if (error) {
        return console.log(error);
      }

      forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
          return console.log(error);
        }

        const description = `${data.location}\n${forecastData}`;

        res.render("weather", {
          title: "Weather Response",
          description,
          name: "Nirbhay",
        });
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    description: "Help page not found",
    name: "Nirbhay",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    description: "Page not found",
    name: "Nirbhay",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

const address = process.argv[2];
