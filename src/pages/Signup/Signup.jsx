import React, { useState } from "react";
import "./Signup.css";
import User from "../../services/user.service";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      let res = await User.register(formData);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    // Add your signup logic here
  };

  return (
    <div className="form-container">
      <div className="inner-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <button type="submit">Sign up</button>
        </form>
        <div className="form-img"></div>
      </div>
    </div>
  );
}

export default Signup;
