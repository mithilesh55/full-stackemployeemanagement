import React, { useEffect, useState } from 'react';
import { listEmployees, deleteEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigator = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        listEmployees()
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching employees:', error);
                setError('Failed to fetch employees. Please try again.');
                setLoading(false);
            });
    };

    function addNewEmployee() {
        navigator('/add-employee');
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee(id)
                .then(() => {
                    setEmployees(employees.filter(employee => employee.id !== id));
                })
                .catch((error) => {
                    console.error('Error deleting employee:', error);
                });
        }
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <button className='btn btn-primary mb-3' onClick={addNewEmployee}>Add Employee</button>

            {loading && <p>Loading employees...</p>}
            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && employees.length === 0 && (
                <p className="text-center">No employees found.</p>
            )}

            {!loading && employees.length > 0 && (
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Event Name</th>
                            <th>Email Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.eventName || 'N/A'}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    {' '}
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export { ListEmployeeComponent };
