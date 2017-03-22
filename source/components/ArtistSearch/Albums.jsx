import React from 'react';
import { Link } from 'react-router';


/**
 * ALBUM LIST IN GRID
 *
 * @class      Albums (name)
 * @param      {<type>}  props   The properties
 * @return     {<type>}  { description_of_the_return_value }
 *

  Example API call:
    http://api.deezer.com/artist/1878/albums

  Example album object:
    {
      "id": 90959,
      "title": "Sign 'O' The Times",
      "link": "http://www.deezer.com/album/90959",
      "cover": "http://api.deezer.com/album/90959/image",
      "cover_small": "http://cdn-images.deezer.com/images/cover/1129f852f07e3f4ecf0009063ae5bf6d/56x56-000000-80-0-0.jpg",
      "cover_medium": "http://cdn-images.deezer.com/images/cover/1129f852f07e3f4ecf0009063ae5bf6d/250x250-000000-80-0-0.jpg",
      "cover_big": "http://cdn-images.deezer.com/images/cover/1129f852f07e3f4ecf0009063ae5bf6d/500x500-000000-80-0-0.jpg",
      "cover_xl": "http://cdn-images.deezer.com/images/cover/1129f852f07e3f4ecf0009063ae5bf6d/1000x1000-000000-80-0-0.jpg",
      "genre_id": 132,
      "fans": 14730,
      "release_date": "1987-07-06",
      "record_type": "album",
      "tracklist": "http://api.deezer.com/album/90959/tracks",
      "explicit_lyrics": true,
      "type": "album"
    }
*/

const Albums = (props) =>
  props.albums && <div className='albums'>
    <div className='albums__title'>Search results for &lsquo;{props.artist.name}&rsquo;</div>
    <div className='albums__title'>Albums</div>
    <div className='albums__wrap'>
      <div className='albums__grid'>{

        props.albums.map((album, idx) => (
          <div key={ idx } className='album__container'>
            <Link
              title={ album.title }
              to={ `/${ props.artist.id }/${ props.slashToUnderscore(props.artist.name) }/${ album.id }/${ props.slashToUnderscore(album.title) }` }
              className='primaryColor'
            >
              <img src={ album.cover_medium } alt={ album.title } />
              <div className='album__title'>{album.title}</div>
            </Link>
          </div>)
        )}

        { /* Invisible placeholders so flex-box "justify-content:space-between"
           * works on rows with < 5 items. (First or last row.)
           */}
        <div className='placeholder album__container'></div>
        <div className='placeholder album__container'></div>
        <div className='placeholder album__container'></div>
        <div className='placeholder album__container'></div>

      </div>
    </div>
  </div>;

export default Albums;