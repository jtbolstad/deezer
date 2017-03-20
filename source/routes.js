import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import ArtistSearch from 'containers/ArtistSearch';
import NotFound from 'components/NotFound/NotFound';

export default class Routes extends Component {

  render() {
    return (
      <Router history={ browserHistory }>
        <Route path='/(:artist_id/:artist)(/:album_id/:album)' component={ ArtistSearch } />
        <Route path='*' component={ NotFound } />
      </Router>
    );
  }
}
