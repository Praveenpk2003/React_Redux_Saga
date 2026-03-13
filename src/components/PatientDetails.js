import React from 'react';
import { useSelector } from 'react-redux';

const PatientDetails = () => {
  const selectedPatient = useSelector(state => state.selectedPatient);
  const loading = useSelector(state => state.loading);

  if (!selectedPatient && !loading) {
    return (
      <div className="card glass-morphism empty-state">
        <p>Select a patient to view detailed records</p>
      </div>
    );
  }

  return (
    <div className="card glass-morphism detail-card">
      <h2 className="title">Patient Detail View</h2>
      {loading ? (
        <div className="skeleton-loader">
          <div className="skeleton-line-long"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
        </div>
      ) : (
        <div className="patient-detail-content">
          <div className="detail-header">
            <div className="avatar">{selectedPatient.name.charAt(0)}</div>
            <div>
              <h3>{selectedPatient.name}</h3>
              <p className="subtitle">{selectedPatient.company?.bs || 'General Clinic'}</p>
            </div>
          </div>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Email</label>
              <span>{selectedPatient.email}</span>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <span>{selectedPatient.phone}</span>
            </div>
            <div className="detail-item">
              <label>Website</label>
              <span>{selectedPatient.website}</span>
            </div>
            <div className="detail-item">
              <label>City</label>
              <span>{selectedPatient.address?.city}</span>
            </div>
          </div>
          <div className="security-notice">
            <p>Accessing medical records under HIPAA compliance.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
