import { Outlet } from "react-router-dom";
import Sidebar from "./admin-sidebar";
import { Header } from "antd/es/layout/layout";
import Signout from "../auth/signout";
// import GroupTable from "../../components/group-table"

const Admin = () => {
  return (
    < >
      {/* <Layout> */}
        <Header style={{ background: "#001529", color: "white", display:"flex", alignItems:"baseline", justifyContent:"space-between"}}>
          <h1 style={{marginLeft:-25}}>CRM Admin</h1>
          <Signout/>
        </Header>
      {/* </Layout> */}
       <div      style={{
        display: "flex",
        height: "100vh",
        position: "fixed",
        width: "100%",
      }}>

      <Sidebar  />

      <div style={{
          flexGrow: 1,
          backgroundColor: "#f0f2f5",
          padding: 25,
          overflowY: "auto",
          transition: "margin-left 0.3s ease",
        }}>
      <Outlet />
      </div>
      </div>
      
   </>


   



  );
};

export default Admin;
