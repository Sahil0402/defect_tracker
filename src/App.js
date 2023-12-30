import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ViewDefectsPage from './components/ViewDefectsPage';
import AddDefects from './components/AddDefects';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

const App = () => {
  return (
    <>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">View Defects</Link>
          </li>
          <li>
            <Link to="/adddefect">Add Defect</Link>
          </li>
        </ul>
      </nav> */}
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard" element={<ViewDefectsPage />} />
        <Route path="/adddefect" element={<AddDefects />} />
      </Routes >
    </>
  );
}

export default App;
