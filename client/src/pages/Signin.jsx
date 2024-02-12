import React from 'react'
import dasbhboardButton from '../assets/dashboardButton.svg'
import '../styles/signin.css'

function Signin() {
    return (
        <div className='signin__main'>
            <div className="signin__top">
                <div className="signin__top__left">
                    KhetiBaadi
                </div>
                <div className="signin__top__right">
                    <img src={dasbhboardButton} alt="" />
                </div>
            </div>
            <div className="signin__form">
                <h1>Welcome Back!!!</h1>
                <form action="">
                    <h3>Sign In</h3>
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Signin