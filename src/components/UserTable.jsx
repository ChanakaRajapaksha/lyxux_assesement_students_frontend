import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const UserTable = ({ students, selectedUser, deleteStudent }) => {
  return (
    // TableContainer component provides a paper-like background to the table.
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '650px' }}> {/* Ensures table has a minimum width */}

        {/* TableHead defines the table header with column titles */}
        <TableHead
          sx={{
            backgroundColor: '#F0FFFF', // Light cyan background color for the header
          }}
        >
          <TableRow>
            <TableCell>Student ID</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Action</TableCell> {/* Column for action buttons (Edit/Delete) */}
          </TableRow>
        </TableHead>

        {/* TableBody renders the table rows dynamically based on the students prop */}
        <TableBody>
          {students.length > 0 ? students.map((student) => (
            // Map over the students array to create a row for each student
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell> {/* Display student ID */}
              <TableCell>{student.name}</TableCell> {/* Display student name */}
              <TableCell>{student.grade}</TableCell> {/* Display student grade */}

              {/* Action buttons for each row */}
              <TableCell>
                {/* Edit button calls selectedUser with the selected student data */}
                <Button onClick={() => selectedUser({ id: student.id, name: student.name, grade: student.grade })}>
                  Edit
                </Button>

                {/* Delete button calls deleteStudent with the student's ID after confirmation */}
                <Button onClick={() => deleteStudent(window.confirm('Are you sure you want to delete this?') && { id: student.id })}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          )) : (
            // If no students are available, display a single row indicating no data
            <TableRow>
              <TableCell colSpan={4}>No Students Data</TableCell> {/* Merge all cells in the row to show the message */}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
