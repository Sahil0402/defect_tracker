import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DropDown from './DropDown'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

const AddDefects = ({ logout }) => {

    const priority = {
        htmlFor: 'priority',
        name: 'priority',
        id: 'dropdown',
        value: ['1', '2', '3', '4']
    };
    const category = {
        htmlFor: 'category',
        name: 'category',
        id: 'dropdown',
        value: ['UI', 'Functional', 'Change Request']
    };

    const [selectedPriority, setSelectedPriority] = useState('4');
    const [selectedCategory, setCategory] = useState('UI');
    const description = useRef('');
    const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
    const [showAlert, setShowAlert] = useState(false);

    const handlePriorityChange = (value) => {
        setSelectedPriority(value);
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    function setIdFn() {
        const minRange = 13;
        const maxRange = 50;
        return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    }

    const addDefect = (e) => {
        if (description.current.value !== '') {
            setIdFn();
            let newData = {
                "category": selectedCategory,
                "description": description.current.value,
                "priority": selectedPriority,
                "status": "false"
            }
            axios.post('http://localhost:5000/defects', newData)
                .then(() => {
                    setShowAlert(true); // Show the alert on successful addition
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            setShowModal(true); // Show the modal if the description is empty
        }
        description.current.value = "";
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    };

    const handleCloseAlert = () => {
        setShowAlert(false); // Close the alert
    };

    return (
        <div className="container mt-5">
            {showAlert && (
                <Alert variant="success" onClose={handleCloseAlert} dismissible>
                    <Alert.Heading>Defect Added Successfully!</Alert.Heading>
                </Alert>
            )}
            <h1>Defect Tracker</h1>
            <Button onClick={logout} className="btn btn-primary mb-2">
                Logout
            </Button>
            <Link to="/dashboard" className="btn btn-primary mb-3">
                View Defects
            </Link>
            <h3>Add Defects</h3>
            <div className="container">
                <DropDown type={priority} handlePriorityChange={handlePriorityChange} />
                <br />
                <DropDown type={category} handleCategoryChange={handleCategoryChange} />
                <label htmlFor="description">Description</label>
                <FloatingLabel controlId="floatingTextarea2" label="Comments">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '200px', width: '500px' }}
                        ref={description}
                    />
                </FloatingLabel>
                <button type="submit" onClick={addDefect} className="btn btn-outline-primary mt-1 mb-5">
                    Add Defect
                </button>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Empty Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please provide a description before adding a defect.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddDefects;
