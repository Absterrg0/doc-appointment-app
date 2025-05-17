import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Row, Col, TimePicker, message } from "antd";
import { showLoadings, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";
import "../../styles/Profile.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  //for timings
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [doctor, setDoctor] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  //update form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoadings());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(startTime).format("HH:mm"),
            moment(endTime).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  //update form

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
        setStartTime(moment(res.data.data.timings[0], "HH:mm").toDate());
        setEndTime(moment(res.data.data.timings[1], "HH:mm").toDate());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], "HH:mm"),
              moment(doctor.timings[1], "HH:mm"),
            ],
          }}
        >
          <h4 className="">Personal Details :</h4>

          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true, message: "First name is required" }]}
              >
                <Input type="text" placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true, message: "Last name is required" }]}
              >
                <Input type="text" placeholder="Enter last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true, message: "Phone No is required" }]}
              >
                <Input type="text" placeholder="Enter Phone No" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input type="text" placeholder="Enter email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Website"
                name="website"
                // required
                // rules={[{ required: true, message: "First name is required" }]}
              >
                <Input type="text" placeholder="website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true, message: "Address required" }]}
              >
                <Input type="text" placeholder="Enter your address" />
              </Form.Item>
            </Col>
          </Row>

          <h4 className="">Professional Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[
                  { required: true, message: "Specialization is required" },
                ]}
              >
                <Input type="text" placeholder="Your Specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true, message: "Experience is required" }]}
              >
                <Input type="text" placeholder="Your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fees Per Consultation"
                name="feesPerConsultation"
                required
                rules={[
                  {
                    required: true,
                    message: "Fees Per Consultatio is required",
                  },
                ]}
              >
                <Input type="text" placeholder="Fees Per Consultation" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={16}>
              <Form.Item label="Timings" required>
                <div className="time-picker-wrapper">
                  <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Start Time"
                    dateFormat="HH:mm"
                    placeholderText="Start Time"
                    className="custom-timepicker"
                  />
                  <DatePicker
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="End Time"
                    dateFormat="HH:mm"
                    placeholderText="End Time"
                    className="custom-timepicker"
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Update
            </button>
          </Col>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
