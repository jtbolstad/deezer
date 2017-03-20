
/**
 * ARTISTS
 * =========================================
 */

import React from 'react';
import { Link } from 'react-router';

const Artists = (props) =>
  props.artists && <div className='artists'>
    <div className='title'>Search results:</div>{
      props.artists.map((art, idx) => (
        <Link to={ `/${ art.id }/${ props.slashToUnderscore(art.name) }` } key={ idx }> {art.name}</Link>)
      )
    }
  </div>;

export default Artists;