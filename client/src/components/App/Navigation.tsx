import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import {BsSendFill} from 'react-icons/bs'
import {FiHelpCircle} from 'react-icons/fi'
import {AiTwotonePhone} from 'react-icons/ai'
import {IoFlashSharp} from 'react-icons/io5'
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <ul className='p-4'>
         <li className='flex d-items'><FaUserCircle className='d-white' size={20} /> <Link to="/">Home</Link></li>
         <li className='flex d-items'><BsSendFill size={20} /> <Link to="/our-mission">Our Mission</Link></li>
         <li className='flex d-items'><FiHelpCircle size={20} /> <Link to="/about-us">About Us</Link></li>
      </ul>
    </>
  )
}

export default Navigation
