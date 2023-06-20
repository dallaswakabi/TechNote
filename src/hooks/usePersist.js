import {useState,useEffect} from 'react'


const usePersist = () => {
  
    const [Persist,setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)

    useEffect(()=>{
        localStorage.setItem("persist",JSON.stringify(Persist))
    },[Persist])

  return [Persist,setPersist]
}

export default usePersist