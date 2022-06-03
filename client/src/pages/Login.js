import React from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {FaSignInAlt} from 'react-icons/fa'
import UserApi from '../api/user';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    const { email, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = formData
        console.log(formData)
        await UserApi.login(formData).then(() => {
                navigate("/");
                window.location.reload();
            }
        );
    }

  return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login to track of expenses</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input 
                            type='email'   
                            className='form-control' 
                            id='email' 
                            name='email' 
                            value={email} 
                            placeholder='Enter your email' 
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type='password'   
                            className='form-control' 
                            id='password' 
                            name='password' 
                            value={password} 
                            placeholder='Enter your password' 
                            onChange={onChange} 
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login