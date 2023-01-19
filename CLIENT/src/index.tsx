import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { RouterProvider } from 'react-router-dom';
import {router} from './router/index'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, gql } from '@apollo/client';

const container = document.getElementById('root')!;
const root = createRoot(container);

const getAuth = () => {
  const token = localStorage.getItem('user-token')
  return token ? token : null
}

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache,
  link: new HttpLink({
    headers: {
      authorization: getAuth()
    },
    uri: 'http://localhost:4000'
  })
})

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} /> 
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

