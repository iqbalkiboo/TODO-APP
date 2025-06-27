import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  IconButton,
  Alert,
  InputBase,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import AssetsLogin from "../assets/img/VDN-Login Page.png";
import AssetsDecoration from "../assets/img/Group186.png";
import { mockLogin, mockGoogleLogin } from "../api/MockApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    setError("");
    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    try {
      await mockLogin(email, password);
      login({ email });
      navigate("/todo", { replace: true });
    } catch (err: any) {
      setError(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await mockGoogleLogin(email);
      login({ email });
      navigate("/todo", { replace: true });
    } catch {
      setError("Login Google gagal.");
    }
  };

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f6fc" }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9f9fc",
          p: 4,
        }}
      >
        <Box
          component="img"
          src={AssetsLogin}
          alt="Login Illustration"
          sx={{ maxWidth: "80%", height: "auto" }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={AssetsDecoration}
          alt="Decoration Top"
          sx={{
            position: "absolute",
            top: 0,
            right: 100,
            width: "200px",
            height: "auto",
            zIndex: 1,
          }}
        />
        <Box sx={{ width: "100%", maxWidth: 400, zIndex: 2 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
            sx={{ textAlign: "left", color: "#4F4F4F", fontSize: "32px" }}
          >
            Welcome Back
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ my: 1 }}>
            <Typography fontWeight={500} fontSize={16} mb={1} textAlign="left">
              Email <span style={{ color: "red" }}>*</span>
            </Typography>
            <InputBase
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{
                border: `1px solid ${error && email ? "#ff4444" : "#d3dbe4"}`,
                borderRadius: "8px",
                px: "16px",
                py: "12px",
                fontSize: 16,
                color: "#333",
                backgroundColor: "#fff",
                "&::placeholder": { color: "#cbd1dc" },
                "&:focus": { outline: "none", borderColor: "#0b4a99" },
              }}
            />
          </Box>
          {error && email && (
            <Typography fontSize={12} color="#ff4444" mt={1} textAlign="left">
              Invalid email format
            </Typography>
          )}

          <Box sx={{ mb: 6 }}>
            <Typography fontWeight={500} fontSize={16} mb={1} textAlign="left">
              Password <span style={{ color: "red" }}>*</span>
            </Typography>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                border: `1px solid ${
                  error && password ? "#ff4444" : "#d3dbe4"
                }`,
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
            >
              <InputBase
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{
                  px: "16px",
                  py: "12px",
                  fontSize: 16,
                  color: "#333",
                  "&::placeholder": { color: "#cbd1dc" },
                }}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{ position: "absolute", right: 8 }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
            {error && password && (
              <Typography fontSize={12} color="#ff4444" mt={1} textAlign="left">
                Password is incorrect
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{ mb: 2, bgcolor: "#0b4a99", borderRadius: "8px" }}
          >
            Sign In
          </Button>

          <Divider sx={{ mb: 2 }}>Or</Divider>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{
              textTransform: "none",
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          >
            Sign in with Google
          </Button>
        </Box>
        <Box
          component="img"
          src={AssetsDecoration}
          alt="Decoration Bottom"
          sx={{
            position: "absolute",
            bottom: -50,
            left: -50,
            width: "200px",
            height: "auto",
            zIndex: 1,
            transform: "rotate(180deg)",
          }}
        />
      </Box>
    </Box>
  );
}
