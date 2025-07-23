// import { groupService } from "@service"
import GroupTable from "./group-table"
// import { Divider } from "antd"

const Groups = () => {
    // const save = ()=>{
    //     const payload = {
    //         name:"group-1",
    //         group_id:1,
    //         status:"new",
    //         start_date:"2025-06-01",
    //         end_date:"2025-09-01"
    //     }
    //     groupService.createGroup(payload)
    // }
  return (
    <div>
        {/* <Divider>Group Table</Divider> */}
        <GroupTable/>
    </div>
  )
}

export default Groups