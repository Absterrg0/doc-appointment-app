import React from 'react';
import { Form, Input, message } from 'antd';
import "../styles/RegisterStyles.css";
import {useDispatch} from 'react-redux';
import { showLoadings, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import 'antd/dist/reset.css';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try{
      dispatch(showLoadings());
      const res = await axios.post('/api/v1/user/login', values);
      window.location.reload();
      dispatch(hideLoading());
      if(res.data.success){
        localStorage.setItem("token", res.data.token);
        message.success('Login Successfully');
        navigate('/');
      }else{
        message.error(res.data.message);
      }
    } catch(error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('something went wrong');

    }
  };

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
          <h3 className='text-center'>Login Form</h3>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input type="password" />
          </Form.Item>

          <Link to="/register" className="m-2">Create New Account</Link>
          <button className="btn btn-primary" type="submit">Login</button>
        </Form>
      </div>
    </>
  );
};



export default Login;
