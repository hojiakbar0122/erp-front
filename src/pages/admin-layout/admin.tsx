import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { courseService } from "@service";
import Sidebar from "../../components/admin-sidebar";
import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
// import GroupTable from "../../components/group-table"

const Admin = () => {
  useEffect(() => {
    courseService.getCourse();
  }, []);
  return (
    <div>
      <Layout>
        <Header style={{ background: "#001529", color: "white" }}>
          Bu Header (sarlavha) qismi
        </Header>
      </Layout>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Admin;
