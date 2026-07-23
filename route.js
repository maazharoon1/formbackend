const express = require('express');
const { FormController } = require('./controller');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/contact', FormController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});