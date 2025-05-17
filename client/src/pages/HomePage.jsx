import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout as AntLayout, Row } from "antd"; // renamed to AntLayout
import Layout from "../components/Layout"; //  your custom Layout
import DoctorList from "../components/DoctorList"; // Import the DoctorList component

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  //login user data
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {doctors &&
          doctors.map((doctor) => {
            return (
              <DoctorList
                doctor={doctor}
                key={doctor._id}
              />
            );
          })}
      </Row>
    </Layout>
  );
};

export default HomePage;
