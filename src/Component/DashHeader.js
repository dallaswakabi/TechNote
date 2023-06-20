import React, { useEffect } from 'react'
import {useNavigate,useLocation,Link } from 'react-router-dom'
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSendLogoutMutation } from '../Features/Auth/AuthApiSlice'
import useAuth from '../hooks/useAuth'



const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX =/^\/dash\/notes(\/)?/
const USERS_REGEX =/^\/dash\/users(\/)?/



const DashHeader = () => {
 const {isMnager,isAdmin} = useAuth()

  const navigate = useNavigate()
  const {pathname} = useLocation()
  
 const [sendLogout,{
  isLoading,
  isSuccess,
  isError,
  error
 }] = useSendLogoutMutation()

   useEffect(()=>{
     if(isSuccess) navigate('/')
   },[isSuccess,navigate])
   
   const onNewNoteClicked = ()=>navigate('/dash/notes/new')
   const onNewUserClicked = () =>navigate('/dash/users/new')
   const onNotesClicked = () =>navigate('/dash/notes')
   const onUsersClicked = () =>navigate('/dash/users')

   const onlogoutClicked = ()=>sendLogout()

   if(isLoading) return <p>Loading...</p>
   if(isError) return <p>Error:{error.data?.message}</p>

    let dashClass = null
    if(!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
      dashClass = "dash-header__container--small"
    }

  const logoutButton = (
    <button
    className='icon-button'
    title='logout'
    onClick={onlogoutClicked}
    >
    <FontAwesomeIcon icon={faRightFromBracket}/>
    </button>
  )
    let newNoteButton = null
    if(!NOTES_REGEX.test(pathname)){
       newNoteButton=(
        <button
        className='icon-button'
        title='New Note'
        onClick={onNewNoteClicked}
        >
        <FontAwesomeIcon icon={faFileCirclePlus}/>
        </button>
       )
    }
    let NoteButton = null
    if(!NOTES_REGEX.test(pathname)){
       NoteButton=(
        <button
        className='icon-button'
        title='Notes'
        onClick={onNotesClicked}
        >
        <FontAwesomeIcon icon={faFilePen}/>
        </button>
       )
    }
     
    let userButton = null
    if(!USERS_REGEX.test(pathname)){
       userButton=(
        <button
        className='icon-button'
        title='Users'
        onClick={onUsersClicked}
        >
        <FontAwesomeIcon icon={faUserGear}/>
        </button>
       )
    }
 
    let newUserButton = null
    if(!USERS_REGEX.test(pathname)){
       newUserButton=(
        <button
        className='icon-button'
        title='New Users'
        onClick={onNewUserClicked}
        >
        <FontAwesomeIcon icon={faUserPlus}/>
        </button>
       )
    }
     
    
    let buttonContent
    if(isLoading){
      buttonContent = <p>Logging out ....</p>

     }else{
      buttonContent = (
        <>
         {newNoteButton}
         {NoteButton}
         {newUserButton}
         {userButton}
         {logoutButton}
        </>
      )
     }
    

  const content = (
    <header className="dash-header">
     <div className={`dash-header__container ${dashClass}`}>
       <Link to="/dash/notes">
        <h1 className='dash-header__title'>techNotes</h1>
       </Link>
       <nav className="dash-header__nav">
         {buttonContent}
          {logoutButton}
       </nav>
     </div>
    </header>
  )
  return content
}

export default DashHeader