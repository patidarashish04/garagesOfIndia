import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import { Notifications } from "@mui/icons-material";

const Header = () => {
  return (
    <AppBar position="fixed" style={{ marginLeft: "240px", backgroundColor: "#fff", color: "#333" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
        <Avatar alt="Admin" src="/static/images/avatar/1.jpg" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
