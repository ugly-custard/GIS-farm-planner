import React from 'react'
import "../styles/Navbar.css"
import dashboardButton from '../assets/dashboardButton.svg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Googletranslate from '../components/Googletranslate'


function Navbar() {
  return (
    <div className='navbar'>
        <div className='navbar__left'>
            <h1>KhetiBaadi</h1>
        </div>
        <div className='navbar__right'>
            <div className="gtrans">
            <Googletranslate className='navbar__right__buttons' />
            </div>
            <img src={dashboardButton} alt='dashboardSvg' className='navbar__right__buttons'/>
            <AccountCircleIcon className='navbar__right__buttons'/>
        </div>        
    </div>
  )
}

export default Navbar