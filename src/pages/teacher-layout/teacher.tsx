import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, theme } from 'antd';
import Signout from '../auth/signout';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Teacher: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const items = [
    {
      key: "profile",
      label: (
        <span style={{ fontWeight: 500 }} onClick={() => navigate("/teacher/profile")}>
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
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color:"white",
            }}
          />
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 20, background: colorBgContainer, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <h1>Teacher</h1>

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
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 537,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
    
  );
};

export default Teacher;