import React from 'react'
import { useState,useEffect} from 'react'
import {useUpdateUserMutation,useDeleteUserMutation} from './userApiSlice'
import {useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {ROLES} from '../../Config/Roles'

const EditUserForm = ({user}) => {
   
  const updateUser = useUpdateUserMutation()
  const deleteUser = useDeleteUserMutation()


  const USER_REGEX = /^[A-z]{3,20}$/
  const PWD_REGEX = /^[A-z-9!@#%]{4,12}$/
  
  const [updatedUser,{
    isLoading,
    isSuccess,
    isError,
    error
  }]= useUpdateUserMutation()

  const [deletedUser,{
    isSuccess:isDelSuccess,
    isError:isDelError,
    error:delerror
  }]= useDeleteUserMutation()

  const navigate = useNavigate()

  const [username,setUsername] = useState(user.username)
  const [validUsername,setValidUsername] = useState(false)
  const [password,setPassword] = useState('')
  const [validPasswod,setValidPassword] = useState(false)
  const [roles,setRoles] = useState(user.roles)
  const [active,setActive] = useState(user.active)
 
   useEffect(()=>{
     setValidUsername(USER_REGEX.test(username))
   },[username])

    useEffect(()=>{
     setValidPassword(PWD_REGEX.test(password))
   },[username])

    useEffect(()=>{
     if(isSuccess){
       setUsername('')
       setPassword('')
       setRoles([])
       navigate('/dash/users')
     }
   
      if(isDelSuccess){
        setUsername('')
        setPassword('')
        setRoles([])
        navigate('/dash/users')
      }

    },[isSuccess,isDelSuccess,navigate])
    
    const onUsernameChange = e => setUsername(e.target.value)
    const onPasswordChange = e =>setPassword(e.target.value)

    const onRolesChange = e =>{
     const value = Array.from(
       e.target.selectedOptions,(option)=>option.value
     ) 
     setRoles(value)
    }

    const onActiveChanged = ()=> setActive(prev =>!prev)

    const CansaveUserClicked =async(e)=>{
      e.preventDefault()
      if(password){
        await updateUser({id:user.id,username,password,roles,active})
      }else{
        await updateUser({id:user.id,username,roles,active})
      }
  }

  const ondeleteUserClicked = async()=>{
    await deleteUser({id:user.id})
  }
   
  let cansave

   if(password){
     cansave = [roles.length,validUsername,validPasswod].every(Boolean) && !isLoading
   }else{
     cansave = [roles.length,validUsername].every(Boolean) && !isLoading
   }

   const errClass = isError ? "errmsg" : "offscreen"
   const validUserClass = !validUsername ? 'form__input--incomplete' : ''
   const validPWDClass =  !validPasswod  ? 'form__input--incomplete' : ''
   const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''
   const errContent = (error?.data?.message || delerror?.data?.message) ?? ''
   
   const options = Object.values(ROLES).map(role =>{
    return(
      <option
       key={role}
       value={role}
      >
        {role}
      </option>
    )
         })


   const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <form className='form' onSubmit={(e)=>e.preventDefault()}>
        <div className='form_title-row'>
          <h2>Edit User</h2>
          <div className='form__action-button'>
           <button
           className='icon-button'
           title="save"
           onClick={CansaveUserClicked}
           disabled={!cansave}
           >
            <FontAwesomeIcon icon="fa-sharp fa-regular fa-floppy-disk-circle-arrow-right" />
           </button>
           <button
           className='icon-button'
           title="delete"
           onClick={ondeleteUserClicked}
           >
            <FontAwesomeIcon 
             icon={faTrashCan}
            /> 
           </button>
          </div>
        </div>
        <label className='form__label' htmlFor='username'>
           Username:<span className='nowrap'>[3-20 letters]</span>
        </label>
         <input
          className={`form__input ${validUserClass}`}
          id="username"
          placeholder='Enter Username'
          type='text'
          autoComplete='off'
          value={username}
          onChange={onUsernameChange}
        />
        <label className='form__label' htmlFor='password'>
           Password:<span className='nowrap'>[4-12 chars incl. !@#%]</span>
        </label>
        <input 
         className={`form__input ${validPWDClass}`}
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={onPasswordChange}
        />
         <label className='form__label form__checkbox-container' htmlFor='user-active'>ACTIVE:</label>
          <input
            className='form__check'
            id='user-active'
            name='user-active'
            type='checkbox'
            checked={active}
            onChange={onActiveChanged}
          />

        <label className='form__label' htmlFor='roles'>ASSIGNED ROLES:</label>
        <select 
         id='roles'
         name='roles'
         className={`form__select ${validRolesClass}`}
         multiple={true}
         size="3"
         value={roles}
         onChange={onRolesChange}
        >
         {options}
         </select>
      </form>
    </>
)

 return content
}

export default EditUserForm