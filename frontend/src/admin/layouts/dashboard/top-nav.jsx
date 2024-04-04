import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Stack, Button } from "@mui/material";
import logo from "../../../assets/Images/QuizLogo.png";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../components/NotificationContext";

const TOP_NAV_HEIGHT = 64;

export const TopNav = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleLogout = () => {
    localStorage.clear();
    showNotification("Logout successful!"); // Trigger the global notification
    navigate("/"); // Redirect to homepage immediately after setting the notification
  };

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "neutral.900",
        color: "common.white",
        position: "fixed",
        width: "100%",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          minHeight: TOP_NAV_HEIGHT,
          px: 3,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={3}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "inline-flex",
              height: 24,
              width: 24,
            }}
          >
            <img
              src={logo}
              style={{ width: "50px", height: "35px" }}
              alt="logo"
            />
          </Box>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <h2>{username && <Box sx={{ mr: 2 }}>{username}</Box>}</h2>
          <Button onClick={handleLogout} sx={{ ml: 2 }}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
