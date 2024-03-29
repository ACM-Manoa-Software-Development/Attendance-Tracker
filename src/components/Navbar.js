import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";
import { Alert } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";

const pages = ["edit-profile"];
const settings = ["edit-profile"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <AppBar position="static" style={{ marginBottom: "0px" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {
                <a href={"https://acmmanoa.org/"}>
                    <img src="img/acm_Logo_New.png" alt="ACM" style={{ maxWidth: "80px", maxHeight: "60px", marginRight: "10px" }}/>
                </a>
            }
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ACM Manoa
            </Typography>

            {currentUser && (
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link
                          to={`/${page}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {page}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem key="logout" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Button
                        onClick={handleLogout}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Log out
                      </Button>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ACM Manoa Attendance Tracker
            </Typography>
            {currentUser && (
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              </Box>
            )}

            {currentUser && (
              <Box sx={{ flexGrow: 0 }}>
                {/*Profile dropdown menu*/}
                <Tooltip title="Open settings">
                    {/*Styling for profile button*/}
                    <IconButton
                        onClick={handleOpenUserMenu}
                        style={{ textDecoration: "none", color: "white" }}
                        sx={{
                          position: 'relative',
                          /* Dropdown arrow */
                          '&::after': {
                              content: '""',
                              position: 'absolute',
                              top: '55%',
                              right: '4px',
                              transform: 'translateY(-50%) rotate(180deg)',
                              width: '0px', //6
                              height: '0px',
                              borderLeft: '5px solid transparent', // 1 2 1
                              borderRight: '5px solid transparent',
                              borderBottom: '6px solid',
                        }
                      }}
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <PersonIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                    <Typography textAlign="right" sx={{ p: '8px 20px', minWidth: "150px", maxWidth: "250px", fontWeight: 'bold'}}>
                        {currentUser.email}
                    </Typography>
                    <Divider />
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="right" sx={{ width: '100%' }}>
                        <Link
                          to={`/${setting}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Edit Profile
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                    <MenuItem onClick={handleLogout}>
                        <Typography textAlign="right" sx={{ width: '100%', color: 'gray'}}>
                            Log Out
                        </Typography>
                    </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {error && (
        <Alert variant="danger" style={{ marginBottom: "35px" }}>
          {error}
        </Alert>
      )}
    </div>
  );
}
export default Navbar;

