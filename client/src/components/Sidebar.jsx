import React from 'react'
import '../styles/Sidebar.css'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import img from '../assets/download.jpg'



function Sidebar(props) {
    const {name, location, options} = props
    return (
        <div className="sidebar">
            <img src={img} alt="" />
            <AccountCircle className='accountcircle' />
            <div className="name">{name}</div>
            <div className="location"><LocationOnIcon />{location}</div>
            {options.map((option, index) => (
                <div className={`options ${option.active ? 'active' : ''}`} onClick={option.onclick} key={index}>{option.label}</div>
            ))}
        </div>
    )
}

export default Sidebar