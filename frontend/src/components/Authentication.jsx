import { useState } from 'react';
import { Card, Input, Typography, Button, Select, Option } from '@mui/joy';
import axios from 'axios';
import PropTypes from 'prop-types';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const Authentication = ({ onAuthenticated }) => {
    const [view, setView] = useState('login'); // Default view is login
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userType, setUserType] = useState('Homeowner'); // Default group is Homeowner

    const groups = ['Homeowner', 'Business'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (view === 'login') {
                await apiClient.post(`/login/`, {
                    username,
                    password,
                });
                onAuthenticated();
            } else {
                const group = userType.toLowerCase();
                await apiClient.post(`/register/`, {
                    username,
                    email,
                    first_name: firstName,
                    last_name: lastName,
                    password,
                    user_t: group
                })
                onAuthenticated();
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleSelectChange = (event, newValue) => {
        setUserType(newValue);

    }
    return (
        <Card sx={{ width:"30%", display: 'flex', flexDirection: 'column', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <Typography level='h2' color='primary' align='left'>{view.charAt(0).toUpperCase() + view.slice(1)}</Typography>
            {view === 'login' ? (
                <>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
                </>
            ) : (
                <>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username'/>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email'/>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='first name'/>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='last name'/>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password'/>
                    <Select
                        color="neutral"
                        placeholder="Choose Account Type"
                        variant="soft"
                        value={userType}
                        onChange={handleSelectChange}
                    >
                        {groups.map((group, index) => (
                            <Option key={index} value={group}>{group}</Option>
                        ))}
                    </Select>
                </>
            )}
            <Button onClick={handleSubmit}>Submit</Button>
            <Typography level="body-sm" >
                {view === 'login' ? 'Dont have a account?' : 'Already have an account?'}
            </Typography>
            <Button variant="plain" color="neutral" onClick={() => setView(view === 'login' ? 'register' : 'login')}>{view === 'login' ? 'Register' : 'Login'}</Button>

        </Card>
    );
};

Authentication.propTypes = {
    onAuthenticated: PropTypes.func.isRequired,
};

export default Authentication;
