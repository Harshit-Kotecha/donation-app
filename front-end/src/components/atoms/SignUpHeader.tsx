import LogoBanner from '@components/molecules/LogoBanner';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
export default function SignUpHeader() {
  // const appName = appConstants.appName;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: 'background.default',
          color: 'text.primary',
          textAlign: 'center',
        }}
      >
        <Toolbar className="justify-center">
          {/* <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold', fontStyle: 'italic' }}
          >
            {appName}
          </Typography> */}
          <LogoBanner />
          {/* <div className="border border-white rounded-lg">
            <Button
              color="inherit"
              onClick={() =>
                navigate(isSignInPage ? routes.signup : routes.signin)
              }
            >
              {isSignInPage ? 'SIGN UP' : 'SIGN IN'}
            </Button>
          </div> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
