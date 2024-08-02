import React, {useState} from 'react'
import './signup.css'
import axiosInstance from '../../helpers/axiosInstance'


const SignUp = () => {

    const [name,setName] = useState("")
    const [permit,setPermit] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    // add states to see whether its loading, its success or failure
    const [loading, setLoading] = useState(false)
    const [failure, setFailure] = useState(null)
    const [success, setSuccess] = useState(null)

  // handle lab sign up
  const handleSignUp = (e) =>{
    //this action is going to be triggered when user clicks the submit button
    e.preventDefault()
    setLoading(true)
    //use axios instance to post data to api
    axiosInstance.post('/labsignup', {
      lab_name: name,
      permit_id: permit,
      email:email,
      phone: phone,
      password: password
    })
    .then((response) =>{
      setSuccess(response?.data?.message)
      // console.log(response)
      setLoading(false)
    })
    .catch((error)=>{
      setLoading(false)
      setFailure(error.message)
    })
  }
// loading page
if(loading){
  return <p>Loading...Please wait.</p>

}
  return (
      <div className="container">
            <div className="form-container">
                <h2 className="header">Register Lab</h2>
                {/* return response for success */}
                {success && <div style={{color:'green'}}>{success}</div>}
                {/* return response for failure */}
                {failure && <div style={{color:'red'}}>{failure}</div>}


                <form className='card shadow p-3 pt-4' onSubmit={handleSignUp}>
                    <div className="form-group">
                        <label htmlFor="labName">Lab Name</label>
                        <input
                            type="text"
                            id="labName"
                            name="labName"
                            className="input"
                            required
                            placeholder="Enter Lab Name"
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="permitId">Permit ID</label>
                        <input
                            type="text"
                            id="permitId"
                            name="permitId"
                            className="input"
                            placeholder="Enter Permit ID"
                            required
                            onChange={(e)=>setPermit(e.target.value)}
                            value={permit}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="input"
                            placeholder="Enter Email"
                            required
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="input"
                            placeholder="Enter Phone"
                            required
                            onChange={(e)=>setPhone(e.target.value)}
                            value={phone}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="input"
                            placeholder="Enter Password"
                            required
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
                <p className="terms">
                    Already have an account? <a href="/signin" className="link">Log in here</a>.
                </p>

            </div>
        </div>

  )
}

export default SignUp
