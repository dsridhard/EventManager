import { useState } from "react";
import { Avatar, Typography, Button, Box, Menu, MenuItem, IconButton, Divider } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function UserProfileDropdown({ userData, handleLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // For userData as string or object:
  const displayName =
    typeof userData === "string"
      ? userData
      : userData?.name || userData?.email || "User";
  const avatarLetter = displayName?.charAt(0).toUpperCase() || "U";

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton
        onClick={handleClick}
        color="inherit"
        size="small"
        sx={{ p: 0 }}
      >
        <Avatar sx={{ width: 32, height: 32 }}>{avatarLetter}</Avatar>
        <Typography variant="body1" color="inherit" sx={{ ml: 1 }}>
          {displayName}
        </Typography>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem disabled>
          <Typography variant="subtitle2">{displayName}</Typography>
        </MenuItem>
        <Divider />
        {/* Add more profile options here if needed */}
        <MenuItem onClick={handleLogout}>
          <Typography color="error">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}