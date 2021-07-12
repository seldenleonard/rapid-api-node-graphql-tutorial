var express = require('express');
var expressGraphQL = require('express-graphql');
var graphql = require('graphql');

var schema = graphql.buildSchema(`
  type User {
    name: String
  }
  type Query {
    user: User
  }
`);

var rootResolver = {
  user: () => {
    return {name: "John Doe"};
  },
};

var app = express();
app.use('/graphql', expressGraphQL({
  schema: schema,
  rootValue: rootResolver,
  graphiql: true,
}));
app.listen(3000);
console.log('GraphQL server listening at localhost:3000/graphql');