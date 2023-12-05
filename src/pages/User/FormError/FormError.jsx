import { Alert, Typography } from "@mui/material";
import React from "react";

function FormError({ error }) {
  return <Alert severity="error">{error.message}</Alert>;
}

export default FormError;
