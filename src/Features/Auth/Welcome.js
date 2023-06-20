import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
     const {isManager,isAdmin,username} = useAuth()
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US',{
        dateStyle:'full',
        timeStyle:'long'
    }).format(date)
    
    const Content = (
        <section className='welcome'>
        <p>{today}</p>
        <h1>Welcome {username}!</h1>
        <p><Link to="/dash/notes">View TechNotes</Link></p>
        <p><Link to="/dash/notes/new">Add New Notes</Link></p>
       {(isManager || isAdmin) && <p><Link to="/dash/users">View User Setting</Link></p>}
        { (isManager || isAdmin) &&  <p><Link to="/dash/users/new">Add  New User</Link></p>}
        </section>
    )
  return Content
}

export default Welcome