import React, { useEffect, useState } from 'react'
import { Form, Input, message } from 'antd'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'
const Register = () => {
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars

  const [loading, setLoading] = useState(false);
  const submitHandler = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      await axios.post('/api/v1/users/register', values)
      message.success('Registration Successful');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  };
  useEffect(() => {
    if (localStorage.getItem('user')) {
      Navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <div className='login-page '>
        {loading && <Spinner />}
        <Form layout='vertical' className='login-form' onFinish={submitHandler}>
          <div className='heading mx-2'>Expense Tracker App</div>
          <h3 className='heading2 d-flex   justify-content-center align-items-center'>Sign Up</h3>
          <Form.Item label="Name" name="name"
            rules={[
              {
                required: true,
                message: 'Please enter your name!',
              },
              {
                type: 'text',
                message: 'Please enter  correct username',
              },
            ]}>
            <Input />

          </Form.Item>
          <Form.Item label="Email" name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address!',
              },
            ]}>
            <Input type='email' />
          </Form.Item>
          <Form.Item label="Password" name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
              {
                type: 'password',
                message: 'Please enter a valid password ',
              },
            ]}>
            <Input type='password' />
          </Form.Item>
          <div className='d-flex justify-content-center '>
            <button className='custom-button'>Register</button>
          </div>
          <div className='d-flex '>
            <Link to='/login' className='link d-flex mt-3 mb-2 justify-center align-items-center'>Already Register ? Click Here To Sign In</Link>
          </div>

        </Form>
      </div>


    </>
  )
}

export default Register
