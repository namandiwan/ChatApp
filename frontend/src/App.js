import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css';

function App() {
    return (
        <div>
            <div className="background">
                {[...Array(10)].map((_, i) => (
                    <span key={i}></span>
                ))}
            </div>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;