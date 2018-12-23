import { State } from '../models';
import {
  ADD_RECORD,
  REQUEST_RECORDS,
  RECEIVE_RECORDS,
  UPDATE_RECORD,
  DELETE_RECORD
} from '../constants/ActionTypes';

const initialState: State = {
  isFetching: false,
  records: []
};

// TODO: Reconsider action parameter typing
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_RECORD:
      return { ...state, records: [ ...state.records, action.record ] };
    case REQUEST_RECORDS:
      return { ...state, isFetching: true };
    case RECEIVE_RECORDS:
      return { ...state, isFetching: false, records: action.records };
    case UPDATE_RECORD:
      return {
        ...state,
        records: state.records.map(item => item.id === action.record.id ? action.record : item)
      };
    case DELETE_RECORD:
      return {
        ...state,
        records: state.records.filter(item => item.id !== action.id)
      };
    default:
      return state;
  }
}

export default reducer;
