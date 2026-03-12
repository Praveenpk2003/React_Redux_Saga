import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_PATIENTS, FETCH_APPOINTMENTS, FETCH_MEDICAL_RECORDS } from "../redux/actions";

function Dashboard() {
  const dispatch = useDispatch();
  const patients = useSelector(state => state.patients);
  const appointments = useSelector(state => state.appointments);
  const records = useSelector(state => state.medicalRecords);

  const [activeTab, setActiveTab] = useState('patients');

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Doctor Dashboard</h1>
        <p>Welcome back, Dr.Walter White. Here is your overview for today.</p>
      </header>

      <div className="action-buttons">
        <button className="primary-btn" onClick={() => { setActiveTab('patients'); dispatch({ type: FETCH_PATIENTS }); }}>
          Load Patients Data
        </button>
        <button className="primary-btn" onClick={() => { setActiveTab('appointments'); dispatch({ type: FETCH_APPOINTMENTS }); }}>
          Load Appointments Data
        </button>
        <button className="primary-btn" onClick={() => { setActiveTab('records'); dispatch({ type: FETCH_MEDICAL_RECORDS }); }}>
          Load Medical Records
        </button>
      </div>

      <div className="stats-row">
        <div className={`stat-card ${activeTab === 'patients' ? 'active' : ''}`}>
          <h3>Patients</h3>
          <div className="stat-value">{patients.length}</div>
        </div>
        <div className={`stat-card ${activeTab === 'appointments' ? 'active' : ''}`}>
          <h3>Appointments</h3>
          <div className="stat-value">{appointments.length}</div>
        </div>
        <div className={`stat-card ${activeTab === 'records' ? 'active' : ''}`}>
          <h3>Records</h3>
          <div className="stat-value">{records.length}</div>
        </div>
      </div>

      <div className="data-view-section">
        {activeTab === 'patients' && (
          <div className="data-panel">
            <h2>Patient Roster</h2>
            {patients.length > 0 ? (
              <div className="card-grid">
                {patients.map(p => (
                  <div key={p.id} className="data-card">
                    <div className="avatar">{p.avatar}</div>
                    <div className="card-info">
                      <h4>{p.name}</h4>
                      <p>Age: {p.age}</p>
                      <span className={`badge ${p.status.toLowerCase()}`}>{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="empty-state">No patient data loaded yet. Click 'Load Patients Data'</p>}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="data-panel">
            <h2>Today's Appointments</h2>
            {appointments.length > 0 ? (
              <div className="list-group">
                {appointments.map(a => (
                  <div key={a.id} className="list-item">
                    <div className="list-time">{a.time}</div>
                    <div className="list-content">
                      <h4>{a.patientName}</h4>
                      <p>{a.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="empty-state">No appointments loaded yet. Click 'Load Appointments Data'</p>}
          </div>
        )}

        {activeTab === 'records' && (
          <div className="data-panel">
            <h2>Recent Medical Records</h2>
            {records.length > 0 ? (
              <div className="timeline">
                {records.map(r => (
                  <div key={r.id} className="timeline-item">
                    <div className="timeline-date">{r.date}</div>
                    <div className="timeline-content">
                      <h4>{r.patientName}</h4>
                      <p>{r.record}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="empty-state">No records loaded yet. Click 'Load Medical Records'</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
