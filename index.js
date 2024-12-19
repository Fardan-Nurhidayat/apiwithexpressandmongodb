const express = require('express');
const cors = require('cors');
const router = require('./routes');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello Fardan!").status(201);
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});