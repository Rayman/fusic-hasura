const { gql, ApolloServer } = require('apollo-server');
const gapiToGraphQL = require('gapi-to-graphql').default;
const YouTubeAPI = require('gapi-to-graphql/google_apis/youtube-v3.js').default;
const { schema, resolvers } = gapiToGraphQL({ gapiAsJsonSchema: YouTubeAPI });

const server = new ApolloServer({
  typeDefs: gql`
    ${schema}
  `,
  resolvers
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
