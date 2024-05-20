import React from 'react'
import { Link } from 'react-router-dom'

const NavbarClient = () => {
  return (
    <div>
      <Link className='bg-black text-white p-3 rounded-lg mt-4' to={'/all'}>
        Admin Page
      </Link>
    </div>
  )
}

export default NavbarClient
