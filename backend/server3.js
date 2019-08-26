const { gql, ApolloServer, UserInputError } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

const typeDefs = gql`
  type SearchResult {
    name: String
  }

  type Query {
    search: [SearchResult]
    search2(q: String!): [SearchResult]
  }
`;

const resolvers = {
  Query: {
    search(parent, args, context, info) {
      return [{ name: 'omg' }]; //find(authors, { id: args.id });
    },
    search2(parent, { q }, { dataSources }, info) {
      return dataSources.youtubeAPI.search(q);
    }
  },
  SearchResult: {
    name(result) {
      return 'bla' + result.name;
    }
  }
};

class YoutubeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.googleapis.com/youtube/v3/';
  }

  willSendRequest(request) {
    if (!this.context.key)
      throw new UserInputError('Youtube API key was not set');
    request.params.set('key', this.context.key);
  }

  // an example making an HTTP DELETE request
  search(q) {
    return this.get('search', {
      q,
      part: 'snippet'
    });
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      youtubeAPI: new YoutubeAPI()
    };
  },
  context: ({ req }) => {
    // get the user token from the headers
    const key = req.headers.key;
    return { key };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
