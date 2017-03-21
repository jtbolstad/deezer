import React from 'react';

/**
 * TRACK LIST
 *
 * @class      Tracks (name)
 * @param      {<type>}  props   The properties
 * @return     {<type>}  { description_of_the_return_value }
 *

  Example API call:
    http://api.deezer.com/album/8683293/tracks

  Example track object:
    {
      "id": 86088549,
      "readable": true,
      "title": "PLECTRUMELECTRUM",
      "title_short": "PLECTRUMELECTRUM",
      "title_version": "",
      "isrc": "USWB11402400",
      "link": "http://www.deezer.com/track/86088549",
      "duration": 291,
      "track_position": 4,
      "disk_number": 1,
      "rank": 342811,
      "explicit_lyrics": false,
      "preview": "http://cdn-preview-0.deezer.com/stream/0c03e5253ced59c01646618da2032655-1.mp3",
      "artist": {
      "id": 1878,
      "name": "Prince",
      "tracklist": "http://api.deezer.com/artist/1878/top?limit=50",
      "type": "artist"
      },
      "type": "track"
    }
 */

const Tracks = (props) =>
  props.tracks && <div className='tracks'>
    <table>
      <thead>
        <tr>
          <td>{
          props.album &&
            <div>
              <img src={ props.album.cover_medium } alt={ `Album cover: ${ props.album && props.album.title }` } />
            </div>
          }
          </td><td colSpan='5'>
            <div className='tracks--title primary_color'>{props.album && props.album.title}</div>
          </td></tr>
        <tr>
          <td />
          <td className='rightAlign'>#</td>
          <td>Title</td>
          <td>Artist</td>
          <td className='rightAlign'>Time</td>
          <td>Released</td>
        </tr>
      </thead>

      <tbody>{
        props.tracks && props.tracks.map((track, idx) => (
          <tr key={ idx }>
            <td />
            <td className='rightAlign'>{track.track_position}</td>
            <td>{track.title}</td>
            <td>{track.artist.name}</td>
            <td className='rightAlign'>{props.secondsToMinutes(track.duration)}</td>
            <td>{props.album
              && props.album.release_date
              && props.album.release_date.split('-')[0]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>;

  export default Tracks;