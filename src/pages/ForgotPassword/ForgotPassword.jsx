// 1. Create a form component with email input field and submit button
// 2. On form submit, prevent default behavior
// 3. Send a POST request to the server with the email input value
// 4. If the email is valid, display a success message
// 5. If the email is invalid, display an error message

import React, { useState } from "react";
import User from "../../services/user.service";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await User.generatePasswordReset(email);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
