import React , {useState}from 'react'
import './addtests.css'
import axiosInstanceToken from '../../helpers/axiosinstanceToken'
import Layout from '../layout/Layout'
import CheckSession from '../../helpers/CheckSession'
import '../../index.css'


const AddLabTests = () => {
    const {lab_name, lab_id, access_token} = CheckSession()
    const [test_name, setName] = useState(null)
    const [test_description, setDescription] = useState(null)
    const [test_cost, setCost] = useState(null)
    const [test_discount, setDiscount] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [failure, setFailure] = useState(null)

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true)
        setSuccess(null)
        setFailure(null)

        axiosInstanceToken.post('/addlabtests',{
            lab_id,
            test_name: test_name,
            test_description: test_description,
            test_cost: test_cost,
            test_discount: test_discount
        })
            .then(function (response){
                console.log(response.data)
                setLoading(false)
                setSuccess(response.data.message)
            })

            .catch(function (error) {
                //Update Loading and Error Hooks
                console.log(error.message);
                setLoading(false)
                setFailure(error.message);
            });

    }

    return (
        <div className="container">
          <form onSubmit={handleSubmit} className="add-lab-test-form">
          <Layout/>
          <h2>Add Lab Test</h2>
          {loading && <div className= "response" style={{color:'blue'}}> Please Wait..</div>}
          {success && <div className= "response" style={{color:'green'}}> {success}</div>}
          {failure && <div className= "response" style={{color:'red'}}> {failure}</div>}
          <div className="form-group">
            <label htmlFor="test_name">Test Name:</label>
            <input type="text" id="test_name" name="test_name" value={test_name} onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="test_description">Test Description:</label>
            <textarea name="description"  cols="10" rows="3" value={test_description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="test_cost">Test Cost:</label>
            <input type="number" id="test_cost" name="test_cost" value={test_cost} onChange={(e) => setCost(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="test_discount">Test Discount:</label>
            <div className='input-container'><input type="number" id="test_discount" name="test_discount" value={test_discount} onChange={(e) => setDiscount(e.target.value)}/> <span className='percent-sign'>%</span> </div>
          </div>
          <button type="submit" className="submit-button">Add Lab Test</button>
        </form>
        </div>
      );
      
}

export default AddLabTests