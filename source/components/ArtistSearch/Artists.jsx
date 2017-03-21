import React from 'react';
import { Link } from 'react-router';

/**
 * ARTIST LIST AS SEARCH RESULT
 *
 * @param  {[type]} props [description]
 * @return {[type]}       [description]
 *

  Example API call:
    http://api.deezer.com/search/artist?q=zappa

  Example artist object:
    {
      "id": 2167,
      "name": "Frank Zappa",
      "link": "http://www.deezer.com/artist/2167",
      "picture": "http://api.deezer.com/artist/2167/image",
      "picture_small": "http://cdn-images.deezer.com/images/artist/0bc8a788f8333aeb54a68a01b27ce882/56x56-000000-80-0-0.jpg",
      "picture_medium": "http://cdn-images.deezer.com/images/artist/0bc8a788f8333aeb54a68a01b27ce882/250x250-000000-80-0-0.jpg",
      "picture_big": "http://cdn-images.deezer.com/images/artist/0bc8a788f8333aeb54a68a01b27ce882/500x500-000000-80-0-0.jpg",
      "picture_xl": "http://cdn-images.deezer.com/images/artist/0bc8a788f8333aeb54a68a01b27ce882/1000x1000-000000-80-0-0.jpg",
      "nb_album": 106,
      "nb_fan": 122635,
      "radio": true,
      "tracklist": "http://api.deezer.com/artist/2167/top?limit=50",
      "type": "artist"
    }
 */

const Artists = (props) =>
  props.artists && <div className='artists'>
    <div className='title'>Search results:</div>{
      props.artists.map((art, idx) => (
        <Link to={ `/${ art.id }/${ props.slashToUnderscore(art.name) }` } key={ idx }> {art.name}</Link>)
      )
    }
  </div>;

export default Artists;