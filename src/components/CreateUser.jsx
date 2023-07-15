import { useState,useEffect } from 'react'
import { Form,Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { addUser, updateUser } from '../features/users/users'
import { useDispatch, useSelector } from 'react-redux'
const CreateUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isEdit,viewDetails} = useSelector((state) => state.users)
  const [details,setDetails] = useState({id:'',name:'',email:'',phone:''})
  console.log(details)
 
    const handleSubmit = async (e) => {
      e.preventDefault()
      if(isEdit) {
        try {
          const res = await axios.put(`http://localhost:5000/users/${details._id}`,details)
          dispatch(updateUser(details))
          navigate('/')
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const res = await axios.post(`http://localhost:5000/users/`,details)
          dispatch(addUser(res.data))
          navigate('/')
        } catch (error) {
          console.log(error)
        }
      }
    }
    useEffect(() => {
      if(isEdit) {
        setDetails(...viewDetails)
      }
    },[])
  return (
    <div className='container my-4'>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Id</Form.Label>
            <Form.Control type="input" placeholder="Enter Id" onChange={(e) => setDetails({...details,id:e.target.value})} value={details.id}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
            <Form.Control type="input" placeholder="Enter Name" onChange={(e) => setDetails({...details,name:e.target.value})} value={details.name}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" onChange={(e) => setDetails({...details,email:e.target.value})} value={details.email}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="phone" placeholder="Enter Phone" onChange={(e) => setDetails({...details,phone:e.target.value})} value={details.phone}/>
        </Form.Group>
      <Button variant="primary" type="submit">
        {isEdit ? 'Update' : 'Create'}
      </Button>
    </Form>
    </div>
  )
}

export default CreateUser