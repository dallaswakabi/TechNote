import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { useNavigate} from 'react-router-dom'
import  {useSelector} from 'react-redux'
import { selectUsersById } from './userApiSlice'


const  User = ({userId})=>{
   const user = useSelector(state=>selectUsersById(state,userId))

   const navigate = useNavigate();
   if(user){
    const handledit = ()=>navigate(`/dash/users/${userId}`)

    const userRoleString = user.roles.toString().replaceAll(',',',')
     const cellStatus = user.active ? "" : 'table__cell--inactive'
   return (
    <tr className='table__row user'>
    <td className={`table__cell ${cellStatus}`}>{user.username}</td>
    <td className={`table__cell ${cellStatus}`}>{userRoleString}</td>
    <td className={`table__cell ${cellStatus}`}>
        <button
        className='icon-button table__button'
         onClick={handledit}
        >
        <FontAwesomeIcon icon={faPenToSquare}/>
        </button>
    </td>
    </tr>
   )
}
}

export default User