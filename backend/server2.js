const { gql, ApolloServer } = require('apollo-server');

const typeDefs = gql`
  type SearchResult {
    name: String
  }

  type Query {
    search: [SearchResult]
  }
`;

const resolvers = {
  Query: {
    search(parent, args, context, info) {
      return [{ name: 'omg' }]; //find(authors, { id: args.id });
    }
  },
  SearchResult: {
    name(result) {
      return 'bla' + result.name;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
  //   context: ({ req }) => ({
  //     authScope: getScope(req.headers.youtube_api_key),
  //   })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
