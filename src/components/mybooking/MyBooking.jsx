import React, { useEffect, useState } from 'react';
import './mybooking.css';
import Layout from '../layout/Layout';
import CheckSession from '../../helpers/CheckSession';
import axiosInstance from '../../helpers/axiosinstanceToken';

const MyBooking = () => {
  const { lab_id } = CheckSession();
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post("/view_bookings", { lab_id });
        setBookings(response.data);
        setFilterData(response.data); // Initialize filterData with response data
        setLoading(false);
      } catch (error) {
        console.error(error);
        setFailure(error.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [lab_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (failure) {
    return <div>Error: {failure}</div>;
  }

  // Function to handle live search
  const handleSearch = (value) => {
    setQuery(value);
    const lowercasedValue = value.toLowerCase();
    const filterResult = bookings.filter((item) => {
      const surname = item.key?.surname?.toLowerCase() || "";
      return surname.includes(lowercasedValue);
    });
    setFilterData(filterResult);
  };

  return (
    <div>
      <Layout />
      <section className="conta">
        <h1>My Bookings</h1>
        <input
          type="text"
          placeholder="Search Bookings"
          className="form-control mb-3"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {filterData.length > 0 ? (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Where Taken</th>
                <th>Surname</th>
                <th>Booked for</th>
                <th>Invoice No</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.appointment_date || "N/A"}</td>
                  <td>{booking.appointment_time || "N/A"}</td>
                  <td>{booking.status || "N/A"}</td>
                  <td>{booking.where_taken || "N/A"}</td>
                  <td>{booking.key?.surname || "N/A"}</td>
                  <td>{booking.booked_for || "N/A"}</td>
                  <td>{booking.invoice_no || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings found.</p>
        )}
      </section>
    </div>
  );
};

export default MyBooking;
