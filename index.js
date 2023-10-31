const express = require("express");
const mysql = require('mysql');
const app = express();
const { Client } = require("pg");

//postgresql
const client = new Client({
  host: "dpg-cl09ib237rbc738kmpsg-a.oregon-postgres.render.com",
  port: 5432,
  database: "kirumo",
  user: "kirumo",
  password: "rUT0ctuPLQOFupoZTjxRUVn0blp7gnSp",
});

app.get("/", (req, res) => {
  res.send("Hello world\n");
});

app.get("/pg", (req, res) => {
  // //pg接続
  // client.connect();

  // //クエリの作成
  // const query = {
  //   text: "SELECT * FROM testTable",
  // };

  // //INSERTの場合
  // //const query = {
  // //  text: "INSERT INTO member VALUES ($1, $2)",
  // //  values: [1, "山田太郎"],
  // //};

  // client
  // .query(query)
  // .then((res) => {
  //   console.log(res);
  //   client.end();
  // })
  // .catch((e) => console.error(e.stack));

  client.query('SELECT * FROM testTable', (error, results) => {
    if (error) {
      console.error('クエリエラー:', error);
      res.status(500).json({ error: 'データベースエラー' });
    } else {
      res.json(results.rows);
    }
  });


});

app.listen(3000);