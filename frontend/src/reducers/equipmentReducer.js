import * as types from '../actions/equipmentActions';

const initialState = {
  equipment: [],
  selectedEquipment: null,
  loading: false,
  error: null,
};

const equipmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_EQUIPMENT_REQUEST:
    case types.FETCH_SINGLE_EQUIPMENT_REQUEST:
    case types.CREATE_EQUIPMENT_REQUEST:
    case types.UPDATE_EQUIPMENT_REQUEST:
    case types.DELETE_EQUIPMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        equipment: action.payload,
      };

    case types.FETCH_SINGLE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedEquipment: action.payload,
      };

    case types.CREATE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        equipment: [...state.equipment, action.payload],
      };

    case types.UPDATE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        equipment: state.equipment.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        selectedEquipment: action.payload,
      };

    case types.DELETE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        equipment: state.equipment.filter((item) => item.id !== action.payload),
      };

    case types.FETCH_EQUIPMENT_FAILURE:
    case types.FETCH_SINGLE_EQUIPMENT_FAILURE:
    case types.CREATE_EQUIPMENT_FAILURE:
    case types.UPDATE_EQUIPMENT_FAILURE:
    case types.DELETE_EQUIPMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default equipmentReducer;