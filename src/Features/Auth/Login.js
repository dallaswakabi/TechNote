import React from 'react'
import {useRef,useState,useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setCredentials} from './AuthSlice'
import {useLoginMutation}from '../../app/api/apiSlice'
import usePersist from '../../hooks/usePersist'
//import axios from 'axios'

const Login = () => {

  const userRef = useRef()
  const errRef  = useRef()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [errMsg,setErrMsg] = useState('')
  const [persist,setPersist] = usePersist()

  const navigate  = useNavigate()
  const dispatch = useDispatch()

  const [login,{isLoading}] = useLoginMutation()
    
  useEffect(()=>{
      userRef.current.focus()
  },[])
  
  useEffect(()=>{
    setErrMsg('')
},[])


  const errClass = errMsg ? "errmsg" : "offscreen"

  const handleToggle = ()=> setPersist(prev=> !prev)

   if(isLoading) return <p>loading.....</p>
   
  const handleSubmit = async(e)=>{

     e.preventDefault()
      
      try {
     /* const config = { headers: { "Content-Type": "application/json" } };
      console.log(`error no retrieve`);
        const response =  await axios.post('/api/admin/auth/login',{username,password},config)
         if(response.status === 200){
           console.log(response.data.accessToken)
         }else{
          console.log(response)
         }
        
       */
       

      const response = await login({username,password})
     

      dispatch(setCredentials(JSON.stringify(response.data.accessToken)))
       setUsername('')
       setPassword('')
      navigate('/dash')
      
     } catch (err) {
     /*  if(!err.status){
         setErrMsg('no server Response')
       }else if(err.status === 400){
        setErrMsg('Missing Username or Password')
       }else if(err.status === 401){
         setErrMsg('Unauthorized')
       }else{
      setErrMsg(err.data?.message)
       }
       errRef.current.focus()
        */
       console.log(err.response.data.message);
     }
    
    
  }
     

  const content = (
          <section className='public'>
            <header>
              <h1>Employee Login</h1>
            </header>
             <main className='login'>
              <p ref={errRef} className={errClass} aria-live='assertive'>{errMsg}</p>
               <form className='form' onSubmit={handleSubmit}>
                <label htmlFor='username'>UserName:</label>
                <input 
                className='form__input'
                type='text'
                id='username'
                ref={userRef}
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                autoComplete='off'
                
                />
                <label htmlFor='username'>Password:</label>
                <input 
                className='form__input'
                type='password'
                id='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              
                />
                <button className='form__submit-button'>Sign In</button>
               
               <label htmlFor="persist" className='form__persist'>
                 <input
                  type='checkbox'
                  className='form__checkbox'
                  id="persist"
                  onChange={handleToggle}
                 />
                 Trust This Device
               </label>

               </form>
             </main>
             <footer>
             <Link to='/'>Back Home</Link>
             </footer>
          </section>    
      )

  return content
}

export default Login