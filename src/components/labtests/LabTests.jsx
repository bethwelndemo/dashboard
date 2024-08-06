import React, { useEffect, useState } from 'react';
import './labtests.css';
import Layout from '../layout/Layout';
import CheckSession from '../../helpers/CheckSession';
import axiosInstance from '../../helpers/axiosinstanceToken';
import '../../index.css';

const LabTests = () => {
  const [loading, setLoading] = useState(false);
  const [labtests, setLabtests] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const [failure, setFailure] = useState(null);
  
  const { lab_name, access_token } = CheckSession();
  const lab_id = localStorage.getItem("lab_id");

  useEffect(() => {
    setLoading(true);
    axiosInstance.post("/viewlabtests", { lab_id })
      .then((response) => {
        setLabtests(response.data.message);
        setFilterData(response.data.message); // Initialize filterdata with fetched data
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setFailure(error.message);
      });
  }, [lab_id]);

  // Function to handle live search
  const handleSearch = (value) => {
    setQuery(value);
    const filterresult = labtests.filter((item) =>
      item.test_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(filterresult);
  };

  return (
    <div className="containerrr">
      <Layout />
      {loading ? (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="table-container">
          <h1 className="table-title">Lab Tests</h1>
          {failure && <div className="error-message">{failure}</div>}
          <input
            type="text"
            placeholder='Search Lab test'
            className='form-control mb-3'
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
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
              {filterdata.length > 0 ? (
                filterdata.map((test, index) => (
                  <tr key={index}>
                    <td>{test.test_name}</td>
                    <td>{test.test_description}</td>
                    <td>Ksh{test.test_cost}</td>
                    <td>{test.test_discount}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">No lab tests available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LabTests;
