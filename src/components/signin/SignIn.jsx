import React, { useState } from 'react';
import './signin.css';
import axiosInstance from '../../helpers/axiosInstance'
import { Link,useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const [failure, setFailure] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  
  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
  
    axiosInstance.post('/labsignin', { email:email , password:password })
      .then((response) => {
        // console.log(response?.data); // Log the response to verify
        // setSuccess(response?.data?.message);
        setLoading(false);
        // handle the response
        if(response?.data && response?.data?.access_token && response?.data?.message){
            //save data to local storage
            localStorage.setItem("lab_id", response?.data?.message?.lab_id)
            localStorage.setItem("lab_name", response?.data?.message?.lab_name)
            localStorage.setItem("email", response?.data?.message?.email)
            localStorage.setItem("permit_id", response?.data?.message?.permit_id)
            localStorage.setItem("phone", response?.data?.message?.phone)
            localStorage.setItem("access_token", response?.data?.access_token)
            localStorage.setItem("reg_date", response?.data?.message?.reg_date)

            //redirect user to home page
            navigate("/")

        }else{
            // login failed
            setFailure("LOGIN FAILED")
        }
      })
      .catch((error) => {
        // console.log('Error:', error); // Log the error for debugging
        setFailure(error.message);
        setLoading(false);
      });
  };
  
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-header">Login Lab</h2>
        {/* return response for success */}
        {success && <div style={{color:'green'}}>{success}</div>}
        {/* return response for failure */}
        {failure && <div style={{color:'red'}}>{failure}</div>}
        <form onSubmit={handleSignIn}>
          <div className="login-form-group">
            <input
              type="email"
              id="email"
              name="email"
              className="login-input"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-form-group">
            <input
              type="password"
              id="password"
              name="password"
              className="login-input"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login Account'}
          </button>
         
        </form>
        <p className="login-terms">
          Don't have an account? <a href="/signup" className="login-link">Sign up here</a>.
        </p>
      </div>
    </div>
  );
};

export default SignIn;


// import React, { useState } from 'react';

// import './signin.css';

// import axiosInstance from '../../helpers/axiosInstance';

// import { Link, useNavigate } from 'react-router-dom';



// const Signin = () => {

//   const [email, setEmail] = useState('');

//   const [password, setPassword] = useState('');

//   const [loading, setLoading] = useState(false);

//   const [failure, setFailure] = useState(null);

//   const [success, setSuccess] = useState(null);

//   const navigate = useNavigate()



//   const handleSignin = (e) => {

//     e.preventDefault();

//     setLoading(true);



   

//     axiosInstance.post('/labsignin', {

//         email: email,

//         password: password,

//       })

//       .then((response)=>{

//       // setSuccess(response?.data?.message);

//       // console.log(response.data)

//       // setFailure(null);

//       setLoading(false)

//       // handle the response 

//       if(response?.data && response?.data?.access_token && response?.data?.message){

//         // alert("Login successiful")

//         // save data to local storage 

//         localStorage.setItem("lab_id",response?.data?.message?.lab_id)

//         localStorage.setItem("lab_name",response?.data?.message?.lab_name)

//         localStorage.setItem("email",response?.data?.message?.email)

//         localStorage.setItem("permit_id",response?.data?.message?.permit_id)

//         localStorage.setItem("phone",response?.data?.message?.phone)

//         localStorage.setItem("access_token",response?.data?.access_token)

//         localStorage.setItem("reg_date", response?.data?.message?.reg_date)




//         // redirect to home page 

//         navigate("/")





        

//       }else{

//         // LOGIN FAILED 

//         setFailure("Login Failed")

//       }

         



//       })

//       . catch ((error)=> {

//       setFailure(error.message);

//       setSuccess(null);

//     })

//   }

//   if (loading) {

//     return <p>Loading...... please wait.</p>;

//   }



//   return (

//     <section className='form'>

//       {success && <div className='success'>{success}</div>}

//       {failure && <div className='failure'>{failure}</div>}



      

//       <form onSubmit={handleSignin} className='card shadow p-3 pt-4'>

//         <h1>Login Lab</h1>

//         <div className="form-group">

//           <input

//             type="email"

//             id="email"

//             placeholder='Enter Lab email'

//             className="form-control"

//             value={email}

//             onChange={(e) => setEmail(e.target.value)}

//             required

//           />

//         </div>

//         <div className="form-group">

//           <input

//             type="password"

//             id="password"

//             placeholder='Enter Lab password'

//             className="form-control"

//             value={password}

//             onChange={(e) => setPassword(e.target.value)}

//             required

//           />

//         </div>

//         <button type="submit">Sign In</button>

//         <Link to="/signup">Don't have an Account? Create one</Link>

//       </form>



    

//     </section>

//   );

// };



// export default Signin;


