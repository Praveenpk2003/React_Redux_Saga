import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PatientList from './PatientList';
import PatientForm from './PatientForm';
import PatientDetails from './PatientDetails';
import { setNetworkStatus, PROCESS_OFFLINE_QUEUE } from '../redux/actions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const network = useSelector(state => state.network);

  useEffect(() => {
    const handleOnline = () => {
      dispatch(setNetworkStatus({ online: true }));
      dispatch({ type: PROCESS_OFFLINE_QUEUE });
    };
    const handleOffline = () => {
      dispatch(setNetworkStatus({ online: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Network speed detection (simple estimation)
    if (navigator.connection) {
      const updateConnection = () => {
        dispatch(setNetworkStatus({ speed: navigator.connection.effectiveType }));
      };
      navigator.connection.addEventListener('change', updateConnection);
      updateConnection();
      
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        navigator.connection.removeEventListener('change', updateConnection);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);

  const isSlowNetwork = network.speed === '2g' || network.speed === '3g';

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="logo">
          <span className="plus-icon">+</span>
          <h1>MediSaga Dashboard</h1>
        </div>
        <div className="status-indicators">
          <div className={`status-badge ${network.online ? 'online' : 'offline'}`}>
            {network.online ? 'Online' : 'Offline'}
          </div>
          {isSlowNetwork && (
            <div className="status-badge slow-network">
              Slow Network ({network.speed.toUpperCase()})
            </div>
          )}
        </div>
      </header>

      <main className="main-content">
        <div className="left-column">
          <PatientList />
          <PatientForm />
        </div>
        <div className="right-column">
          <PatientDetails />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
