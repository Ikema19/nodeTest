const express = require("express");
const app = express();
const { Pool } = require("pg");

//環境変数
require('dotenv').config();


//postgresql
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(!!process.env.PORT) ,
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