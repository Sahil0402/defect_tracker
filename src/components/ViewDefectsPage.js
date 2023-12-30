import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DropDown from './DropDown';
import axios from 'axios';
import { Button } from 'react-bootstrap';
const ViewDefectsPage = ({logout}) => {

    const [selectedPriority, setSelectedPriority] = useState('All');
    const [selectedCategory, setCategory] = useState('All');
    const [defectsData, setDefectsData] = useState([]);

    useEffect(() => {
        if (selectedPriority !== "All" || selectedCategory !== "All") {
            axios.get('http://localhost:5000/defects')
                .then(res => res.data)
                .then(data => {
                    const filteredData = data.filter((defect) => {
                        if (defect.priority === selectedPriority && defect.category === selectedCategory) {
                            return true;
                        }
                        return false;
                    });
                    return filteredData;
                }).then((filteredData) => {
                    setDefectsData(filteredData);
                })
        }
        else {
            axios.get('http://localhost:5000/defects')
                .then(res => {
                    setDefectsData(res.data);
                });
        }
    }, [selectedPriority, selectedCategory]);

    //Callback function to takeback the value of dropdowns
    const handlePriorityChange = (value) => {
        setSelectedPriority(value);
    }
    const handleCategoryChange = (value) => {
        setCategory(value);
    }

    const changeStatus = (id) => {
        axios.get('http://localhost:5000/defects/' + id)
            .then((res) => {
                let data = res.data;
                data.status = "true";
                axios.put(`http://localhost:5000/defects/${id}`, data)
                    .then(res => {
                        axios.get('http://localhost:5000/defects')
                            .then(res => {
                                setDefectsData(res.data);
                            });
                    })
                    .catch(error => {
                        console.error("Failed to update defect status on the server:", error);
                    });
            })
    }

    const priority = {
        htmlFor: 'priority',
        name: 'priority',
        id: 'dropdown',
        value: ['All', '1', '2', '3', '4']
    };
    const category = {
        htmlFor: 'category',
        name: 'category',
        id: 'dropdown',
        value: ['All', 'UI', 'Functional', 'Change Request']
    };
    return (
        <div className='container mt-5'>
            <h1>Defect Tracker</h1>
            <Button onClick={logout} className="btn btn-primary mb-2">
                Logout
            </Button>
            <div className='container mt-3'>
                <h3>Filter Details</h3>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <DropDown type={priority} handlePriorityChange={handlePriorityChange} />
                    <br />
                    <DropDown type={category} handleCategoryChange={handleCategoryChange} />
                </div>
            </div>
            <div className='mt-3'>
                <h3>Defect Details</h3>
                <p>Search Results: {defectsData.length}</p>
                <table className="defect-table">
                    <thead>
                        <tr>
                            <th>Defect category</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Fixed status</th>
                            <th>Change Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {defectsData.length > 0 ? (
                            defectsData.map((defect) => (
                                <tr key={defect.id}>
                                    <td>{defect.category}</td>
                                    <td>{defect.description}</td>
                                    <td>{defect.priority}</td>
                                    <td>{defect.status}</td>
                                    <td>
                                        {defect.status === "false" ? (
                                            <button className="status-button" onClick={() => changeStatus(defect.id)}>
                                                <i className="fa fa-times"></i>
                                            </button>
                                        ) : (
                                            <i className="fa fa-check"></i>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewDefectsPage