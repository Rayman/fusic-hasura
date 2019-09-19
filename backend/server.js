const { gql, ApolloServer, UserInputError } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');
var assert = require('assert');

const typeDefs = gql`
  type SearchResult {
    id: String!
    title: String!
    description: String!
    thumbnail: String!
  }

  type Query {
    search(q: String!): [SearchResult]
  }
`;

const resolvers = {
  Query: {
    async search(parent, { q }, { dataSources }, info) {
      const result = await dataSources.youtubeAPI.search(q);
      assert.equal(result.kind, 'youtube#searchListResponse');
      return result.items;
    }
  },
  SearchResult: {
    id(result) {
      assert.equal(result.id.kind, 'youtube#video');
      return result.id.videoId;
    },

    title(result) {
      return result.snippet.title;
    },

    description(result) {
      return result.snippet.description;
    },

    thumbnail(result) {
      return result.snippet.thumbnails.default.url;
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

  search(q) {
    return this.get('search', {
      q,
      part: 'snippet',
      type: 'video'
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

const port = process.env.PORT || 4000;
server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
