import React, {useEffect, useState} from 'react'
import './mybooking.css'
import Layout from '../layout/Layout'
import CheckSession from '../../helpers/CheckSession'
import axiosInstance from '../../helpers/axiosinstanceToken'


const MyBooking = () => {
  const {lab_name, lab_id, access_token} = CheckSession()
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(()=>{
    setLoading(true)
    axiosInstance.post("/viewlabookings", {
      lab_id:lab_id
    })
    .then(function(response){
      console.log(response);
      // setBookings(response.data);
      setLoading(false)
    })
    .catch(function(error){
      console.log(error);
      setFailure(error.message)
      setLoading(false)
    })
  },[])
  return (
    <div>
    <Layout/>
    <section className="container">
      <h1>My Bookings</h1>
    </section>
  </div>
  )
}

export default MyBooking
