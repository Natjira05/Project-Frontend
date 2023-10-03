// Description : Node.js HTML client
// requires : npm install express ejs axios body-parser

const express = require('express');
const axios = require('axios');
const app = express();
var bodyParser = require('body-parser');
//const path = require("path");


//Base URL for the API
//const base_url = "https://api.example.com";
// const base_url = "http://10.104.9.223";
const base_url = "http://localhost:3000";

// Set the template engine
//app.set("views", path.join(__dirname, "/public/views"));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

// Serve static files
app.use(express.static(__dirname + '/public'));

// Books
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(base_url + '/books');
    const response_ft = await axios.get(base_url + '/formats');
    const response_ms = await axios.get(base_url + '/music');
    res.render("books", { books: response.data, formats: response_ft.data, music: response_ms.data });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.get("/book/:id", async (req, res) => {
  try {
    const response = await axios.get(base_url + '/books/' + req.params.id);
    const response_ft = await axios.get(base_url + '/formats'  + req.params.id);
    const response_ms = await axios.get(base_url + '/music'  + req.params.id);
    res.render("book", { book: response.data, formats: response_ft.data, music: response_ms.data});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", async (req, res) => {
  try {
    const data = { format: req.body.format, name: req.body.name, composer: req.body.composer};
    await axios.post(base_url + '/books', data);
    // const data1 = { title: req.body.title, author: req.body.author };
    // await axios.post(base_url + '/formats', data1);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.get("/update/:id", async ( req, res) => {
  try {
    const response = await axios.get(base_url + '/books/' + req.params.id);
    const response_fr = await axios.get(base_url + '/formats/' + req.params.id);
    const response_ms = await axios.get(base_url + '/music/' + req.params.id);
      res.render("update", {book: response.data, formats: response_fr.data, music: response_ms.data});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.post("/update/:id", async (req, res) => {
  try {
    const data = { format: req.body.format, name: req.body.name, composer: req.body.composer} ;
    await axios.put(base_url + '/books/' + req.params.id, data) ;
    const data_fr = { title: req.body.title, author: req.body.author} ;
    await axios.put(base_url + '/formats/' + req.params.id, data_fr) ;
    const data_ms= { title: req.body.title, author: req.body.author} ;
    await axios.put(base_url + '/music/' + req.params.id, data_ms) ;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    await axios.delete(base_url + '/books/' + req.params.id);
    // await axios.delete(base_url + '/formats/' + req.params.id);
      res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});






app.listen(5500, () => {
  console.log('Server started on port 5500');
});