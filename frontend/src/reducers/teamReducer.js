import * as types from '../actions/teamActions';

const initialState = {
  teams: [],
  loading: false,
  error: null,
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TEAMS_REQUEST:
    case types.CREATE_TEAM_REQUEST:
    case types.UPDATE_TEAM_REQUEST:
    case types.DELETE_TEAM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        teams: action.payload,
      };

    case types.CREATE_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        teams: [...state.teams, action.payload],
      };

    case types.UPDATE_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        teams: state.teams.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case types.DELETE_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        teams: state.teams.filter((item) => item.id !== action.payload),
      };

    case types.FETCH_TEAMS_FAILURE:
    case types.CREATE_TEAM_FAILURE:
    case types.UPDATE_TEAM_FAILURE:
    case types.DELETE_TEAM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default teamReducer;