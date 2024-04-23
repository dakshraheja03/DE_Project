import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword1, setIsValidPassword1] = useState(true);
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();


  const handleBlur = () => {
    const isValid = validateEmail(email);
    setIsValidEmail(isValid);
  };

  const validateEmail = (email) => {
    // Regular expression pattern for validating email addresses
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression pattern for validating password
    const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    return pattern.test(password);
  };

  const handleBlur1 = () => {
    const isValid = validatePassword(password);
    setIsValidPassword1(isValid);
  };
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials");
    }
  };
  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container " style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onBlur={handleBlur}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email2"
              placeholder="Enter Your Email "
              required
            />
            {!isValidEmail && <div style={{ color: 'red' }}>Please enter a valid email address.</div>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleBlur1}
              className="form-control"
              id="password2"
              placeholder="Enter Your Password"
              required
            />
            {!isValidPassword1 && <div style={{ color: 'red' }}>Please enter a valid password.</div>}
          </div>
          <p>New here? <a style={{textDecoration:"none",color:"black",fontStyle:"italic"}} href="http://localhost:3000/register">Register</a></p>
          <button type="submit" className="btn btn-primary" id="submitloginbutton">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
