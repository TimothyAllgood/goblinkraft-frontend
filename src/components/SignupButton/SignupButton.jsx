import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button/Button";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            screen_hint: "signup",
          },
        })
      }
      variant="outlined"
    >
      Sign Up
    </Button>
  );
};

export default SignupButton;
