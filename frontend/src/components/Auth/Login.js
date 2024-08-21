import React, { useState } from 'react';
import { Typography, TextField, Button, Link, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../../authService';
import '../../styles/Login.css'; // Import the CSS

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false); // For controlling the Snackbar
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Custom message for the Snackbar
    const navigate = useNavigate();

    const handleLogin = async () => {
        const success = await authService.login(email, password);
        if (success) {
            navigate('/chat'); // Redirect to chat page on successful login
        } else {
            setSnackbarMessage('Login failed: Incorrect password or email.');
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
                    Login
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
                    onClick={handleLogin}
                    sx={{ mt: 3 }}
                >
                    Login
                </Button>
                <Link href="/register" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
                    Don't have an account? Register
                </Link>
            </form>

            {/* Snackbar for displaying login errors */}
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
}

export default LoginPage;