import equipmentApi from '../api/index';

// Action Types
export const FETCH_EQUIPMENT_REQUEST = 'FETCH_EQUIPMENT_REQUEST';
export const FETCH_EQUIPMENT_SUCCESS = 'FETCH_EQUIPMENT_SUCCESS';
export const FETCH_EQUIPMENT_FAILURE = 'FETCH_EQUIPMENT_FAILURE';

export const FETCH_SINGLE_EQUIPMENT_REQUEST = 'FETCH_SINGLE_EQUIPMENT_REQUEST';
export const FETCH_SINGLE_EQUIPMENT_SUCCESS = 'FETCH_SINGLE_EQUIPMENT_SUCCESS';
export const FETCH_SINGLE_EQUIPMENT_FAILURE = 'FETCH_SINGLE_EQUIPMENT_FAILURE';

export const CREATE_EQUIPMENT_REQUEST = 'CREATE_EQUIPMENT_REQUEST';
export const CREATE_EQUIPMENT_SUCCESS = 'CREATE_EQUIPMENT_SUCCESS';
export const CREATE_EQUIPMENT_FAILURE = 'CREATE_EQUIPMENT_FAILURE';

export const UPDATE_EQUIPMENT_REQUEST = 'UPDATE_EQUIPMENT_REQUEST';
export const UPDATE_EQUIPMENT_SUCCESS = 'UPDATE_EQUIPMENT_SUCCESS';
export const UPDATE_EQUIPMENT_FAILURE = 'UPDATE_EQUIPMENT_FAILURE';

export const DELETE_EQUIPMENT_REQUEST = 'DELETE_EQUIPMENT_REQUEST';
export const DELETE_EQUIPMENT_SUCCESS = 'DELETE_EQUIPMENT_SUCCESS';
export const DELETE_EQUIPMENT_FAILURE = 'DELETE_EQUIPMENT_FAILURE';

// Action Creators
export const fetchEquipment = (params) => async (dispatch) => {
  dispatch({ type: FETCH_EQUIPMENT_REQUEST });
  try {
    const data = await equipmentApi.getAll(params);
    dispatch({ type: FETCH_EQUIPMENT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ 
      type: FETCH_EQUIPMENT_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};

export const fetchEquipmentById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_SINGLE_EQUIPMENT_REQUEST });
  try {
    const data = await equipmentApi.getById(id);
    dispatch({ type: FETCH_SINGLE_EQUIPMENT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ 
      type: FETCH_SINGLE_EQUIPMENT_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};

export const createEquipment = (equipmentData) => async (dispatch) => {
  dispatch({ type: CREATE_EQUIPMENT_REQUEST });
  try {
    const data = await equipmentApi.create(equipmentData);
    dispatch({ type: CREATE_EQUIPMENT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ 
      type: CREATE_EQUIPMENT_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};

export const updateEquipment = (id, equipmentData) => async (dispatch) => {
  dispatch({ type: UPDATE_EQUIPMENT_REQUEST });
  try {
    const data = await equipmentApi.update(id, equipmentData);
    dispatch({ type: UPDATE_EQUIPMENT_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ 
      type: UPDATE_EQUIPMENT_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};

export const deleteEquipment = (id) => async (dispatch) => {
  dispatch({ type: DELETE_EQUIPMENT_REQUEST });
  try {
    await equipmentApi.delete(id);
    dispatch({ type: DELETE_EQUIPMENT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ 
      type: DELETE_EQUIPMENT_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });
    throw error;
  }
};