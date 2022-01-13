require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const environment = process.env.NODE_ENV; // development
const stage = require('./config')[environment];
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { validateToken } = require('./utils');
const typeDefs = require('./schema');
const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const Issue = require('./resolvers/counts');

// resolvers
const resolvers = {
  Query,
  Mutation,
  Issue,
};

const app = express();

// apollo & express server startup logic
const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        ...req,
        payload: req && req.headers.authorization ? validateToken(req) : null,
      };
    },
  });

  // logger
  if (environment === 'development') {
    //app.use(morgan("dev"));
  }

  // database connection startup
  await mongoose
    .connect(process.env.MONGO_LOCAL_CONN_URL)
    .then((result) => console.log('Connected to the database'))
    .catch((err) => console.log(err));

  // application level middleware
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  await server.start();
  server.applyMiddleware({
    app,
  });

  // modified server startup
  await new Promise((resolve) => app.listen(`${stage.port}`, resolve));
  console.log(`Server ready at http://localhost:8080${server.graphqlPath}`);
};
startApolloServer(typeDefs, resolvers);

module.exports = app;
