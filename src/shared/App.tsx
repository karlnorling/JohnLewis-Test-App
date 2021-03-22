import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProductGrid } from './components/layout/ProductGrid';
import { Product } from './components/product/Index';
import Page from './components/Page';

const App = () => (
  <Switch>
    <Route exact={true} path="/" component={Page} />
    <Route exact={true} path="/product/:id" component={Product} />
    <Route exact={true} path="/browse/:query/:size" component={ProductGrid} />
  </Switch>
);

export default App;