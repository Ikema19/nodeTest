const express = require("express");
const app = express();
const { Pool } = require("pg");

//postgresql
const pool = new Pool({
  user: "kirumo",
  host: "dpg-cl09ib237rbc738kmpsg-a",
  database: "kirumo",
  password: "rUT0ctuPLQOFupoZTjxRUVn0blp7gnSp",
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // サーバーのSSL証明書検証を無効にする場合
  },
});

app.get("/", (req, res) => {
  res.send("Hello world\n");
});

app.get("/pg", (req, res) => {

  pool.query('SELECT * FROM sampletable', (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'An error occurred', details: error.message });
    } else {
      // クエリ結果をJSON形式でクライアントに返す
      res.json(results.rows);
    }
  });

});

app.listen(3000);
console.log("server listening...");