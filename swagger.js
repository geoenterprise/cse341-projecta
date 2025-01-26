require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API to manage contacts',
  },
  //   host: 'cse341-xu0r.onrender.com',
  //   schemes: ['https'],
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generates swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
