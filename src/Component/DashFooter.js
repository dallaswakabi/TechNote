import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' 
import {faHouse} from '@fortawesome/free-solid-svg-icons'
import {useNavigation,useLocation} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const DashFooter = () => {
  const {username,status} = useAuth()
  const navigation = useNavigation();
  const {pathname} = useLocation();

  const onGoHomeClick = ()=>navigation("/dash")

   let goHomeButton = null;

    if(pathname !== '/dash'){
      goHomeButton=(
        <button
         className='dash-footer__button icon-button'
         title="Home"
         onClick={onGoHomeClick}
        >
         <FontAwesomeIcon icon={faHouse} />
        </button>
      )
    }

    const Content = (
        <footer className='dash-footer'>
          {goHomeButton}
          <p>Current User:{username}</p>
          <p>Status:{status}</p>
        </footer>
    )
  return Content
}

export default DashFooter