import React from 'react'
import Navbar from '../../components/Navbar/NavbarHome'
import Globe from '../../components/Globe'
// import Footer from '../../components/Footer'
import Signup from '../../components/Forms/Signup'
import Signin from '../../components/Forms/Signin'

const Homeglobe = () => {
    return <div>
        <Navbar />
        <Globe />
        <Signin />
        <Signup></Signup>
    </div>
}


export default Homeglobe

