import requestApi from '../api/index';

// Action Types
export const FETCH_REQUESTS_REQUEST = 'FETCH_REQUESTS_REQUEST';
export const FETCH_REQUESTS_SUCCESS = 'FETCH_REQUESTS_SUCCESS';
export const FETCH_REQUESTS_FAILURE = 'FETCH_REQUESTS_FAILURE';

export const CREATE_REQUEST_REQUEST = 'CREATE_REQUEST_REQUEST';
export const CREATE_REQUEST_SUCCESS = 'CREATE_REQUEST_SUCCESS';
export const CREATE_REQUEST_FAILURE = 'CREATE_REQUEST_FAILURE';

export const UPDATE_REQUEST_REQUEST = 'UPDATE_REQUEST_REQUEST';
export const UPDATE_REQUEST_SUCCESS = 'UPDATE_REQUEST_SUCCESS';
export const UPDATE_REQUEST_FAILURE = 'UPDATE_REQUEST_FAILURE';

export const UPDATE_REQUEST_STAGE = 'UPDATE_REQUEST_STAGE';

export const DELETE_REQUEST_REQUEST = 'DELETE_REQUEST_REQUEST';
export const DELETE_REQUEST_SUCCESS = 'DELETE_REQUEST_SUCCESS';
export const DELETE_REQUEST_FAILURE = 'DELETE_REQUEST_FAILURE';

// Action Creators
export const fetchRequests = (params) => async (dispatch) => {
  dispatch({ type: FETCH_REQUESTS_REQUEST });
  try {
    const data = await requestApi.getAll(params);
    dispatch({ type: FETCH_REQUESTS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ 
      type: FETCH_REQUESTS_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};

export const createRequest = (requestData) => async (dispatch) => {
  dispatch({ type: CREATE_REQUEST_REQUEST });
  try {
    const data = await requestApi.create(requestData);
    dispatch({ type: CREATE_REQUEST_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ 
      type: CREATE_REQUEST_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};

export const updateRequest = (id, requestData) => async (dispatch) => {
  dispatch({ type: UPDATE_REQUEST_REQUEST });
  try {
    const data = await requestApi.update(id, requestData);
    dispatch({ type: UPDATE_REQUEST_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ 
      type: UPDATE_REQUEST_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};

export const updateRequestStage = (id, stage) => async (dispatch) => {
  try {
    const data = await requestApi.updateStage(id, stage);
    dispatch({ type: UPDATE_REQUEST_STAGE, payload: data });
    return data;
  } catch (error) {
    throw error;
  }
};

export const assignTechnician = (requestId, technicianId) => async (dispatch) => {
  try {
    const data = await requestApi.assignTechnician(requestId, technicianId);
    dispatch({ type: UPDATE_REQUEST_SUCCESS, payload: data });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = (id) => async (dispatch) => {
  dispatch({ type: DELETE_REQUEST_REQUEST });
  try {
    await requestApi.delete(id);
    dispatch({ type: DELETE_REQUEST_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ 
      type: DELETE_REQUEST_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};