
import React from 'react';
import { connect } from 'react-redux';
import { first, debounce } from 'lodash';
import { loadArtists, loadAlbums, loadTracks } from 'actions/artistSearch';

/**
 * Stateless functional components
 * =========================================
 */
import Artists from 'components/ArtistSearch/Artists'
import Albums from 'components/ArtistSearch/Albums'
import Tracks from 'components/ArtistSearch/Tracks'


/**
 *  ARTIST SEARCH
 *
 *  Main Component (containing data):
 *    ArtistSearch
 *
 *  Subcomponents (dumb component without data, just rendering props):
 *    Artists (search result)
 *    Albums
 *    Tracks
 */

class ArtistSearch extends React.Component {

  state = {
    artistFilter: ''
  }


  /**
   * React lifecycle methods
   * =========================================
   */
  componentDidMount() {

    // Load artist data if artist id is set
    if (this.props.params.artist_id) {
      this.props.dispatch(
        loadAlbums(this.props.params.artist_id, false)
      );
    }
    // Load album data if album id is set
    if (this.props.params.album_id) {
      this.props.dispatch(
        loadTracks(this.props.params.album_id)
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
      // this.setState({ 'selectedArtist': { 'id': artist.next, 'name': artist.nextName } });

    } else if (album.prev !== album.next) {

      // Clear search field
      this.setState({ artistFilter: '' });
      this.props.dispatch(
        loadTracks(album.next)
      );
      // this.setState({ 'selectedAlbum': { 'id': album.next, 'name': album.nextTitle } });

    }
  }



  /**
   * HELPER FUNCTIONS
   * =========================================
   */


  /**
   * Trigger api request to get artists
   */
  doSearch = () => {
    this.props.dispatch(
      loadArtists(this.state.artistFilter)
    );
  }


  /**
   * Debounce search to avoid requests on every keystroke
   * Search triggers 300ms after last keystroke.
   * (Throttle will trigger search on first keystroke, then
   * wait the specified time.)
   */
  debouncedDoSearch = debounce(this.doSearch, 300);


  /**
   * Handle keystrokes / input in search field
   * @param  {keyPressEvent} event
   */
  handleChange = (keyPressEvent) => {
    const artistFilter = keyPressEvent.target.value;
    this.setState({ artistFilter }); // { artistFilter } = { artistFilter: artistFilter }
    this.debouncedDoSearch();
  }


  /**
   * Convert seconds to "min:sec"
   * @param  {number} seconds
   * @return {string} Track duration formatted as M:SS, eg 207 ->  "3:27"
   */
  secondsToMinutes = (seconds) => `${ parseInt(seconds / 60, 10) }:${ (`0${ seconds % 60 }`).slice(-2) }`


  /**
   * Slashes in artist names or album titles messes up route handling, so replace them
   * @param  {pathname} string
   * @return {string}
   */
  slashToUnderscore = (pathname) => pathname.replace('/', '%2F')


  /**
   * MAIN COMPONENT
   * =========================================
   *
   * The search form autocompletes by loading data from the backend api as
   * the user enters more letters in the input field. Therefore the search
   * button has no real function in this app.
   */

  render() {

    const selectedArtist = { id: this.props.params.artist_id, name: this.props.params.artist };
    const selectedAlbum = { id: this.props.params.album_id, title: this.props.params.album };

    return (

      <div className="main">

        <div className='search' role='search'>
          <div className="form">
            <input type='text' value={ this.state.artistFilter } onChange={ this.handleChange } placeholder={ 'Search here' } />
            <input type='button' value='Search' className='primaryBackground' />
          </div>
        </div>


        { // SEARCH RESULT
          // Display only if artistFilter is set
        this.state.artistFilter
        && this.props.artists
        && this.props.artists.length > 0 &&
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
          this.props.albums
          && this.props.albums.length > 0 &&
          <Albums
            artist={ selectedArtist }
            albums={ this.props.albums }
            slashToUnderscore={ this.slashToUnderscore }
            dispatch={ this.props.dispatch }
          />
        }


        { // TRACK LISTING
          this.props.tracks
          && this.props.tracks.length > 0 &&
          <Tracks
            artist={ selectedArtist }
            album={ first(this.props.albums.filter(
              el => el.id === parseInt(selectedAlbum.id, 10)))
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


ArtistSearch.propTypes = {

  /** @type {object} Route parameters: artist id, artist name [, album id, album title ] */
  params: React.PropTypes.object,

   /** @type {func} Dispatch funtion from Redux store */
  dispatch: React.PropTypes.func,

  /** @type {array} Artist data from api. Mapped from state.  */
  artists: React.PropTypes.array,

  /** @type {array} Album data from api. Mapped from state.  */
  albums: React.PropTypes.array,

   /** @type {array} Track data from api. Mapped from state */
  tracks: React.PropTypes.array,
};


/**
 * Makes Redux state available as props in the component
 * (ref initialState in reducers/artistSearch.js)
 */
const mapStateToProps = state => ({
  artists: state.deezer.artists,
  albums: state.deezer.albums,
  tracks: state.deezer.tracks,
  isLoading: state.deezer.isLoading,
});


export default connect(mapStateToProps)(ArtistSearch);
