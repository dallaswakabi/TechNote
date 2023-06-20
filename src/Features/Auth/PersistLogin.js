import { Outlet,Link} from "react-router-dom"
import {useEffect,useRef,useState} from 'react'
import { useRefreshMutation } from "./AuthApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./AuthSlice"


const PersistLogin = () => {
    const [persist] = usePersist()
    const Token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const [trueSuccess,setTrueSuccess] = useState(false)

    const [refresh,{
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(()=>{
        if(effectRan.current === true || process.env.NODE_ENV !== 'development'){
            const verifyRefreshToken = async()=>{
                console.log('verify refresh Token')
                try {
                    // const response = 
                    await refresh()
                    // const {accessToke } = response.data
                    setTrueSuccess(true)
                } catch (error) {
                    console.log(error)
                }
            }
            if(!Token && persist) verifyRefreshToken()
        }
        return ()=>effectRan.current = true

       

    },[Token,persist,refresh])

    let content 

    if(!persist){
     console.log('no persist');
     content = <Outlet/>
    }else if(isLoading){
        console.log('Loading...')
        content = <p>Loading...</p>
    }else if(isError){
      console.log('error')
      content = (
        <p className="errmsg">
            {error.data?.message}
            <Link to="/login">Please Login Again</Link>
        </p>
      )
    }else if(isSuccess && trueSuccess){
        console.log('success')
        content = <Outlet/>
    }else if(Token && isUninitialized){
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet/>
    }
   return content
}

export default PersistLogin