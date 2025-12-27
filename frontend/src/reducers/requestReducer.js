import * as types from '../actions/requestActions';

const initialState = {
  requests: [],
  loading: false,
  error: null,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_REQUESTS_REQUEST:
    case types.CREATE_REQUEST_REQUEST:
    case types.UPDATE_REQUEST_REQUEST:
    case types.DELETE_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.payload,
      };

    case types.CREATE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: [...state.requests, action.payload],
      };

    case types.UPDATE_REQUEST_SUCCESS:
    case types.UPDATE_REQUEST_STAGE:
      return {
        ...state,
        loading: false,
        requests: state.requests.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case types.DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: state.requests.filter((item) => item.id !== action.payload),
      };

    case types.FETCH_REQUESTS_FAILURE:
    case types.CREATE_REQUEST_FAILURE:
    case types.UPDATE_REQUEST_FAILURE:
    case types.DELETE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default requestReducer;