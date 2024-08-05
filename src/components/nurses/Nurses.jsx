import React, { useState, useEffect } from 'react';
import './nurses.css';
import Layout from '../layout/Layout';
import CheckSession from '../../helpers/CheckSession';
import axiosInstanceToken from '../../helpers/axiosinstanceToken';

const Nurses = () => {
  const [loading, setLoading] = useState(false);
  const [nurses, setNurses] = useState([]);
  const { lab_name, lab_id, access_token } = CheckSession();
  const [error, setError] = useState(null);


  

  useEffect(()=>{
    setLoading(true)
    axiosInstanceToken.post("/viewnurses", {
      lab_id:lab_id
    })
    .then(function(response){
      console.log(response.data);
      setNurses(response.data);
      setLoading(false)
    })
    .catch(function(error){
      console.log(error);
      setError(error.message)
      setLoading(false)
    })
  },[])
  // console.log(nurses)
  return (
    <div className="cont">
      <Layout />
      {loading ? (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="table-container">
          <h1 className="table-title">Nurses</h1>
          {error && <div className="error-message">{error}</div>}
          <table className="nurses-table">
            <thead>
              <tr>
                <th>Surname</th>
                <th>Others</th>
                <th>Gender</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {nurses.length > 0 ? (
                nurses.map((nurse, index) => (
                  <tr key={index}>
                    <td>{nurse.surname}</td>
                    <td>{nurse.others}</td>
                    <td>{nurse.gender || "N/A"}</td>
                    <td>{nurse.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">No nurses available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Nurses;
