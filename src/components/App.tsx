import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Home from '../components/Home';
import Book from '../containers/Book';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <div className="container-fluid content">
          <Route exact path="/" component={Home} />
          <Route path="/book" component={Book} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
