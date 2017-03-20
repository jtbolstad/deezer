import React from 'react';
import { Link } from 'react-router';

const Albums = (props) =>
  props.albums && <div className='albums'>
    <div className='albums--title'>Search results for &lsquo;{props.artist.name}&rsquo;</div>
    <div className='albums--title'>Albums</div>
    <div className='albums--wrap'>
      <div className='albums--grid'>{

        props.albums.map((album, idx) => (
          <div key={ idx } className='album--container'>
            <Link
              title={ album.title }
              to={ `/${ props.artist.id }/${ props.slashToUnderscore(props.artist.name) }/${ album.id }/${ props.slashToUnderscore(album.title) }` }
              className='primary_color'
            >
              <img src={ album.cover_medium } alt={ album.title } />
              <div className='album--title'>{album.title}</div>
            </Link>
          </div>)
        )}

        { /* Invisible placeholders so flex-box "justify-content:space-between"
           * works on rows with < 5 items. (First or last row.)
           */}
        <div className='placeholder album--container'></div>
        <div className='placeholder album--container'></div>
        <div className='placeholder album--container'></div>
        <div className='placeholder album--container'></div>

      </div>
    </div>
  </div>;

export default Albums;