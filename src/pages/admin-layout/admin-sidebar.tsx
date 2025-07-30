import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  BookOutlined,
  UserOutlined,
  ReadOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

type MenuItem = {
  id: number;
  key: string;
  icon: React.ReactNode;
  label: string;
};

const items: MenuItem[] = [
  { id: 1, key: "groups", icon: <TeamOutlined />, label: "Groups" },
  { id: 2, key: "courses", icon: <BookOutlined />, label: "Courses" },
  { id: 3, key: "teachers", icon: <UserOutlined />, label: "Teachers" },
  { id: 4, key: "students", icon: <ReadOutlined />, label: "Students" },
  { id: 5, key: "branches", icon: <BranchesOutlined />, label: "Branches" },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("groups");

  useEffect(() => {
    const savedKey = localStorage.getItem("selected_menu_key");
    if (savedKey) setSelectedKey(savedKey);
  }, []);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handleClick = (key: string) => {
    setSelectedKey(key);
    localStorage.setItem("selected_menu_key", key);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: collapsed ? 80 : 220,
          backgroundColor: "#001529",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: 16 }}>
          <Button type="primary" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {items.map((item) => (
            <Link
              to={`${item.key}`}
              key={item.key}
              onClick={() => handleClick(item.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                color: selectedKey === item.key ? "#1890ff" : "#fff",
                backgroundColor: selectedKey === item.key ? "#e6f7ff" : "transparent",
                fontWeight: selectedKey === item.key ? "bold" : "normal",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
            >
              {item.icon}
              {!collapsed && item.label}
            </Link>
          ))}
        </div>
      </div>

    
    </div>
  );
};

export default App;
