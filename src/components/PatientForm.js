import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitPatientForm } from '../redux/actions';

const PatientForm = () => {
  const dispatch = useDispatch();
  const offlineQueue = useSelector(state => state.offlineQueue);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    disease: '',
    doctor: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age) return;
    dispatch(submitPatientForm(formData));
    setFormData({ name: '', age: '', disease: '', doctor: '' });
  };

  return (
    <div className="card glass-morphism">
      <h2 className="title">Patient Registration</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label>Patient Name</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})}
            placeholder="Enter name"
            required
          />
        </div>
        <div className="input-group">
          <label>Age</label>
          <input 
            type="number" 
            value={formData.age} 
            onChange={e => setFormData({...formData, age: e.target.value})}
            placeholder="Enter age"
            required
          />
        </div>
        <div className="input-group">
          <label>Disease</label>
          <input 
            type="text" 
            value={formData.disease} 
            onChange={e => setFormData({...formData, disease: e.target.value})}
            placeholder="e.g. Diabetes, Fever"
          />
        </div>
        <div className="input-group">
          <label>Doctor Assigned</label>
          <input 
            type="text" 
            value={formData.doctor} 
            onChange={e => setFormData({...formData, doctor: e.target.value})}
            placeholder="Dr. Name"
          />
        </div>
        <button type="submit" className="submit-btn">Register Patient</button>
      </form>
      
      {offlineQueue.length > 0 && (
        <div className="queue-status">
          <span className="warning-icon">⚠️</span>
          <span>{offlineQueue.length} patient(s) in offline queue.</span>
        </div>
      )}
    </div>
  );
};

export default PatientForm;
