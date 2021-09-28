const { ApolloServer, gql } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
require('dotenv').config();
const express = require('express');
const http = require('http');
const db = require('./config/database.ts');
const typeDefs = require('./types/typeDefs');
const resolvers = require('./resolvers/resolvers');
const cors = require('cors');
bodyParser = require('body-parser');


const port  = process.env.PORT;

// Connect database
db.connect();

app = express().use(bodyParser.json());
const httpServer = http.createServer(app);
const route = require('./routes');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
route(app);

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}
startApolloServer();


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});