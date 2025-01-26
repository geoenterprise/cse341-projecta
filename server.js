const express = require('express');
const mongodb = require('./data/db');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Headers', 'GET, POST, PUT, DELETE');
  req.setHeader('Origin, X-Requested-With, Content-Type, Accept, Z-key');
  next();
});
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and running on port ${port}`);
    });
  }
});
