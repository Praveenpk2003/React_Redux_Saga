import {
  SET_PATIENTS,
  QUEUE_PATIENT_FORM,
  CLEAR_QUEUE_ITEM,
  SET_PATIENT_DETAILS,
  SET_NETWORK_STATUS
} from './actions';

const initialState = {
  patients: [],
  offlineQueue: [],
  selectedPatient: null,
  loading: false,
  network: {
    online: navigator.onLine,
    speed: 'unknown'
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PATIENTS:
      return {
        ...state,
        patients: [...state.patients, ...action.payload],
        loading: false
      };
    case QUEUE_PATIENT_FORM:
      return {
        ...state,
        offlineQueue: [...state.offlineQueue, action.payload]
      };
    case CLEAR_QUEUE_ITEM:
      return {
        ...state,
        offlineQueue: state.offlineQueue.filter((_, index) => index !== 0)
      };
    case SET_PATIENT_DETAILS:
      return {
        ...state,
        selectedPatient: action.payload,
        loading: false
      };
    case SET_NETWORK_STATUS:
      return {
        ...state,
        network: {
          ...state.network,
          ...action.payload
        }
      };
    case 'FETCH_PATIENTS':
    case 'FETCH_PATIENT_DETAILS':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default reducer;
