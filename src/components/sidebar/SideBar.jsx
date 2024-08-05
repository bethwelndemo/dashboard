import React from 'react'
import './sidebar.css'
import { BsBank } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { RiDashboard3Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { FaRegNoteSticky } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { TbBrandBooking } from "react-icons/tb";
import { FaUserNurse } from "react-icons/fa";
import { PiSiren } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import ReactLogout from '../../helpers/Logout';
import CheckSession from '../../helpers/CheckSession';

const SideBar = () => {
  const {lab_name, lab_id, access_token} = CheckSession()
  
  const {logout} = ReactLogout()
  return (
      <section className='sidebar'>
        {/* links  */}
        <div className="sidebar-top">
          <div className="sidebar-brand">
          <BsBank />
          <span>MEDILAB</span>
          </div>

          {/* sidebar links */}
          <div className="sidebar-links">
          <ul>
            <li><Link to="/"> <RiDashboard3Line/> Dashboard</Link></li>
            <li><Link to="/profile"> <RxDashboard/>  My Profile</Link></li>
            <li><Link to="/addtests"> <FaRegNoteSticky/> Add Tests</Link></li>
            <li><Link to="/viewtests"><IoPersonOutline/>Lab Tests</Link></li>
            <li><Link to="/mybookings"> <TbBrandBooking />My Bookings</Link></li>
            <li><Link to="/addnurses"><FaUserNurse/>Add Nurse</Link></li>
            <li><Link to="/viewnurses"><PiSiren/>Nurses</Link></li>

          </ul>
          </div>
        </div>

        {/* go pro division */}
        <div className="sidebar-bottom">
          <RxDashboard/>
          <span>GREAT UI. <button>Go Pro</button></span><br />
          <span><strong>Upgrade now</strong></span>
        </div>

        {/* logout division */}
        <div className="p-4 sidebar-logout">
          <button className="btn btn-dark btn-sm"  onClick={logout}>
          <CiLogout /> Logout
          </button>
        </div>
      </section>
  )
}

export default SideBar
