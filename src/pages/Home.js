import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from "react-bootstrap";
import { loadUsersStart, deleteUsersStart } from "../redux/action";
import {Link} from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast'
import { Modal } from 'react-bootstrap';

const Home = () => {
    const dispatch = useDispatch();
    const {users} = useSelector(state => state.data);

    useEffect(() => {
        dispatch(loadUsersStart());
    }, [])

    const handleDelete = (id) => {
        dispatch(deleteUsersStart(id));
        toast.success('Data successfully deleted!')
    }

    return (
        <div className="contsiner" style={{marginTop: "50px"}}>
            <Table> 
                <thead>  
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Userame</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                
                {users &&
                    users.map((item, index) => (
                        <tbody key={index}>
                            <tr >
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Button variant="primary" style={{marginLeft: "10px"}} onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </Button>
                                    <Link to={`/editUser/${item.id}`}>
                                    <Button variant="primary"  style={{marginLeft: "10px"}}>
                                        Edit
                                    </Button>
                                    </Link>
                                </td>
                            </tr>
                    </tbody>
                ))}
                
            </Table>
            <Toaster
        position="top-center"
        reverseOrder={false}
/>
            
        </div>
    )
}

export default Home;