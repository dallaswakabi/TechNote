import React from 'react'
import {useState,useEffect} from 'react'
import {useAddNewUserMutation} from './userApiSlice'
import {useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {fasave} from '@fortawesome/free-solid-svg-icons'
import {ROLES} from '../../Config/Roles' 

const USER_REGEX = /^[A-Z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
 const {
   isLoading,
   isSuccess,
   isError,
   error
 } = useAddNewUserMutation()

 let AddNewUser = useAddNewUserMutation()

   const navigate = useNavigate()
   const [username,setUsername] = useState('')
   const [validUsername,setValidUsername] = useState(false)
   const [password,setPassword] = useState('')
   const [validPasswod,setValidPassword] = useState(false)
   const [roles,setRoles] = useState(["Employee"])
  
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
     },[isSuccess,navigate])
     
     const onUsernameChange = e => setUsername(e.target.value)
     const onPasswordChange = e =>setPassword(e.target.value)
     const onRolesChange = e =>{
      const value = Array.from(
        e.target.selectedOptions,(option)=>option.value
      ) 
      setRoles(value)
     }

    const cansave = [roles.length,validUsername,validPasswod].every(Boolean) && !isLoading
    
    const CansaveUserClicked =async(e)=>{
        e.preventDefault()
        if(cansave){
          await AddNewUser({username,password,roles})
        }
    }
  
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

  const errClass = isError ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? 'form__input--incomplete' : ''
  const validPWDClass =  !validPasswod  ? 'form__input--incomplete' : ''
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

 const content = (
     <>
       <p className={errClass}>{errClass?.data}</p>
       <form className='form' onSubmit={CansaveUserClicked}>
         <div className='form_title-row'>
           <h2>New User</h2>
           <div className='form__action-button'>
            <button
            className='icon-button'
            title="save"
            disabled={!cansave}
            >
            <FontAwesomeIcon icon="fas fa-save" />
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

export default NewUserForm