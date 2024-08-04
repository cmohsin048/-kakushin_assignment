import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Grid, Container, createTheme, ThemeProvider } from '@mui/material';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import dayjs from 'dayjs';

const styling = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflowY: 'auto',
};

const theme = createTheme();

const ModalComponent = ({ taskToEdit, onClose, onTaskUpdated }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDate(taskToEdit.deadline ? dayjs(taskToEdit.deadline) : null); 
      setOpen(true);
    }
  }, [taskToEdit]);

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
    setDate(null);
    setError('');
    onClose();
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const wordCount = description.trim().split(/\s+/).length;
    if (wordCount > 100) {
      setError('Description should not exceed 100 words.');
      return;
    }

    const taskData = {
      title,
      description,
      deadline: date ? date.toISOString() : null, 
    };

    try {
      let response;
      if (taskToEdit) {
        response = await axios.patch(`https://kakushin-assignment.vercel.app/${taskToEdit._id}`, taskData);
      } else {
        response = await axios.post('https://kakushin-assignment.vercel.app/tasks', taskData);
      }
      // console.log('Task created/updated:', response.data);
      handleClose();
      onTaskUpdated();
    } catch (error) {
      console.error('Error creating/updating task:', error);
      alert('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const isValid = title && description && date;
    setIsFormValid(isValid);
  }, [title, description, date]);

  return (
    <div>
      <FontAwesomeIcon 
        icon={faPlus} 
        onClick={() => setOpen(true)} 
        className='button' 
        style={{ cursor: 'pointer' }} 
      />
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={styling}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        multiline
                        minRows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Deadline"
                          value={date}
                          onChange={handleDateChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!isFormValid}
                  >
                    {taskToEdit ? 'Update Task' : 'Add Task'}
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
