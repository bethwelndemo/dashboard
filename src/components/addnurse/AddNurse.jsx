import React ,{useState}from 'react'
import './addnurse.css'
import Layout from '../layout/Layout'
import axiosInstanceToken from '../../helpers/axiosinstanceToken'
import CheckSession from '../../helpers/CheckSession'

const AddNurse = () => {
  const {lab_name, lab_id, access_token} = CheckSession()
  const [surname, setName] = useState(null)
  const [others, setOthers] = useState(null)
  const [gender, setGender] = useState(null)
  const [phone, setPhone] = useState(null)
  const [password, setPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [failure, setFailure] = useState(null)


  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setFailure(null)

    axiosInstanceToken.post('/addnurse',{
      lab_id,
      surname:surname,
      others:others,
      gender: gender,
      phone:phone,
      password:password
    })
    .then(function(response){
      console.log(response.data)
      setLoading(false)
      setSuccess(response.data.message)
    })
    .catch(function(error){
      console.log(error.message);
      setLoading(false)
      setFailure(error.message);
    })
  }

  return (
    <div>
    <Layout/>
    <section className="container">
      
    <div className="form-container">
      <h1 className="form-title">Add Nurse</h1>
      {loading && <div className= "response" style={{color:'blue'}}> Please Wait..</div>}
      {success && <div className= "response" style={{color:'green'}}> {success}</div>}
      {failure && <div className= "response" style={{color:'red'}}> {failure}</div>}
      <form className="nurse-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Enter Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={surname}
            onChange={(e) => setName(e.target.value)}
            // Remove the value and onChange props
          />
        </div>

        <div className="form-group">
          <label htmlFor="others">Enter Others:</label>
          <input
            type="text"
            id="others"
            name="others"
            value={others}
            onChange={(e) => setOthers(e.target.value)}
            // Remove the value and onChange props
          />
        </div>

        <div className="form-group">
          <label>Your Gender:</label>
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                // Remove the checked and onChange props
              /> Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                // Remove the checked and onChange props
              /> Female
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
            onChange={(e) => setPhone(e.target.value)}

            // Remove the value and onChange props
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Enter Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

            // Remove the value and onChange props
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    </section>
  </div>
  )
}

export default AddNurse
