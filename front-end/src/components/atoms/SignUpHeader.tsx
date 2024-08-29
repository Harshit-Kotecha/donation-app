import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { routes } from "@routing/routes";
import { appConstants } from "constants/app-constants";
import { useNavigate } from "react-router-dom";

export default function SignUpHeader({ isSignInPage }) {
  const appName = appConstants.appName;
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {appName}
          </Typography>
          <Button
            color="inherit"
            onClick={() =>
              navigate(isSignInPage ? routes.signup : routes.signin)
            }
          >
            {isSignInPage ? "Sign Up" : "Sign In"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
