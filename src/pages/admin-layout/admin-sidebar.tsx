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
import { Button, Menu } from "antd";
import type { MenuProps } from "antd";
import Groups from "../groups/groups";
import Course from "../course/course";
import Teacher from "../teacher/teacher";
import Student from "../student/student";
import Branch from "../branch/branch";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "groups",
    icon: <TeamOutlined />,
    label: "Groups",
  },
  {
    key: "courses",
    icon: <BookOutlined />,
    label: "Courses",
  },
  {
    key: "teachers",
    icon: <UserOutlined />,
    label: "Teachers",
  },
  {
    key: "students",
    icon: <ReadOutlined />,
    label: "Students",
  },
  {
    key: "branches",
    icon: <BranchesOutlined />,
    label: "Branches",
  },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("groups");

  // ✅ Refreshdan keyin oxirgi tanlangan sahifani tiklash
  useEffect(() => {
    const savedKey = localStorage.getItem("selected_menu_key");
    if (savedKey) {
      setSelectedKey(savedKey);
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
    localStorage.setItem("selected_menu_key", e.key); // 🔐 Tanlovni saqlab qo'yish
  };

  return (
    <div style={{ display: "flex", height: "100vh", position: "fixed", width: "100%" }}>
      {/* Sidebar */}
      <div
        style={{
          width: collapsed ? 80 : 256,
          backgroundColor: "#001529",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: 16 }}>
          <Button type="primary" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>

        <Menu
          selectedKeys={[selectedKey]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
          onClick={handleMenuClick}
          style={{ flexGrow: 1 }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          flexGrow: 1,
          backgroundColor: "#f0f2f5",
          padding: 24,
          overflowY: "auto",
          // marginLeft: collapsed ? 80 : 256,
          transition: "margin-left 0.3s ease",
        }}
      >
        {selectedKey === "groups" && <Groups />}
        {selectedKey === "courses" && <Course />}
        {selectedKey === "teachers" && <Teacher />}
        {selectedKey === "students" && <Student />}
        {selectedKey === "branches" && <Branch />}
      </div>
    </div>
  );
};

export default App;
