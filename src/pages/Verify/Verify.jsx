import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import User from "../../services/user.service";

function Verify() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      await User.verifyUser(id);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return <div>Verify</div>;
}

export default Verify;
