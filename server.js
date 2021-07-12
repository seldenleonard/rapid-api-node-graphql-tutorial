var express = require('express');
var expressGraphQL = require('express-graphql').graphqlHTTP;
// THE LINE OF CODE ABOVE OR COMMENTED-OUT BELOW ARE BOTH ADEQUATE
// var { graphqlHTTP } = require('express-graphql');
var graphql = require('graphql');

var schema = graphql.buildSchema(`
  type Post {
    text: String
  }
  type User {
    name: String
    posts: [Post]
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