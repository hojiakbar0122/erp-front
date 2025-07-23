import { type ReactNode } from 'react'
import { getItem } from '../../helpers'
import { Navigate} from 'react-router-dom'

const LoginProtected = ({children}:{children: ReactNode}) => {
    const token = getItem("access_token")
    const role = getItem("role")
    if (token) {
        return <Navigate to={`/${role}`} replace/>
    }
  return (
   <>
   {children}
   </>
  )
}

export default LoginProtected