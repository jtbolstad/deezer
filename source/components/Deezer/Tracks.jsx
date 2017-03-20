import React from 'react';

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