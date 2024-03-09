import { Alert, Typography } from "@mui/material";
import React from "react";

function FormError({ error }) {
  return (
    <Alert severity="error" sx={{ position: "absolute", top: "105%" }}>
      {error.message}
    </Alert>
  );
}

export default FormError;
