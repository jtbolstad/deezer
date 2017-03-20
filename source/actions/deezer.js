
export function loadArtists(artistName = '') {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: 'LOAD_ARTISTS_REQUEST' });
    let action;
    if (artistName !== '') {
      action = axios.get(`/api/search/artist?q=${ artistName }`)
        // Proxied: http://api.deezer.com/search/artist?q=prince
        .then(res => {
          dispatch({
            type: 'LOAD_ARTISTS_SUCCESS',
            payload: res.data,
          });
        });
    } else {
      action = dispatch({
        type: 'CLEAR_ARTISTS',
        payload: {},
      });
    }
    return action;
  };
}

export function loadAlbums(artistId = 0, clearTracks = true) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: 'LOAD_ALBUMS_REQUEST' });

    // When loading albums and tracks when entering the app
    // on an album url, album loading should clear tracks.
    // http://localhost:3000/617/Frank%20Sinatra/9205669/London
    if (clearTracks) {dispatch({ type: 'CLEAR_TRACKS' });}

    return axios.get(`/api/artist/${ artistId }/albums`)
      // Proxied: http://api.deezer.com/artist/1878/albums
      .then(res => {
        dispatch({
          type: 'LOAD_ALBUMS_SUCCESS',
          payload: res.data,
        });
      });
  };
}

export function loadTracks(albumId = 0) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: 'LOAD_TRACKS_REQUEST' });
    return axios.get(`/api/album/${ albumId }/tracks`)
      // Proxied: http://api.deezer.com/album/8683293/tracks
      .then(res => {
        dispatch({
          type: 'LOAD_TRACKS_SUCCESS',
          payload: res.data,
        });
      });
  };
}
