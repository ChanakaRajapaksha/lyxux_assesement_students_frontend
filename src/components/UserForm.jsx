import React, { useEffect, useState } from 'react';
import { Button, Grid, Input, Typography } from '@mui/material';

const UserForm = ({ createStudent, submitted, data, isEdit, updateStudent }) => {
  // State variables for managing form fields (id, name, and grade)
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  // useEffect hook to reset form fields when a submission has been completed
  useEffect(() => {
    if (!submitted) {
      setId(0);
      setName('');
      setGrade('');
    }
  }, [submitted]);

  // useEffect hook to populate form fields when editing a student
  useEffect(() => {
    if (data && data.id && data.id !== 0) {
      setId(data.id);
      setName(data.name);
      setGrade(data.grade);
    } else {
      // Reset fields if there's no valid data (e.g., when adding a new student)
      setId(0);
      setName('');
      setGrade('');
    }
  }, [data]);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginTop: '20px',       // Top margin to add space above the form
        marginBottom: '40px',    // Bottom margin to add space below the form
        display: 'block',        // Display block for better form layout in the container
      }}
    >
      <Grid item>
        <Typography
          component={'h1'}
          sx={{
            fontSize: '20px',     // Font size for the form header
            color: '#000000',     // Header color set to black
            marginBottom: '15px', // Margin below the header for spacing
          }}
        >
          Student Details Form
        </Typography>
      </Grid>

      {/* Student ID input field */}
      <Grid item sx={{ alignItems: 'center', display: 'flex' }}>
        <Typography
          component={'label'}
          htmlFor='id'
          sx={{
            width: '150px',       // Label width for aligning with input field
            marginRight: '16px',  // Right margin for spacing between label and input
          }}
        >
          Student ID
        </Typography>

        <Input
          type='number'
          id='id'
          name='id'
          sx={{ width: '400px' }} // Input field width
          value={id}              // Bind input value to state
          onChange={e => setId(e.target.value)}  // Update state on input change
        />
      </Grid>

      {/* Student Name input field */}
      <Grid item sx={{ display: 'flex' }}>
        <Typography
          component={'label'}
          htmlFor='name'
          sx={{
            width: '150px',
            marginRight: '16px',
          }}
        >
          Student Name
        </Typography>

        <Input
          type='text'
          id='name'
          name='name'
          sx={{ width: '400px' }}
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Grid>

      {/* Grade input field */}
      <Grid item sx={{ display: 'flex' }}>
        <Typography
          component={'label'}
          htmlFor='grade'
          sx={{
            width: '150px',
            marginRight: '16px',
          }}
        >
          Grade
        </Typography>

        <Input
          type='text'
          id='grade'
          name='grade'
          sx={{ width: '400px' }}
          value={grade}
          onChange={e => setGrade(e.target.value)}
        />
      </Grid>

      {/* Submit/Update button */}
      <Button
        sx={{
          backgroundColor: '#000080',  // Navy blue background color
          fontSize: '12px',            // Button font size
          color: '#ffffff',            // White text color
          padding: '10px 10px',        // Padding inside the button
          border: 'none',              // No border
          '&:hover': {
            opacity: 0.7,              // Reduced opacity on hover
            backgroundColor: '#000080',// Same background color on hover
          },
          marginTop: '18px',
          marginLeft: '18px',
        }}
        onClick={() => isEdit ? updateStudent({ id, name, grade }) : createStudent({ id, name, grade })}
      >
        {isEdit ? 'Update' : 'Submit'}  
      </Button>
    </Grid>
  );
};

export default UserForm;
