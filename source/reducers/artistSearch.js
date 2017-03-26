const initialState = {
  artists: [],
  albums: [],
  tracks: [],
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
        // Filter out arists without albums
        artists: action.payload.data.filter(a => a.nb_album > 0),
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
    case 'CLEAR_TRACKS':
      return { ...state,
        tracks: [] };

    default:
      return state;
  }
}
