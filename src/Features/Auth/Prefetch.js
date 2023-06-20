import {store} from '../../app/Store'
import {notesApiSlice} from '../Notes/NotesApiSlice'
import {usersApiSlice} from '../Users/userApiSlice'
import { useEffect } from 'react'
import {Outlet} from 'react-router-dom'


const Prefetch = () => {
 useEffect(()=>{
    console.log('Subscription');
    const notes = store.dispatch(notesApiSlice.endpoints.GetNotes.initiate())
    const user =  store.dispatch(usersApiSlice.endpoints.GetUsers.initiate())
    
    return ()=>{
        console.log('unsubscribe')
        notes.unsubscribe()
        user.unsubscribe()
    }

 },[])
  
   return <Outlet />
  
}

export default Prefetch