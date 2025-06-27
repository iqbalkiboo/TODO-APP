import React, { useState, useCallback, ReactNode } from "react";
import {
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InputBase,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 200,
          height: "100vh",
          background: "linear-gradient(to bottom, #ffffff, #e0ecff)",
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={4}>
          <span style={{ color: "blue" }}>Todo</span>{" "}
          <span style={{ color: "red" }}>Apps</span>
        </Typography>

        <List>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton selected>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Todo" />
          </ListItemButton>
        </List>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Bar */}
        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {/* Search */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              background: "#f3f3f3",
              borderRadius: 2,
              px: 2,
            }}
          >
            <SearchIcon color="action" />
            <InputBase placeholder="Search" sx={{ width: 300 }} />
          </Box>

          {/* Profile Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CalendarTodayIcon />
            <Box
              onClick={handleMenuOpen}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <Typography fontSize={14}>
                  {user?.email || "Guest"} {/* 👈 tampilkan nama login */}
                </Typography>
                <Typography fontSize={12} color="gray">
                  {user?.provider === "google" ? "Google User" : "Admin"}{" "}
                  {/* opsional */}
                </Typography>
              </Box>
              <Avatar alt="user" src="https://i.pravatar.cc/40" />
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                Log Out
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Routed Page Content */}
        <Box sx={{ flex: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
