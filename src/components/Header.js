import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  let username = localStorage.getItem("username");
  // console.log(username)
  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children}
      {!hasHiddenAuthButtons ? (
        <>
          <Stack direction="row" spacing={1} alignItems="center">
            {username ? (
              <>
                <Avatar src="avatar.png" alt={username} />
                <p>{username}</p>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button onClick={() => history.push("/login")}>Login</Button>
                <Button
                  variant="contained"
                  onClick={() => history.push("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </Stack>
        </>
      ) : (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
          Back to explore
        </Button>
      )}
    </Box>
  );
};

export default Header;
