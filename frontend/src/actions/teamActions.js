import teamApi from '../api/index';

// Action Types
export const FETCH_TEAMS_REQUEST = 'FETCH_TEAMS_REQUEST';
export const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS';
export const FETCH_TEAMS_FAILURE = 'FETCH_TEAMS_FAILURE';

export const CREATE_TEAM_REQUEST = 'CREATE_TEAM_REQUEST';
export const CREATE_TEAM_SUCCESS = 'CREATE_TEAM_SUCCESS';
export const CREATE_TEAM_FAILURE = 'CREATE_TEAM_FAILURE';

export const UPDATE_TEAM_REQUEST = 'UPDATE_TEAM_REQUEST';
export const UPDATE_TEAM_SUCCESS = 'UPDATE_TEAM_SUCCESS';
export const UPDATE_TEAM_FAILURE = 'UPDATE_TEAM_FAILURE';

export const DELETE_TEAM_REQUEST = 'DELETE_TEAM_REQUEST';
export const DELETE_TEAM_SUCCESS = 'DELETE_TEAM_SUCCESS';
export const DELETE_TEAM_FAILURE = 'DELETE_TEAM_FAILURE';

// Action Creators
export const fetchTeams = () => async (dispatch) => {
  dispatch({ type: FETCH_TEAMS_REQUEST });
  try {
    const data = await teamApi.getAll();
    dispatch({ type: FETCH_TEAMS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ 
      type: FETCH_TEAMS_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};

export const createTeam = (teamData) => async (dispatch) => {
  dispatch({ type: CREATE_TEAM_REQUEST });
  try {
    const data = await teamApi.create(teamData);
    dispatch({ type: CREATE_TEAM_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ 
      type: CREATE_TEAM_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};

export const updateTeam = (id, teamData) => async (dispatch) => {
  dispatch({ type: UPDATE_TEAM_REQUEST });
  try {
    const data = await teamApi.update(id, teamData);
    dispatch({ type: UPDATE_TEAM_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ 
      type: UPDATE_TEAM_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};

export const deleteTeam = (id) => async (dispatch) => {
  dispatch({ type: DELETE_TEAM_REQUEST });
  try {
    await teamApi.delete(id);
    dispatch({ type: DELETE_TEAM_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ 
      type: DELETE_TEAM_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};