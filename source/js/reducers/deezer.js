const initialState = {
  artists: [],
  albums: [],
  tracks: [],
  lastFetched: null,
  isLoading: false,
  error: null,
};

export default function deezer(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_ARTISTS_REQUEST':
      return { ...state,
        isLoading: true,
        error: null };
    case 'LOAD_ARTISTS_SUCCESS':
      return { ...state,
        artists: action.payload.data,
        isLoading: false };
    case 'LOAD_ARTISTS_FAILURE':
      return { ...state,
        error: action.payload };

    case 'CLEAR_ARTISTS':
      return { ...state,
        artists: [] };

    case 'LOAD_ALBUMS_REQUEST':
      return { ...state,
        isLoading: true,
        error: null };
    case 'LOAD_ALBUMS_SUCCESS':
      return { ...state,
        artists: [],
        albums: action.payload.data,
        tracks: [],
        isLoading: false };
    case 'LOAD_ALBUMS_FAILURE':
      return { ...state,
        error: action.payload };


    case 'LOAD_TRACKS_REQUEST':
      return { ...state,
        isLoading: true,
        error: null };
    case 'LOAD_TRACKS_SUCCESS':
      return { ...state,
        tracks: action.payload.data,
        isLoading: false };
    case 'LOAD_TRACKS_FAILURE':
      return { ...state,
        error: action.payload };

    default:
      return state;
  }
}

// Selector functions (not currently used)
export const selectArtists = state => state.deezer.artists;
export const selectAlbums = state => state.deezer.albums;
export const selectTracks = state => state.deezer.tracks;
