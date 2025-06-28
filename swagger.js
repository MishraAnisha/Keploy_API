import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'User CRUD API',
    description: 'API docs for CRUD using swagger-autogen'
  },
  host: 'localhost:8000',
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./index.js']; // Entry point where all routes come together

swaggerAutogen()(outputFile, routes, doc);
