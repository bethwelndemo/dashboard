import React, { useState } from 'react';
import './addnurse.css';
import Layout from '../layout/Layout';
import axiosInstanceToken from '../../helpers/axiosinstanceToken';
import CheckSession from '../../helpers/CheckSession';
import '../../index.css'


const AddNurse = () => {
  // Extract session information
  const { lab_id } = CheckSession();

  // State hooks
  const [surname, setSurname] = useState('');
  const [others, setOthers] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [failure, setFailure] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setFailure('');

    try {
      const response = await axiosInstanceToken.post('/addnurse', {
        lab_id,
        surname,
        others,
        gender,
        phone,
        password
      });
      console.log(response.data);
      setSuccess(response.data.message);
    } catch (error) {
      console.error(error.message);
      setFailure('Failed to add nurse. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Layout />
      <section className="container">
        <div className="form-container">
          <h1 className="form-title">Add Nurse</h1>
          {loading && <div className="response" style={{ color: 'blue' }}>Please Wait...</div>}
          {success && <div className="response" style={{ color: 'green' }}>{success}</div>}
          {failure && <div className="response" style={{ color: 'red' }}>{failure}</div>}
          <form className="nurse-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="surname">Enter Surname:</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)} // Handle change for surname
              />
            </div>

            <div className="form-group">
              <label htmlFor="others">Enter Other Names:</label>
              <input
                type="text"
                id="others"
                name="others"
                value={others}
                onChange={(e) => setOthers(e.target.value)} // Handle change for others
              />
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <div className="gender-options">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === 'Male'}
                    onChange={(e) => setGender(e.target.value)} // Handle change for gender
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={gender === 'Female'}
                    onChange={(e) => setGender(e.target.value)} // Handle change for gender
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={gender === 'Other'}
                    onChange={(e) => setGender(e.target.value)} // Handle change for gender
                  />
                  Other
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Enter Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} // Handle change for phone
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Enter Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Handle change for password
              />
            </div>

            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddNurse;
