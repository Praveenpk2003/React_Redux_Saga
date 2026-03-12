import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_PATIENTS, SET_PATIENTS,
  FETCH_APPOINTMENTS, SET_APPOINTMENTS,
  FETCH_MEDICAL_RECORDS, SET_MEDICAL_RECORDS
} from "./actions";

// Mock API functions for demo purposes
const mockApiDelay = (data) => new Promise(resolve => setTimeout(() => resolve(data), 600));

const fetchPatientsAPI = () => mockApiDelay([
  { id: 1, name: "John Doe", age: 45, status: "Stable", avatar: "JD" }, 
  { id: 2, name: "Jane Smith", age: 32, status: "Critical", avatar: "JS" },
  { id: 3, name: "Alice Johnson", age: 28, status: "Recovering", avatar: "AJ" }
]);

const fetchAppointmentsAPI = () => mockApiDelay([
  { id: 101, patientName: "John Doe", time: "10:00 AM", date: "Today", type: "Routine Checkup" },
  { id: 102, patientName: "Jane Smith", time: "02:30 PM", date: "Today", type: "Urgent Surgery" }
]);

const fetchRecordsAPI = () => mockApiDelay([
  { id: 1001, patientName: "John Doe", record: "Blood pressure normal. Prescribed rest.", date: "10/22/2023" },
  { id: 1002, patientName: "Jane Smith", record: "Severe trauma. Requires immediate operation.", date: "10/24/2023" }
]);

// Worker sagas
function* fetchPatientsSaga() {
  const data = yield call(fetchPatientsAPI);
  yield put({ type: SET_PATIENTS, payload: data });
}

function* fetchAppointmentsSaga() {
  const data = yield call(fetchAppointmentsAPI);
  yield put({ type: SET_APPOINTMENTS, payload: data });
}

function* fetchMedicalRecordsSaga() {
  const data = yield call(fetchRecordsAPI);
  yield put({ type: SET_MEDICAL_RECORDS, payload: data });
}

// Root watcher saga
export default function* rootSaga() {
  yield takeEvery(FETCH_PATIENTS, fetchPatientsSaga);
  yield takeEvery(FETCH_APPOINTMENTS, fetchAppointmentsSaga);
  yield takeEvery(FETCH_MEDICAL_RECORDS, fetchMedicalRecordsSaga);
}
