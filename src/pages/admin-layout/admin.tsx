import { Outlet } from "react-router-dom";
import Sidebar from "./admin-sidebar";
import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";
// import GroupTable from "../../components/group-table"

const Admin = () => {
  return (
    <div className="">
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
