import { Routes,Route } from "react-router-dom";
import Layout from "./Component/Layout";
import Public from './Component/Public'
import Login from './Features/Auth/Login'
import DashLayout from './Component/DashLayout'
import  Welcome from './Features/Auth/Welcome'
import NotesList from './Features/Notes/NotesList'
import UsersList from './Features/Users/UsersList'
import EditUser from './Features/Users/EditUser'
import NewUserForm from './Features/Users/NewUserForm'
import EditNote from './Features/Notes/EditNote'
import NewNote from './Features/Notes/NewNote'
import Prefetch from './Features/Auth/Prefetch'
import PersistLogin from './Features/Auth/PersistLogin'
import RequireAuth from './Features/Auth/RequireAuth'
import { ROLES } from "./Config/Roles";
import Note from "./Features/Notes/Note";
import User from "./Features/Users/User";

function App() {
  return (
    <Routes>

      {/* starting of Public Routes*/}

      <Route path="/" element={<Layout/>}/>
      <Route index element={<Public/>} />
      <Route path="login" element={<Login/>} />

        {/* Starting Of Dash*/}
        <Route element={<PersistLogin/>} >

          {/* starting Of Protected Route*/}

        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>} >

      <Route element={<Prefetch />} >
      <Route path="dash" element={<DashLayout/>}>

        <Route index element={<Welcome/>}/>

          {/* starting Of User Route*/}

        <Route element={<RequireAuth allowedRoles={[ROLES.Manager,ROLES.Admin]}/>} >
        <Route path="users">
          <Route index element={<UsersList/>}/>
          <Route path=":id" element={<EditUser/>}/>
          <Route path="view" element={<User/>}/>
          <Route path="new" element={<NewUserForm/>}/>
        </Route> 
        </Route>
          {/* Ending Of User Route*/}
         
          {/* Starting of Notes Routes*/}

        <Route path="notes">
          <Route index element={<NotesList/>}/>
          <Route path="view" element={<Note/>}/>
          <Route path=":id" element={<EditNote/>}/>
          <Route path="new" element={<NewNote/>}/>
        </Route>  
         
       {/* Ending Of Notes Route*/}

      </Route> {/* End Of Dash Routes*/}
      </Route>
      </Route>
      {/* end OF Protected Routed */}
      </Route>
      {/* starting of Public Routes*/}

    </Routes>
  );
}

export default App;
