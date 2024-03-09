import React, { useEffect, useState } from "react";
import "../Form.css";
import { Link, useNavigate } from "react-router-dom";
import User from "../../../services/user.service";
import { useDispatch } from "react-redux";
import { login } from "../../../state/userSlice";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import FormError from "../FormError/FormError";
import { Box, Button, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setItem } = useLocalStorage();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [googleLoginUrl, setGoogleLoginUrl] = useState("");

  const [error, setError] = useState({
    valid: false,
    message: "",
  });

  useEffect(() => {
    getGoogleUrl();

    return () => {
      getGoogleUrl();
    };
  }, []);

  const getGoogleUrl = async () => {
    console.log("requested");
    let res = await User.getGoogleUrl();
    console.log(res);
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
    setError({ valid: true, message: "" });
    // Add your signup logic here
    try {
      let data = await User.login(formData);
      if (data) {
        setItem("token", data.token);
        dispatch(login(data.token));
        navigate("/");
      }
    } catch (err) {
      console.log(err.response.data.message);
      setError({ valid: false, message: err.response.data.message });
    }
  };

  return (
    <Box height="calc(100vh - (8rem))">
      <form className="login-form form" onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          gap="2rem"
        >
          <Typography variant="h3">Login</Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="1rem"
            position="relative"
          >
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
              width="1"
            >
              <Button variant="contained" fullWidth="true" type="submit">
                Login
              </Button>
              <Button
                variant="contained"
                fullWidth="true"
                startIcon={<GoogleIcon />}
                href={googleLoginUrl}
              >
                Login with Google
              </Button>
            </Box>
            <Link to="/forgot-password">Forgot Password?</Link>
            {error.message && <FormError error={error} />}
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
