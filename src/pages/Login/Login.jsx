import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import User from "../../services/user.service";
import { useDispatch } from "react-redux";
import { login } from "../../state/userSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setItem } = useLocalStorage();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [googleLoginUrl, setGoogleLoginUrl] = useState("");

  useEffect(() => {
    getGoogleUrl;

    return () => {
      getGoogleUrl();
    };
  }, []);

  const getGoogleUrl = async () => {
    let res = await User.getGoogleUrl();
    setGoogleLoginUrl(res.url);
  };

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
    // Add your signup logic here
    try {
      let data = await User.login(formData);
      if (data) {
        setItem("token", data.token);
        await dispatch(login(data.token));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <div className="inner-form-container">
        <form className="login-form form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>
          <button type="submit">Login</button>
          <a className="google-btn" href={googleLoginUrl}>
            <img src="./src/assets/g.png" alt="" />
            Login with Google
          </a>
          <Link to="/forgot-password">Forgot Password?</Link>
        </form>
        <div className="form-img"></div>
      </div>
    </div>
  );
}

export default Login;
