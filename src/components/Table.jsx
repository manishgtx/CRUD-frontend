import React from 'react'
import {Table,Button} from 'react-bootstrap'
import {BsFillTrashFill,BsFillPencilFill,BsEye,BsPersonFillAdd} from 'react-icons/bs'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate,NavLink } from 'react-router-dom'
import { removeUser,viewDetails,editUser } from '../features/users/users'
const TableComp = () => {
    const {users} = useSelector((state) => state.users)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleView = (id) => {
        dispatch(viewDetails(id))
        navigate('/view')
      }
    const handleEdit = (id) => {
        dispatch(editUser(id))
        navigate('/add')
    }
  return (
    <div className="container">
        <div className="d-flex justify-content-end m-4">
            <NavLink to='/add'><Button className="btn btn-primary"><BsPersonFillAdd/> Add User</Button></NavLink>
        </div>
        <Table bordered hover size='sm' responsive="sm">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => {
                        return <tr key={user._id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>
                            <span className='d-flex gap-2'>
                                <Button variant='success' onClick={() => handleView(user._id)}><BsEye/></Button>
                                <Button variant='primary' onClick={() => handleEdit(user._id)}><BsFillPencilFill/></Button>
                                <Button variant='danger' onClick={() => dispatch(removeUser(user._id))}><BsFillTrashFill className='delete-btn'/></Button>
                            </span>
                        </td>
                    </tr>
                    })
                }
                
            </tbody>
        </Table>
    </div>
  )
}

export default TableComp