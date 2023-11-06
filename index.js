const express = require("express");
const app = express();
const { Client } = require("pg");

//postgresql
const client = new Client({
  user: "kirumo",
  host: "dpg-cl09ib237rbc738kmpsg-a",
  database: "kirumo",
  password: "rUT0ctuPLQOFupoZTjxRUVn0blp7gnSp",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Hello world\n");
});

app.get("/pg", (req, res) => {
  client.connect();
  let posts = [];
  client.query("SELECT * FROM sampletable", (err, res) => {
    posts = res.rows;
    client.end();
  });

  res.send(posts);

});

app.listen(3000);
console.log("server listening...");