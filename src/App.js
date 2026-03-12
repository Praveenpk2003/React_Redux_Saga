import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Dashboard />
        </header>
      </div>
    </Provider>
  );
}

export default App;
