import { Outlet } from "react-router-dom";
import Sidebar from "./admin-sidebar";
import { Header } from "antd/es/layout/layout";
import Signout from "../auth/signout";
// import GroupTable from "../../components/group-table"

const Admin = () => {
  return (
    <div >
      {/* <Layout> */}
        <Header style={{ background: "#001529", color: "white", display:"flex", alignItems:"baseline", justifyContent:"space-between"}}>
          <h1>ERP Admin</h1>
          <Signout/>
        </Header>
      {/* </Layout> */}
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Admin;
