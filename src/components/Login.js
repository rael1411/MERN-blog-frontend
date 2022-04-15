import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../api/axios';
import Header from "./Header";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import useAuth from "../hooks/useAuth";

const LOGIN_ENDPOINT = "/users/login"

export default function Login() {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    email: "",
  });
  
  const [errMsg, setErrMsg] = React.useState("");
  //controlling the login form
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  //sends the data to the api and gets back the token
  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = ({
      username: formData.username,
      password: formData.password,
    });
    try {
      const response = await axios.post(LOGIN_ENDPOINT,
        JSON.stringify(credentials), 
        {
          headers: {"Content-Type": "application/json" },
          withCredentials: true
        }
      )

      const accessToken = response?.data?.accessToken;

      setAuth({user: formData.username, password: formData.password, accessToken: accessToken});
      navigate(from, { replace: true})
    } catch(err) {
      if (!err?.response) {
        setErrMsg("No server response")
      } else {
        console.log(err.response)
        const status = err.response.status;
        if (status === 400) {
          setErrMsg("Missing username or password")
        }
        else if (status === 401) {
          setErrMsg("Unauthorized")
        }
        else if (status === 404){
          setErrMsg("User not found")
        }
        else {
          setErrMsg("login failed")
        }
      }
    }
  }
  //handles trust this device checkbox
  const togglePersist = () => {
    setPersist(prevPersist => !prevPersist)
  }
  React.useEffect(() => {
    localStorage.setItem("persist", persist)
  }, [persist])
  return (
    <div>
      <Header />
      <p>Sample user:</p>
      <p>Username: cane2 - Password: blabla</p>
      <LoginForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        errMsg={errMsg}
        togglePersist={togglePersist}
      />
      <Footer />
    </div>
  );
}
