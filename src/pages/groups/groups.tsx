import { groupService } from "@service"
import { useEffect } from "react"
import GroupTable from "../../components/group-table"

const Groups = () => {
    useEffect(()=>{
        groupService.getGroups()
    }, [])

    const save = ()=>{
        const payload = {
            name:"group-1",
            group_id:1,
            status:"new",
            start_date:"2025-06-01",
            end_date:"2025-09-01"
        }
        groupService.createGroup(payload)
    }
  return (
    <div>
        <GroupTable/>
        <button onClick={save}>save</button>
    </div>
  )
}

export default Groups