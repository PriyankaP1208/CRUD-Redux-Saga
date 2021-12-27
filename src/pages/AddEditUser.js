import React, {useState, useEffect} from "react";
import { Button,Form, InputGroup } from "react-bootstrap";
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { createUsersStart, updateUsersStart } from "../redux/action";
import { toast, Toaster } from 'react-hot-toast'

const initialState = {
    name: "",
    username: "",
    email:""
}

const AddEditUser = () => {
    const [formValue, setFormValue] = useState(initialState);
    const [editMode, setEditMode] = useState(false);
    const {users} = useSelector(state => state.data);
    const {name, username, email} = formValue;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            setEditMode(true)
            const singleUser = users.find(item => item.id === Number(id));
            setFormValue({...singleUser});
        }
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name && username && email){
            if(!editMode){
                dispatch(createUsersStart(formValue));
                navigate("/");
                toast.success('Data added successfully!')
            }
        else{
            dispatch(updateUsersStart({id, formValue}));
            setEditMode(false);
            navigate("/");
            toast.success('Data edited successfully!')
        }
            
        }
    }

    const onInputChange = (e) => {
        let { value, name} = e.target;
        setFormValue({...formValue, [name]: value});
    };

    return (
        <div>
            
            <Form noValidate onSubmit={handleSubmit}>
                <p className="fs-2 fw-bold">{!editMode ? "Add User Details" : "Update User Details"}</p>
            
            <div
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center"
                }}>
                    <div className="form-group">
                        <input value={name || ""} name="name" type="text" className="form-control" placeholder="Name" onChange={onInputChange}/>
                    </div>
                    <br/>

                    <div className="form-group">
                        <input value={username || ""} name="username" type="text" className="form-control" placeholder="User Name" onChange={onInputChange}/>
                    </div>
                    <br/>

                    <div className="form-group">
                        <input value={email || ""} name="email" type="email" className="form-control" placeholder="Email" onChange={onInputChange}/>
                    </div>
                    <br/>
                   
                    <div>
                        <button type="submit" className="btn btn-primary">
                            {!editMode ? "Add": "Update"}
                        </button>
                        <button onClick={() => navigate("/")} className="btn btn-danger" style={{marginLeft: "10px"}}>
                            Go Back
                        </button>
                    </div>
            </div>
            </Form>
            <Toaster
        position="top-center"
        reverseOrder={false}
/>
        </div>
    )
}

export default AddEditUser;