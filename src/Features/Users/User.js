import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
//import { useNavigate} from 'react-router-dom'
//import  {useSelector} from 'react-redux'
//import { selectUsersById } from './userApiSlice'
import { useGetUsersQuery } from './userApiSlice' 

const  User = ({userId})=>{
   //const user = useSelector(state=>selectUsersById(state,userId))
     
      const {
        data,
        isLoading,
        isError,
        error
      } = useGetUsersQuery()
      

   //const navigate = useNavigate();
     const user = {...data}
   if(data){
   // const handledit = ()=>navigate(`/dash/users/${userId}`)
       
    //const userRoleString = user.roles.toString().replaceAll(',',',')
     const cellStatus = user.active ? "" : 'table__cell--inactive'
     
   return (
    
      data.map((user)=>(
       <tr className='table__row user' key={user._id}>
    <td className={`table__cell ${cellStatus}`}>{user.username}</td>
    <td className={`table__cell ${cellStatus}`}>{user.roles.map((role)=>role)}</td>
    <td className={`table__cell ${cellStatus}`}>
        <button
        className='icon-button table__button'
         onClick={''}
        >
        <FontAwesomeIcon icon={faPenToSquare}/>
        </button>
    </td>
    </tr>
      ))
       
      )
}
}

export default User