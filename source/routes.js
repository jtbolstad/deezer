import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Deezer from 'components/Deezer';
import NotFound from 'components/NotFound';

export default class Routes extends Component {

  render() {
    return (
      <Router history={ browserHistory }>
        <Route path='/(:artist_id/:artist)(/:album_id/:album)' component={ Deezer } />
        <Route path='*' component={ NotFound } />
      </Router>
    );
  }
}
