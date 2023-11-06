const express = require("express");
const app = express();
const pg = require("pg");

//postgresql
const pool = new pg.Pool({
  host: "dpg-cl09ib237rbc738kmpsg-a",
  //host: "dpg-cl09ib237rbc738kmpsg-a.oregon-postgres.render.com",
  port: 5432,
  database: "kirumo",
  user: "kirumo",
  password: "rUT0ctuPLQOFupoZTjxRUVn0blp7gnSp",
});

app.get("/", (req, res) => {
  res.send("Hello world\n");
});

app.get("/pg", (req, res) => {
  pool.connect( function(err, client) {
    if (err) {
      console.log(err);
    } else {
      client.query('SELECT * FROM sampletable', function (err, result) {
        res.render('index', {
          title: 'Express',
          datas: result.rows[0].name,
        });
        console.log(result); //コンソール上での確認用なため、この1文は必須ではない。
      });
    }
  })
});

app.listen(3000);