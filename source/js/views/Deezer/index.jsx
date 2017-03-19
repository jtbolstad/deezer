import React from 'react';
import ArtistSearch from 'views/Deezer/ArtistSearch';

export default class Deezer extends React.Component {

  render() {
    return (
      <div className='Deezer'>
        <ArtistSearch { ...this.props } />
      </div>
    );
  }
}
