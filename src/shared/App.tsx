import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProductGrid } from './components/layout/ProductGrid';
import { Product } from './components/product/Index';
import Page from './components/Page';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Switch>
      <Route exact={true} path="/" component={Page} />
      <Route exact={true} path="/product/:page/:id" component={Product} />
      <Route exact={true} path="/browse/:query/:size/:page" component={ProductGrid} />
    </Switch>
  </QueryClientProvider>
);

export default App;