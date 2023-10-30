const express = require("express");
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'postgres://nodetest_db_user:CTW7UiWH7fzDAVdxqxMAZCzegPJ7aHQy@dpg-ckvgbi6b0mos739evjog-a/nodetest_db',
  user: 'nodetest_db_user',
  password: 'CTW7UiWH7fzDAVdxqxMAZCzegPJ7aHQy',
  database: 'nodetest_db'
});

app.get("/", (req, res) => {
  res.send("Hello world\n");
});

app.get("/mysql", (req, res) => {
	 connection.query(
    'SELECT * FROM users',
    (error, results) => {
      console.log(results);
      res.send(results);
    }
  );
});

app.listen(3000);