import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { routes } from '@routing/routes';
import { appConstants } from 'constants/app-constants';
import { useNavigate } from 'react-router-dom';

export default function SignUpHeader({ isSignInPage }) {
  const appName = appConstants.appName;
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: 'background.default',
          color: 'text.primary',
          textAlign: 'center',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold', fontStyle: 'italic' }}
          >
            {appName}
          </Typography>
          <Button
            color="inherit"
            onClick={() =>
              navigate(isSignInPage ? routes.signup : routes.signin)
            }
          >
            {isSignInPage ? 'Sign Up' : 'Sign In'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
