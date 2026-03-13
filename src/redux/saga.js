import { call, put, takeLatest, takeEvery, all, select, delay, cancelled } from 'redux-saga/effects';
import {
  FETCH_PATIENTS,
  SUBMIT_PATIENT_FORM,
  QUEUE_PATIENT_FORM,
  PROCESS_OFFLINE_QUEUE,
  CLEAR_QUEUE_ITEM,
  FETCH_PATIENT_DETAILS,
  setPatients,
  setPatientDetails
} from './actions';

// Mock API calls
const fetchPatientsApi = (start = 0, limit = 10) =>
  fetch(`https://dummyjson.com/users?limit=${limit}&skip=${start}`).then(res => res.json());

const fetchPatientDetailsApi = (id) =>
  fetch(`https://dummyjson.com/users/${id}`).then(res => res.json());

const submitPatientFormApi = (data) =>
  fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  }).then(res => res.json());

const mapUserData = (user) => ({
  ...user,
  name: `${user.firstName} ${user.lastName}`,
  website: user.domain,
  company: {
    ...user.company,
    bs: user.company?.title || 'General Medicine' // Mapping title to bs for UI consistency
  }
});

// Workers
function* handleFetchPatients(action) {
  try {
    const { page } = action.payload;
    const existingPatients = yield select(state => state.patients);
    
    // Performance Optimization: Check if we already have the data for this "fetch block"
    // Each block is 10 patients. 
    // Page 1 (UI 1-5) and Page 2 (UI 6-10) both use the first 10.
    // So if requesting page 1 or 2, we check if we have 10.
    const neededIndex = (Math.ceil(page / 2) - 1) * 10;
    
    if (existingPatients.length <= neededIndex) {
      const data = yield call(fetchPatientsApi, neededIndex, 10);
      const mappedPatients = data.users.map(mapUserData);
      yield put(setPatients(mappedPatients));
    }
  } catch (error) {
    console.error('Fetch patients failed', error);
  }
}

function* handleSubmitPatientForm(action) {
  const isOnline = navigator.onLine;
  if (!isOnline) {
    yield put({ type: QUEUE_PATIENT_FORM, payload: action.payload });
    alert('Offline: Patient added to queue.');
    return;
  }

  try {
    yield call(submitPatientFormApi, action.payload);
    alert('Patient registered successfully!');
  } catch (error) {
    console.error('Submission failed', error);
    yield put({ type: QUEUE_PATIENT_FORM, payload: action.payload });
  }
}

function* handleProcessQueue() {
  const queue = yield select(state => state.offlineQueue);
  for (const patient of queue) {
    try {
      yield call(submitPatientFormApi, patient);
      yield put({ type: CLEAR_QUEUE_ITEM });
      console.log('Queued patient submitted', patient);
    } catch (error) {
      console.error('Queue processing failed for', patient, error);
      break; // Stop and retry later if network still issues
    }
  }
}

function* handleFetchPatientDetails(action) {
  const { id } = action.payload;
  console.log(`Starting fetch for patient ${id}...`);
  try {
    yield delay(2000); 
    const data = yield call(fetchPatientDetailsApi, id);
    yield put(setPatientDetails(mapUserData(data)));
    console.log(`Successfully fetched patient ${id}`);
  } catch (error) {
    console.error(`Fetch patient details failed for ${id}`, error);
  } finally {
    if (yield cancelled()) {
      console.log(`Request for patient ${id} was CANCELLED because a new request started.`);
    }
  }
}

// Watchers
function* watchPatients() {
  yield takeLatest(FETCH_PATIENTS, handleFetchPatients);
}

function* watchFormSubmission() {
  yield takeEvery(SUBMIT_PATIENT_FORM, handleSubmitPatientForm);
}

function* watchQueue() {
  yield takeEvery(PROCESS_OFFLINE_QUEUE, handleProcessQueue);
}

function* watchPatientDetails() {
  // takeLatest handles cancellation of previous requests
  yield takeLatest(FETCH_PATIENT_DETAILS, handleFetchPatientDetails);
}

export default function* rootSaga() {
  yield all([
    watchPatients(),
    watchFormSubmission(),
    watchQueue(),
    watchPatientDetails()
  ]);
}
