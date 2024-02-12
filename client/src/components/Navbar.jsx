import React from 'react'
import "../styles/Navbar.css"
import dashboardButton from '../assets/dashboardButton.svg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Navbar() {
  return (
    <div className='navbar'>
        <div className='navbar__left'>
            <h1>KhetiBaadi</h1>
        </div>
        <div className='navbar__right'>
            <img src={dashboardButton} alt='dashboardSvg' />
            <AccountCircleIcon />
        </div>        
    </div>
  )
}

export default Navbar