import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { first, debounce } from 'lodash';

import { loadArtists, loadAlbums, loadTracks } from 'actions/deezer';

/**
 *  Main Component (containing data):
 *    ArtistSearch
 *
 *  Subcomponents (dumb component without data, just rendering props):
 *    Artists (search result)
 *    Albums
 *    Tracks
 */

class ArtistSearch extends React.Component {

  constructor(props) {
    super(props);

    /**
     * Populate component state (not Redux store) with preselected artist/album from route.
     * If tracks album loads first we can't show release date - it comes with album data.
     * Can use Promise.all to ensure we get both before rendering.
     * See props.album.release_date in Tracks component below.
     */
    this.state = {
      artistFilter: '',
      selectedArtist: { id: props.params.artist_id, name: props.params.artist },
      selectedAlbum: { id: props.params.album_id, title: props.params.album },
    };
  }


  /**
   * React lifecycle methods
   * =========================================
   */
  componentDidMount() {

    // Load artist data if artist id is set
    if (this.state.selectedArtist.id) {
      this.props.dispatch(
        loadAlbums(this.state.selectedArtist.id, false)
      );
    }
    // Load album data if album id is set
    if (this.state.selectedAlbum.id) {
      this.props.dispatch(
        loadTracks(this.state.selectedAlbum.id)
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    /**
     * This component updates when route changes
     * and route props propagates down here.
     * Will load data if needed.
     */
    const artist = {
      prev: this.props.params.artist_id,
      next: nextProps.params.artist_id,
      nextName: nextProps.params.artist,
    };
    const album = {
      prev: this.props.params.album_id,
      next: nextProps.params.album_id,
      nextTitle: nextProps.params.album,
    };


    if (artist.prev !== artist.next) {
      this.props.dispatch(
        loadAlbums(artist.next)
      );
      this.setState({ 'selectedArtist': { 'id': artist.next, 'name': artist.nextName } });
      // Scroll back to top again when loading albums from new artist
      // this.refs.scrollTop = 0;

    } else if (album.prev !== album.next) {
      // Clear search field
      this.setState({ artistFilter: '' });
      this.props.dispatch(
        loadTracks(album.next)
      );
      this.setState({ 'selectedAlbum': { 'id': album.next, 'name': album.nextTitle } });

    }
  }



  /**
   * HELPER FUNCTIONS
   * =========================================
   */

  // Trigger api request to get artists
  doSearch = () => {
    this.props.dispatch(
      loadArtists(this.state.artistFilter)
    );
  }

  // Debounce search to avoid requests on every keystroke
  debouncedDoSearch = debounce(this.doSearch, 300);

  // Handle keystrokes / input in search field
  handleChange = (event) => {
    const artistFilter = event.target.value;
    this.setState({ artistFilter }); // { artistFilter } = { artistFilter: artistFilter }
    this.debouncedDoSearch();
  }

  // Convert seconds to "min:sec". Eg 207 -> "3:27"
  secondsToMinutes = (seconds) => `${ parseInt(seconds / 60, 10) }:${ (`0${ seconds % 60 }`).slice(-2) }`

  // Slashes in artist names or album titles messes up route handling, so replace them
  slashToUnderscore = (string) => string.replace('/', '%2F')


  /**
   * MAIN COMPONENT
   * =========================================
   */
  render() {
    return (

      <div className="main">

        <div className='search' role='search'>
          <div className="form">
            <input type='text' value={ this.state.artistFilter } onChange={ this.handleChange } placeholder={ 'Search here' } />
            <input type='button' value='Search' className='primary_background' />
          </div>
        </div>


        { // SEARCH RESULT
          // Display only if artistFilter is set
        this.state.artistFilter &&
        this.props.artists && this.props.artists.length > 0 &&
          <div className='searchResult'>
            <div className='arrow' />
            <Artists
              artists={ this.props.artists }
              slashToUnderscore={ this.slashToUnderscore }
            />
          </div>
        }


        <div className='loaderWrapper'>
          { // LOADING SPINNER
          this.props.isLoading  && this.state.artistFilter ?
            <div className='loader'></div> : null
          }
        </div>


        { // ALBUM LISTING
          this.props.albums && this.props.albums.length > 0 &&
          <Albums
            artist={ this.state.selectedArtist }
            albums={ this.props.albums }
            slashToUnderscore={ this.slashToUnderscore }
            dispatch={ this.props.dispatch }
          />
        }


        { // TRACK LISTING
          this.props.tracks && this.props.tracks.length > 0 &&
          <Tracks
            artist={ this.state.selectedArtist }
            album={ first(this.props.albums.filter(
              el => el.id === parseInt(this.state.selectedAlbum.id, 10)))
            }
            tracks={ this.props.tracks }
            dispatch={ this.props.dispatch }
            secondsToMinutes={ this.secondsToMinutes }
          />
        }

      </div>
    );
  }
}

/**
 * Stateless functional components
 * =========================================
 */

/**
 *  These components are so small they stay in the parent component file.
 *  When adding more markup for eg schema, aria etc it will probably be
 *  better so move them to separate files.
 */

const Artists = (props) =>
  props.artists && <div className='artists'>
    <div className='title'>Search results:</div>{
      props.artists.map((art, idx) => (
        <Link to={ `/${ art.id }/${ props.slashToUnderscore(art.name) }` } key={ idx }> {art.name}</Link>)
      )
    }
  </div>;


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
        <div className='placeholder album--container'></div>
        <div className='placeholder album--container'></div>
        <div className='placeholder album--container'></div>
        <div className='placeholder album--container'></div>
      </div>
    </div>
  </div>;


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

// END COMPONENTS


ArtistSearch.propTypes = {
  params: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  artists: React.PropTypes.array,
  albums: React.PropTypes.array,
  tracks: React.PropTypes.array,
};


const mapStateToProps = state => ({
  artists: state.deezer.artists,
  albums: state.deezer.albums,
  tracks: state.deezer.tracks,
  isLoading: state.deezer.isLoading,
});


export default connect(mapStateToProps)(ArtistSearch);
