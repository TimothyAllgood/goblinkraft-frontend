import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../../services/profile.service";

function ProfilePage() {
  const id = useSelector((state) => state.user.id);
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

  const isCurrentUserProfile = profile && id === profile.id;

  return <div>{isCurrentUserProfile}</div>;
}

export default ProfilePage;
