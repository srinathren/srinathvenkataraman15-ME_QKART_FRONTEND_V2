import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory } from 'react-router-dom'

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  // const [username, setUsername] = useState("");
  // const [pswd, setpswd] = useState("");
  // const [cnfpassword, setCnfpassword] = useState("");
  const [formData, setFormdata] = useState({
    username: "",
    password: "",
    cnfpswd: "",
  });
  const [show, setShow] = useState(false);

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    // console.log(formData);
    if (validateInput(formData)) {
      try {
        setShow(true);
        let resp = await axios.post(config.endpoint + "/auth/register", {
          username: formData.username,
          password: formData.password,
        });
        // console.log(resp);
        // setShow(false);
        if (resp.status === 201) {
          enqueueSnackbar("Registered successfully", { variant: "success" });
          setShow(false);
          history.push("/login");
        }
        return resp;
      } catch (err) {
        // console.log(err);
        setShow(false);
        if (
          err.response &&
          err.response.data &&
          err.response.status >= 400 &&
          err.response.status < 500
        )
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        else {
          enqueueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON."
          );
        }
        return null;
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    const { username, password, cnfpswd } = data;
    // console.log(username, password, cnfpswd);
    if (username === "") {
      enqueueSnackbar("Username is required", {
        variant: "warning",
      });
      return false;
    }
    if (password === "") {
      enqueueSnackbar("Password is required", {
        variant: "warning",
      });
      return false;
    }
    if (username.length < 6) {
      enqueueSnackbar("Username should be > 6", {
        variant: "warning",
      });
      return false;
    }
    if (password.length < 6) {
      enqueueSnackbar("Password should be > 6", {
        variant: "warning",
      });
      return false;
    }
    if (password !== cnfpswd) {
      enqueueSnackbar("Password and Confirm Password do not match", {
        variant: "warning",
      });
      return false;
    }
    return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={(e) =>
              setFormdata({ ...formData, username: e.target.value })
            }
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={formData.password}
            onChange={(e) =>
              setFormdata({ ...formData, password: e.target.value })
            }
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={formData.cnfpassword}
            onChange={(e) =>
              setFormdata({ ...formData, cnfpswd: e.target.value })
            }
          />
          {show ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Button
              onClick={() => register(formData)}
              className="button"
              variant="contained"
            >
              Register Now
            </Button>
          )}
          <p className="secondary-action">
            Already have an account?{" "}
            <a className="link" href="/login">
              Login here
            </a>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
