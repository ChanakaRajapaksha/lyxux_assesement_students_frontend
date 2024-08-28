import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Box } from '@mui/material';

import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

const Students = () => {
    // State variables to manage student data, form submission state, 
    // whether the form is in edit mode, and the currently selected student.
    const [students, setStudents] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    // useEffect hook to fetch the list of students when the component is first mounted.
    useEffect(() => {
        getStudents();
    }, []);

    // Function to fetch students from the backend API and update the students state.
    const getStudents = () => {
        axios.get('http://localhost:3001/api/students')
            .then(response => {
                // Assuming the API returns a response object that contains a 'response' property
                // with the student data. If this structure is incorrect, the code should be adjusted accordingly.
                setStudents(response.data?.response || []);
            })
            .catch(error => {
                console.error(error);
            })
    };

    // Function to create a new student by sending a POST request to the backend API.
    // After successfully creating a student, it refetches the student list.
    const createStudent = (data) => {
        setSubmitted(true);

        // Constructing the payload based on the form data.
        const payload = {
            id: data.id,
            name: data.name,
            grade: data.grade,
        };

        axios.post('http://localhost:3001/api/createstudent', payload)
            .then(() => {
                // Refetching the updated list of students and resetting form states.
                getStudents();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error(error);
            })
    };

    // Function to update an existing student's information by sending a PUT request.
    // After a successful update, it refetches the student list.
    const updateStudent = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            name: data.name,
            grade: data.grade,
        };

        axios.put('http://localhost:3001/api/updatestudent', payload)
            .then(() => {
                getStudents();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error(error);
            })
    };

    // Function to delete a student by sending a DELETE request.
    // The function refetches the student list after a successful deletion.
    const deleteStudent = (data) => {
        axios.delete('http://localhost:3001/api/deletestudent', { data: { id: data.id } })
            .then(() => {
                getStudents();
            })
            .catch(error => {
                console.error(error);
            })
    };

    // The component's return statement renders the UserForm and UserTable components.
    // The Box component is used for layout purposes.
    return (
        <Box
            sx={{
                width: 'calc(100% - 200px)',  // Assuming this width is calculated based on some layout constraints.
                margin: 'auto',               // Centering the box.
                marginTop: '50px'             // Adding some space at the top for visual appeal.
            }}
        >
            <UserForm
                createStudent={createStudent}   // Passing the createStudent function as a prop.
                submitted={submitted}           // Indicating whether the form is being submitted.
                data={selectedUser}             // Passing the selected user data for editing.
                isEdit={isEdit}                 // Flag to indicate if the form is in edit mode.
                updateStudent={updateStudent}   // Passing the updateStudent function as a prop.
            />
            <UserTable
                students={students}             // Passing the list of students to the table.
                selectedUser={data => {         // Callback to handle when a student is selected for editing.
                    setSelectedUser(data);
                    setIsEdit(true);
                }}
                deleteStudent={data => deleteStudent(data)}  // Passing the deleteStudent function as a prop.
            />
        </Box>
    );
};

export default Students;
