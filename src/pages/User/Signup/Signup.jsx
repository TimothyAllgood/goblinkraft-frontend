import React, { useState, useEffect } from "react";
import "../Form.css";
import User from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import FormError from "../FormError/FormError";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [googleLoginUrl, setGoogleLoginUrl] = useState("");

  const [error, setError] = useState({
    valid: false,
    message: "",
  });

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
    console.log(event);
    setError({ valid: true, message: "" });

    try {
      let res = await User.register(formData);
      if (res) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError({ valid: false, message: err.response.data.message });
    }
    // Add your signup logic here
  };

  return (
    <Box height="calc(100vh - (50px + 2rem))">
      <form className=" form" onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          gap="2rem"
        >
          <Typography variant="h3">Sign up</Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="1rem"
          >
            <TextField
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <TextField
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />

            <TextField
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <Button variant="contained" fullWidth="true" type="submit">
                Sign up
              </Button>
              <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                href={googleLoginUrl}
              >
                Sign up with Google
              </Button>
            </Box>

            {error.message && <FormError error={error} />}
          </Box>
        </Box>
      </form>
    </Box>
  );

  return (
    <div className="form-container">
      <div className="inner-form-container">
        <form className="signup-form form" onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
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
          <a className="google-btn" href={googleLoginUrl}>
            <img src="./src/assets/g.png" alt="" />
            Sign Up with Google
          </a>
          {error.message && <FormError error={error} />}
        </form>
      </div>
    </div>
  );
}

export default Signup;
