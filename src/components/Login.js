import React, { useRef, useState } from 'react';
import ViewDefectsPage from '../components/ViewDefectsPage.js';
import AddDefects from '../components/AddDefects.js'
import Alert from 'react-bootstrap/Alert';
import '../index.css';
import axios from 'axios';

const Login = () => {

  const userName = useRef('');
  const password = useRef('');
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('false');

  function logout() {
    setIsLoggedIn(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.current.value === '' && password.current.value === '') {
      setShow(true);
    } else {
      setShow(false);
      axios
        .get('http://localhost:4000/data')
        .then((res) => res.data)
        .then((json) => {
          const filteredData = json.filter(
            (data) =>
              data.username === userName.current.value &&
              data.password === password.current.value
          );
          return filteredData;
        })
        .then((filteredData) => {
          if (filteredData.length) {
            setIsLoggedIn(true);
            setRole(filteredData[0].role);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (isLoggedIn) {
    if (role === 'dev') {
      return <AddDefects logout={logout} />
    } else {
      return <ViewDefectsPage/>;
    }
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <p>Please enter all the values.</p>
        </Alert>
      )}
      <div className="container">
        <h1>Defect Tracker</h1>
        <div className="">
          <form
            action="post"
            className="login_form d-flex flex-column"
          >
            <label htmlFor="">Username</label>
            <input
              type="text"
              className="form-control"
              name="userName"
              id="userName"
              aria-describedby="helpId"
              ref={userName}
              placeholder="Username"
            />
            <br />
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              aria-describedby="helpId"
              ref={password}
              placeholder="Password"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-outline-primary mt-3"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
