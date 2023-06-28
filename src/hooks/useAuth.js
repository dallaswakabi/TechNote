import {useSelector} from 'react-redux'
//import {selectCurrentToken} from "../Features/Auth/AuthSlice"
import jwt from "jwt-decode";


const useAuth = ()=>{
    const {token} = useSelector((state) => state.Auth)
    console.log(token)
    let isManager = false
    let isAdmin = false
    let status = "Employee"
   
    if(token){
        const decoded = jwt(token);
         console.log(decoded)
        const {username,roles} = decoded.userInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')
        
        if(isManager) status = "Manager"
        if(isAdmin) status = "Admin"

        return {username,roles,status,isManager,isAdmin}
    }
    return {username:'',roles:[],isManager,isAdmin,status}

}

export default useAuth