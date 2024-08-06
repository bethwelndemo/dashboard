import React, { useState, useEffect } from 'react';
import './nurses.css';
import Layout from '../layout/Layout';
import CheckSession from '../../helpers/CheckSession';
import axiosInstanceToken from '../../helpers/axiosinstanceToken';

const Nurses = () => {
  const [loading, setLoading] = useState(false);
  const [nurses, setNurses] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const { lab_name, lab_id, access_token } = CheckSession();

  useEffect(() => {
    setLoading(true);
    axiosInstanceToken.post("/viewnurses", { lab_id })
      .then(response => {
        console.log(response.data);
        setNurses(response.data);
        setFilterData(response.data); // Initialize filterdata with fetched data
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  }, [lab_id]);

  // Function to handle live search
  const handleSearch = (value) => {
    setQuery(value);
    const filterresult = nurses.filter((item) =>
      item.surname.toLowerCase().includes(value.toLowerCase()) ||
      (item.others && item.others.toLowerCase().includes(value.toLowerCase()))
    );
    setFilterData(filterresult);
  };

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
          <input
            type="text"
            placeholder='Search Nurse'
            className='form-control mb-3'
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
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
              {filterdata.length > 0 ? (
                filterdata.map((nurse, index) => (
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
