const {ApolloServer} = require('apollo-server');
const resolversTodo = require('./resolvers/todo.resolver');
const typeDefs = require('./infrastructure/graphql.import');
const { combineResolvers } = require('apollo-resolvers');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://YOUUSER:YOURPASSWOR@YOURCLUSTER/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
const db = mongoose.connection;
const resolvers = combineResolvers([resolversTodo]);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
  });
  
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
