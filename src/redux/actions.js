export const FETCH_PATIENTS = 'FETCH_PATIENTS';
export const SET_PATIENTS = 'SET_PATIENTS';
export const FETCH_PATIENTS_FAILURE = 'FETCH_PATIENTS_FAILURE';

export const SUBMIT_PATIENT_FORM = 'SUBMIT_PATIENT_FORM';
export const QUEUE_PATIENT_FORM = 'QUEUE_PATIENT_FORM';
export const PROCESS_OFFLINE_QUEUE = 'PROCESS_OFFLINE_QUEUE';
export const CLEAR_QUEUE_ITEM = 'CLEAR_QUEUE_ITEM';

export const FETCH_PATIENT_DETAILS = 'FETCH_PATIENT_DETAILS';
export const SET_PATIENT_DETAILS = 'SET_PATIENT_DETAILS';

export const SET_NETWORK_STATUS = 'SET_NETWORK_STATUS';

export const fetchPatients = (page) => ({ type: FETCH_PATIENTS, payload: { page } });
export const setPatients = (patients) => ({ type: SET_PATIENTS, payload: patients });

export const submitPatientForm = (patientData) => ({ type: SUBMIT_PATIENT_FORM, payload: patientData });
export const queuePatientForm = (patientData) => ({ type: QUEUE_PATIENT_FORM, payload: patientData });

export const fetchPatientDetails = (id) => ({ type: FETCH_PATIENT_DETAILS, payload: { id } });
export const setPatientDetails = (details) => ({ type: SET_PATIENT_DETAILS, payload: details });

export const setNetworkStatus = (status) => ({ type: SET_NETWORK_STATUS, payload: status });
