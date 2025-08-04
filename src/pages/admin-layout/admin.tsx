import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./admin-sidebar";
import { Header } from "antd/es/layout/layout";
import { Dropdown, Avatar} from "antd";
import { UserOutlined } from "@ant-design/icons";
import Signout from "../auth/signout";
import { useState } from "react";

const Admin = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const items = [
    {
      key: "profile",
      label: (
        <span style={{ fontWeight: 500 }} onClick={() => navigate("/admin/profile")}>
          👤 Profil
        </span>
      ),
    },
    {
      key: "signout",
      label: <Signout />, // Ant Design tugmacha emas, Signout component o'zida bo'lishi kerak
    },
  ];

  return (
    <>
      <Header
        style={{
          background: "#001529",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ marginLeft: -25, color: "white" }}>CRM Admin</h1>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              cursor: "pointer",
              padding: 8,
              transition: "background-color 0.3s ease",
              // backgroundColor: hovered ? "#1890ff" : "",
            }}
          >
            <Avatar
              icon={<UserOutlined />}
              style={{
                backgroundColor: hovered ? "#ffffff" : "#87d068",
                color: hovered ? "#1890ff" : "#fff",
              }}
            />
          </div>
        </Dropdown>
      </Header>

      <div
        style={{
          display: "flex",
          height: "100vh",
          position: "fixed",
          width: "100%",
        }}
      >
        <Sidebar />

        <div
          style={{
            flexGrow: 1,
            backgroundColor: "#f0f2f5",
            padding: 25,
            overflowY: "auto",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
