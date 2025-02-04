import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [eventName, setEventName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const navigator = useNavigate();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        eventName: '',
        email: ''
    });

    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEventName(response.data.eventName);
                    setEmail(response.data.email);
                })
                .catch((error) => {
                    console.error('Error fetching employee:', error);
                });
        }
    }, [id]);

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!firstName.trim()) {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        } else {
            errorsCopy.firstName = '';
        }

        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        } else {
            errorsCopy.lastName = '';
        }

        if (!eventName.trim()) {
            errorsCopy.eventName = 'Event name is required';
            valid = false;
        } else {
            errorsCopy.eventName = '';
        }

        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        } else {
            errorsCopy.email = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    function saveEmployee(e) {
        e.preventDefault();

        if (!validateForm()) return;

        const employee = { firstName, lastName, eventName, email };

        if (id) {
            // If `id` exists, update employee instead of creating a new one
            updateEmployee(id, employee)
                .then(() => navigator('/employees'))
                .catch((error) => console.error('Error updating employee:', error));
        } else {
            createEmployee(employee)
                .then(() => navigator('/employees'))
                .catch((error) => console.error('Error creating employee:', error));
        }
    }

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>{id ? 'Update Employee' : 'Add Employee'}</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-3'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Last Name'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Event Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Event Name'
                                    value={eventName}
                                    className={`form-control ${errors.eventName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEventName(e.target.value)}
                                />
                                {errors.eventName && <div className='invalid-feedback'>{errors.eventName}</div>}
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee Email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveEmployee}>
                                {id ? 'Update' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
