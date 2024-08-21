import React, { useState } from 'react';
import { Typography, TextField, Button, Link, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../../authService';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false); // For controlling the Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Custom message for the Snackbar
    const navigate = useNavigate();

    // Function to validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to validate password
    const validatePassword = (password) => {
        // At least 10 characters long, at least one uppercase letter, one digit, and one special character
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]{10,}$/;
        return passwordRegex.test(password);
    };


    const handleRegister = async () => {
        if (!validateEmail(email)) {
            setSnackbarMessage('This is not a valid email.');
            setOpenSnackbar(true);
            return;
        }

        if (!validatePassword(password)) {
            setSnackbarMessage('Password must be at least 10 characters long, include at least 1 uppercase letter, 1 digit, and 1 special character.');
            setOpenSnackbar(true);
            return;
        }

        const success = await authService.register(email, password);
        if (success) {
            navigate('/');
        } else {
            setSnackbarMessage('Authentication failed: User is already registered.');
            setOpenSnackbar(true); // Show Snackbar with error message
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); // Close Snackbar when user clicks on it or after timeout
    };

    return (
        <div className="contact-us">
            <form autoComplete="off">
                <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                    Register
                </Typography>
                <TextField
                    type="email"
                    name="email"
                    placeholder="Email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    type="password"
                    name="password"
                    placeholder="Password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleRegister}
                    sx={{ mt: 3 }}
                >
                    Register
                </Button>
                <Link
                    href="/"
                    variant="body2"
                    sx={{ display: 'block', textAlign: 'center', mt: 2 }}
                >
                    Already have an account? Login
                </Link>
            </form>

            {/* Snackbar for displaying validation errors */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Register;