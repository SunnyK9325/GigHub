import React, { useState } from 'react';
import './Login.scss';
import newRequest from '../../utils/newRequest.js';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // since we are using form, to avoid refreshing the page
        e.preventDefault();

        try {
            const res = await newRequest.post("/auth/login", { username, password });
            localStorage.setItem("currentUser", JSON.stringify(res.data));             // res.data is an object but we store only string in our local storage
            navigate("/");
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <label htmlFor=''>Username</label>
                <input name='username' type='text' placeholder='john doe' onChange={e => setUsername(e.target.value)} />

                <label htmlFor=''>Password</label>
                <input name='password' type='password' onChange={e => setPassword(e.target.value)} />
                <button className='loginButton'>Login</button>
                <div className='register'>
                    <span style={{color: 'grey'}}>Don't have an account?</span>
                    <Link to="/register" className='link'><button>Sign Up</button></Link>
                </div>
                {error && error}
            </form>
        </div>
    );
};
export default Login;