import React from 'react';
import { Form, Input, message } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import axios from 'axios';
import "../styles/RegisterStyles.css";
import {useDispatch} from 'react-redux';
import { showLoadings, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // form handler function
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoadings());
      const res = await axios.post('/api/v1/user/register', values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success('Register Successfully');
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <>
      <div className="form-container">
        <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
          <h3 className='text-center'>Register Form</h3>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input type="text" />
          </Form.Item>

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

          <Link to="/login" className="m-2">Already User Login Here</Link>
          <button className="btn btn-primary" type="submit">Register</button>
        </Form>
      </div>
    </>
  );
};

export default Register;
