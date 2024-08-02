import React,{useEffect, useState} from 'react'
import './labtests.css'
import Layout from '../layout/Layout'
import CheckSession from '../../helpers/CheckSession'
import axiosInstance from '../../helpers/axiosinstanceToken'



const LabTests = () => {
  const [loading, setLoading] = useState(false)
  const [labtests, setLabtests] = useState([])
  const {lab_name, laccess_token} = CheckSession()
  const lab_id = localStorage.getItem("lab_id")
  const [failure, setFailure] = useState(null)
    useEffect( () => {
        // set loading to be true
        setLoading(true)
        axiosInstance.post("/viewlabtests", {lab_id})
        .then((response) => {
            setLabtests(response.data.message)
            setLoading(false)
        })
        .catch((error)=>{
            setLoading(false)
            setFailure(error.message)
        })

    },[lab_id])

    // lets console and see if we get all users
    console.log(labtests)
    if(loading){
       return <p>loading</p>
    }

    
  return (
   
    <div className="cont">
      <Layout/>
      <div className="table-container">
      
      <h1 className="table-title">Lab Tests</h1>
      <table className="lab-tests-table">
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Description</th>
            <th>Cost</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {labtests.map((test, index) => (
            <tr key={index}>
              <td>{test.test_name}</td>
              <td>{test.test_description}</td>
              <td>${test.test_cost}</td>
              <td>{test.test_discount}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}


export default LabTests
