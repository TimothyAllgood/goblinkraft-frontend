import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Add your signup logic here
  };

  return (
    <div className="form-container">
      <div className="inner-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="form-img"></div>
      </div>
    </div>
  );
}

export default Login;
