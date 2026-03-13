# MediSaga Healthcare Dashboard

A high-performance Hospital Management Dashboard built with React, Redux, and Redux-Saga.

## Key Features & Implementation

### 1. Pagination Performance Optimization
The dashboard fetches patients in "chunks" of 10 to minimize API overhead while the UI only shows 5 per page.
- **Redux-Saga Logic**: When `FETCH_PATIENTS` is dispatched, the Saga checks the Redux Store's current patient count. It only makes an API call if it needs the next block of 10 records.
- **Result**: Clicking "Next" for Page 2 is instantaneous as the data is already in the store. Clicking "Next" for Page 3 triggers a fetch for the next 10 (patients 11-20).

### 2. Offline Form Submission Queue
Doctors can register patients even when the network is unstable or disconnected.
- **Implementation**: The `PatientForm` dispatches a `SUBMIT_PATIENT_FORM` action. 
- **Saga Logic**: The worker saga checks `navigator.onLine`. 
    - If **Offline**: Data is added to an `offlineQueue` in the Redux store.
    - If **Online**: Data is sent immediately.
- **Syncing**: The `Dashboard` component listens for the `online` window event. When the connection returns, it dispatches `PROCESS_OFFLINE_QUEUE`, which iterates through the queue and submits pending records.

### 3. API Request Cancellation (UX Optimization)
Slow networks can lead to "race conditions" where a doctor switches records quickly, and an older request might overwrite a newer one.
- **Redux-Saga Logic**: Uses `takeLatest()` for the `FETCH_PATIENT_DETAILS` action.
- **Effect**: If a doctor clicks Patient A and then immediately clicks Patient B, the Saga automatically cancels the generator task for Patient A. Only the data for Patient B (the latest click) will ever update the UI.
- **Visual Feedback**: A 1-second artificial delay is added in `saga.js` to demonstrate the cancellation/loading state clearly.

### 4. Network Reliability Indicator
The header features a real-time status indicator.
- **Status Types**: `Online`, `Offline`, or `Slow Network`.
- **Logic**: Uses `navigator.connection.effectiveType` to detect `2g` or `3g` speeds. If the network is throttled to these speeds, a "Slow Network" warning appears, notifying the user that data fetching may take longer.

## Getting Started
1. `npm install`
2. `npm start`
