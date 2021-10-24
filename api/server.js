const express = require( 'express' );
const { ApolloServer } = require( 'apollo-server-express' );
const typeDefs = require( './src/schema' );
const resolvers = require( './src/resolver' );

const server = new ApolloServer( {
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
} );

const app = express();
server.applyMiddleware( { app, bodyParserConfig: true } );
app.use( '/uploads', express.static( 'src' ) );
app.listen( { port: 4000 }, () =>
    console.log( `🚀 Server ready at http://localhost:4000${ server.graphqlPath }` )
);