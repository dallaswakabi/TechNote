import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { useNavigate} from 'react-router-dom'
import  {useSelector} from 'react-redux'
import { selectNotesById } from './NotesApiSlice'


const  Note = ({noteId})=>{
   const note = useSelector(state=>selectNotesById(state,noteId))
   const navigate = useNavigate();

   if(note){
     const created = new Date(note.createdAt).toLocaleString('en-US',{day:'numeric',month:'long'})
     const updated = new Date(note.updatedAt).toLocaleString('en-US',{day:'numeric',month:'long'})

    const handleEdit = ()=> navigate(`/dash/notes/${noteId}`)
      
     return (
         <tr className='table__row'>
           <td className='table__cell notes__status'>
            {
                note.completed ? <span className='note__status--completed'>Completed</span>
                : <span className='note__status--open'>Open</span>
            }
           </td>
           <td className='table__cell notes__created'>{created}</td>
           <td className='table__cell notes__updated'>{updated}</td>
           <td className='table__cell notes__title'>{note.title}</td>
           <td className='table__cell notes__username'>{note.username}</td>
           <td className='table__cell notes__edit'>
            <button
            className='icon-button table-button'
            onClick={handleEdit}
            >
            <FontAwesomeIcon icon={faPenToSquare}/>
            </button>
           </td>
         </tr>
     )

    } else return null
}

export default Note