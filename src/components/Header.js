import React from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../context/AuthProvider"
import useAuth from "../hooks/useAuth"
import axios from "../api/axios"


export default function Header() {
  let navigate = useNavigate(); 
  const { auth } = React.useContext(AuthProvider)
  const { setAuth } = useAuth();
  function sendUnpublished(){
    navigate("/unpublished")
  }
  function sendHome(){
    navigate("/")
  }
  function sendLogin(){
    navigate("/login")
  }
  function sendWritePost(){
    navigate("/write-post")
  }
  const logout = async () => {
    setAuth({});
    try {
      const res = await axios("/users/logout", {
        withCredentials: true
      })
    } catch (err){
      console.error(err);
    }
  }

  return (
    <nav>

      <ul className="navbar">
        {auth?.accessToken && <li><button className="nav-button" onClick={sendWritePost}>Write new post</button></li>}
        {auth?.accessToken && <li><button className="nav-button" onClick={sendUnpublished}>Unpublished</button></li>}
        <li><button className="nav-button" onClick={sendHome}>Home</button></li>
        
        {auth?.accessToken ? <li><button className="nav-button" onClick={logout}>Logout</button></li> :<li><button className="nav-button" onClick={sendLogin}>Sign in</button></li>}
      </ul>
    </nav>
  );
}
