import React from 'react'
import './topbar.css'
import { AiFillCalendar } from "react-icons/ai";
import { AiTwotoneAppstore } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const TopBar = () => {
  return (
    <nav className='topbar'>
      {/* left side */}
      <div className="topbar-admin">Admin Portal</div>

      {/* right hand side */}
      <div className="topbar-content">
        <div className="topbar-date">
            <AiFillCalendar />
            <span>User: Bob </span>
        </div>

        <div className="topbar-icon">
          <AiTwotoneAppstore />
          <span>/</span>
          <FaBell />
          <div className="topbar-image">
          <CgProfile />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopBar
