import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const DropDown = ({ type, handlePriorityChange, handleCategoryChange }) => {

    const [selectedValue, setSelectedValue] = useState('');

    const handleSelect = (eventKey) => {
        setSelectedValue(eventKey);
        if (type.htmlFor === "priority") {
            handlePriorityChange(eventKey);
        }
        else {
            handleCategoryChange(eventKey);
        }
    };
    return (
        <div>
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {type.htmlFor.toUpperCase()}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {type.value.map((p) => (
                        <Dropdown.Item key={p} eventKey={p}>
                            {p}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default DropDown