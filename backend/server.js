const { gql, ApolloServer } = require('apollo-server');
const { GraphQLSchema, GraphQLObjectType, printSchema } = require('graphql');

const gapiToGraphQL = require('gapi-to-graphql').default;
const mapApi = require('gapi-to-graphql/dist/mapApi').mapApi;
const parseSchemas = require('gapi-to-graphql/dist/parseSchemas').default;
const {
  mapParametersToArguments
} = require('gapi-to-graphql/dist/mapParametersToArguments');
const { mapResources } = require('gapi-to-graphql/dist/mapResources');
const { keys, upperFirst } = require('gapi-to-graphql/dist/utils');
const YouTubeAPI = require('gapi-to-graphql/google_apis/youtube-v3.js').default;

function getSchema({
  name,
  id,
  description,
  parameters,
  version,
  resources,
  baseUrl,
  schemas
}) {
  const queryResolvers = {};

  const graphQLTypes = parseSchemas(schemas);

  const APIResources = `${upperFirst(name)}Resources`;

  const queryTypeName = `${upperFirst(name)}ApiQuery`;

  const resolvers = {};
  resolvers[queryTypeName] = {
    [`${upperFirst(name)}Api`]: (_, args) => ({
      rootArgs: args,
      rootDefinitions: parameters,
      baseUrl
    })
  };

  const resourceResolvers = {};
  resolvers[APIResources] = resourceResolvers;

  const fields = mapResources(
    resources,
    graphQLTypes,
    resourceResolvers,
    resolvers
  );

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: queryTypeName,
      fields: {
        [`${upperFirst(name)}Api`]: {
          args: mapParametersToArguments(parameters, 'Root'),
          type: new GraphQLObjectType({
            name: APIResources,
            fields
          })
        }
      }
    })
  });

  const typeDefs = gql`
    ${printSchema(schema)}
  `;
  console.log(Object.keys(schema));
  console.log(Object.keys(typeDefs));
  // console.log(typeDefs);

  return { typeDefs: schema, resolvers };
}

const typeDefs2 = gql`
  type Query {
    bla: Int
  }
`;

// console.log(resolvers);
const resolvers2 = {
  OtherQuery: {
    bla() {
      return 4;
    }
  }
};

const { typeDefs, resolvers } = getSchema(YouTubeAPI);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
