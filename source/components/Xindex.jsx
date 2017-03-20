import React from 'react';
import ArtistSearch from 'components/Deezer/ArtistSearch';

export default class Deezer extends React.Component {

  render() {
    return (
      <div className='Deezer'>
        <ArtistSearch { ...this.props } />
      </div>
    );
  }
}
