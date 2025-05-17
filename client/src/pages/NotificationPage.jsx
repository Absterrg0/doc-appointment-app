import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoadings, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoadings());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
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
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  // delete all notificatoon
  const handleDeleteAllRead = async (req, res) => {
    try {
      dispatch(showLoadings());
      const res = await axios.post('/api/v1/user/delete-all-notification', {userId: user._id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong in notification");
    }
  };

  const items = [
    {
      key: "1",
      label: "Unread",
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h4 className="p-3" style={{cursor: 'pointer'}} onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((notificationMgs, index) => {
            return (
              <div
                className="card"
                key={notificationMgs._id || index}
                style={{ cursor: "pointer" }}
              >
                <div className="card-text">{notificationMgs.message}</div>
              </div>
            );
          })}
        </>
      ),
    },
    {
      key: "2",
      label: "Read",
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h4 className="p-3" style={{cursor: 'pointer'}} onClick={handleDeleteAllRead}>
              Delete All Read
            </h4>
          </div>
          {user?.seennotification.map((notificationMgs, index) => {
            return (
              <div
                className="card"
                key={notificationMgs._id || index}
                style={{ cursor: "pointer" }}
              >
                <div className="card-text">{notificationMgs.message}</div>
              </div>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <Layout>
      <h4 className="p-3 text-center">Notification page</h4>
      <Tabs items={items} />
    </Layout>
  );
};

export default NotificationPage;
