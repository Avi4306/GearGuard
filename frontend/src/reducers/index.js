import { combineReducers } from 'redux';
import equipmentReducer from './equipmentReducer';
import requestReducer from './requestReducer';
import teamReducer from './teamReducer';

const rootReducer = combineReducers({
  equipment: equipmentReducer,
  requests: requestReducer,
  teams: teamReducer,
});

export default rootReducer;