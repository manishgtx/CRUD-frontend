import { useState,useEffect } from "react";
import Table from "./components/Table";
import './app.css'
import {Routes,Route,useNavigate} from 'react-router-dom'
import Details from "./components/Details";
import CreateUser from "./components/CreateUser";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./features/users/users";
function App() {
  const {viewDetails} = useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [edit,setEdit] = useState({isUpdate:false,id:'',name:'',email:'',phone:''})
  const handleEdit = () => {
    navigate('/edit')
  }
  
  useEffect(() => {
    dispatch(getUsers())
  },[])
  return (
      <Routes>
        <Route path="/" element={<Table/>}/>
        <Route path="/view" element={<Details view={viewDetails}/>}/>
        <Route path="/add" element={<CreateUser />}/>
      </Routes>
  );
}

export default App;
