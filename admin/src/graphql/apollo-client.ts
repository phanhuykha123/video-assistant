import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8000/graphql'
});

// Cache implementation
const cache = new InMemoryCache({ addTypename: false });

const cacheObject = {
  link: httpLink,
  cache
};

// Create the apollo client
const apolloClient = new ApolloClient(cacheObject);

export default apolloClient;
