import { type ReactNode } from 'react'
import { getItem } from '../../helpers'
import { Navigate} from 'react-router-dom'

const LayoutProtected = ({children}:{children: ReactNode}) => {
    const token = getItem("access_token")
    if (!token) {
        return <Navigate to={"/"} replace/>
    }
  return (
   <>
   {children}
   </>
  )
}

export default LayoutProtected