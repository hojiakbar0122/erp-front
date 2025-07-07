import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import type { MenuProps } from "antd";
import GroupTable from "./group-table";
import CourseTable from "./course-table";

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
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("groups");

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
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
        }}
      >
        {selectedKey === "groups" && <GroupTable />}
        {selectedKey === "courses" && <CourseTable />}
      </div>
    </div>
  );
};

export default App;
