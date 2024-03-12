import React, { useState } from 'react';
import axios from 'axios';

const apiClient = axios.create({
    // The base URL for all HTTP requests
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
    },

    withCredentials: true,
  });

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post(`/login/`, {
                username,
                password,
              });
            console.log(response.data);
            console.log("Success!!")
            // Handle successful login
        } catch (error) {
            console.error(error);
            console.log("Failure!!")
            // Handle error
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </>

    );
};
export default Login;
