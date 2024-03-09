import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../services/profile.service";
import "./ProfilePage.css";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../../state/userSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function ProfilePage() {
  const id = useSelector((state) => state.user.id);
  const username = useSelector((state) => state.user.username);
  const subscribed = useSelector((state) => state.user.subscribed);
  const subscription = useSelector((state) => state.user.subscription);
  const dispatch = useDispatch();
  const { setItem } = useLocalStorage();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const _profile = await Profile.getProfile(id);
      setProfile(_profile);
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await Profile.updateProfile(profile.id, profile);
      if (res.token) {
        setItem("token", res.token);
        await dispatch(login(res.token));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isCurrentUserProfile = profile && id === profile.userId;

  if (!isCurrentUserProfile) return <p>This ain't for you!</p>;

  return (
    <section className="profile-page">
      <div
        className="profile-header"
        style={{
          backgroundImage: `url('https://cdna.artstation.com/p/assets/images/images/013/418/340/large/samuel-couture-dnd-final.jpg?1539529091')`,
        }}
      >
        <Typography variant="h4">
          Hello {profile.firstName || username}
        </Typography>
      </div>
      <Box className="profile-container">
        <div className="user-info">
          <Typography variant="h5">User Information</Typography>
          <form onSubmit={handleSubmit}>
            <div className="name-inputs">
              <div className="form-group">
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  defaultValue={profile.firstName}
                  variant="outlined"
                  sx={{ width: 1 }}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  defaultValue={profile.lastName}
                  variant="outlined"
                  sx={{ width: 1 }}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="username-inputs">
              <div className="form-group">
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  defaultValue={username}
                  variant="outlined"
                  sx={{ width: 1 }}
                  onChange={handleChange}
                />
              </div>
              <FormControl fullWidth className="form-group">
                <InputLabel id="select-label">Color Scheme</InputLabel>
                <Select
                  labelId="select-label"
                  name="colorScheme"
                  id="colorScheme"
                  defaultValue={profile.colorScheme}
                  label="Color Scheme"
                  onChange={handleChange}
                >
                  <MenuItem value={"goblinmode"}>Goblin Mode</MenuItem>
                  <MenuItem value={"light"}>Light</MenuItem>
                  <MenuItem value={"dark"}>Dark</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="bio">
              <TextField
                id="bio"
                name="bio"
                label="Bio"
                multiline
                rows={4}
                defaultValue={profile.bio}
                variant="outlined"
                sx={{ width: 1 }}
                onChange={handleChange}
              />
            </div>
            <Button
              variant="contained"
              sx={{ width: 0.5, alignSelf: "flex-end" }}
              type="submit"
            >
              Update Information
            </Button>
          </form>
        </div>
        <div className="user-card">
          <div className="user-info">
            <Typography variant="h5">Subscription Info</Typography>
            <Typography>
              Subscription Type: {subscribed ? subscription : "Free"}
            </Typography>
          </div>
        </div>
      </Box>
    </section>
  );
}

export default ProfilePage;
