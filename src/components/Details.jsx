import React from 'react'
import {Table} from 'react-bootstrap'
const Details = ({view}) => {
  return (
    <Table bordered hover size='sm' responsive="sm">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>email</th>
                    <th>phone</th>
                </tr>
            </thead>
            <tbody>
                {
                    view.map((user) => {
                        return <tr key={user._id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                    </tr>
                    })
                }
                
            </tbody>
        </Table>
  )
}

export default Details