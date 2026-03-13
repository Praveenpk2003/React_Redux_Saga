import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatients, fetchPatientDetails } from '../redux/actions';

const PatientList = () => {
  const dispatch = useDispatch();
  const patients = useSelector(state => state.patients);
  const loading = useSelector(state => state.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Initial fetch for page 1 (gets 10)
    dispatch(fetchPatients(1));
  }, [dispatch]);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    // Fetch if we don't have enough patients for the next block
    // We fetch in chunks of 10. So page 3 needs patients 11-15, fetch if less than 20? 
    // Wait, simple logic: if patients.length < nextPage * itemsPerPage, we might need more.
    // But since we fetch 10 at a time:
    if (patients.length < nextPage * itemsPerPage) {
      dispatch(fetchPatients(nextPage));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePatients = patients.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="card glass-morphism">
      <h2 className="title">Patient Directory</h2>
      {loading && <div className="loader">Loading...</div>}
      <div className="patient-grid">
        {visiblePatients.map(patient => (
          <div 
            key={patient.id} 
            className="patient-card"
            onClick={() => dispatch(fetchPatientDetails(patient.id))}
          >
            <div className="patient-info">
              <h3>{patient.name}</h3>
              <p>{patient.email}</p>
            </div>
            <span className="badge">View</span>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span className="page-info">Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={patients.length < currentPage * itemsPerPage && patients.length % 10 === 0}>Next</button>
      </div>
    </div>
  );
};

export default PatientList;
