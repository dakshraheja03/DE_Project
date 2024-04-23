import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword1, setIsValidPassword1] = useState(true);
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // eslint-disable-next-line
  const [answer, setAnswer] = useState("random");
  const navigate = useNavigate();

  const handleBlur = () => {
    const isValid = validateEmail(email);
    setIsValidEmail(isValid);
  };
  
  const handleBlur2=()=>{
    const isValid1 = validateNumber(phone);
    setIsValidNumber(isValid1);
  };

  const validateNumber = (number) => {
    // Regular expression pattern for validating number with 10 digits
    const pattern = /^\d{10}$/;
    return pattern.test(number);
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

  const handleBlurConfirmPassword = () => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="name1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onBlur={handleBlur}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email1"
              placeholder="Enter Your Email "
              required
            />
            {!isValidEmail && <div style={{ color: 'red' }}>Please enter a valid email address.</div>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onBlur={handleBlur1}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password1"
              placeholder="Enter Your Password"
              required
            />
            {!isValidPassword1 && <div style={{ color: 'red' }}>Please enter a valid password.</div>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              onBlur={handleBlurConfirmPassword}
              id="confirmpassword1"
              placeholder="Confirm Your Password"
              required
            />
            {!passwordsMatch && (
          <div style={{ color: 'red' }}>
            Passwords do not match
          </div>
        )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="phone1"
              placeholder="Enter Your Phone"
              onBlur={handleBlur2}
              required
            />
            {!isValidNumber && (
          <div style={{ color: 'red' }}>
            Phone number not valid.
          </div>
        )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="address1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" id="registerbuttonsubmit">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
