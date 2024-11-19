import AlertMsg from '@components/atoms/AlertMsg';
import SignUpHeader from '@components/atoms/SignUpHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import {
  createTheme,
  PaletteMode,
  styled,
  ThemeProvider,
} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { routes } from '@routing/routes';
import { setAccessTokenInCookie } from '@utils/handle-tokens';
import { endpoints } from 'constants/endpoints';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from 'services/network/api-service';
import getSignUpTheme from 'themes/getSignUpTheme';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.up('sm')]: {
    height: '100dvh',
  },
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignInPage() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [alertMsg, setAlertMsg] = React.useState<null | string>(null);

  const navigate = useNavigate();

  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value) {
      setPasswordError(true);
      setPasswordErrorMessage('Password is mandatory.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const callback = (data: string) => {
    setAlertMsg(data);
    setTimeout(() => {
      setAlertMsg(null);
    }, 3000);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs() == false) {
      return;
    }
    const data = new FormData(event.currentTarget);

    const email = data.get('email') as string;
    const password = data.get('password') as string;

    try {
      // const user = await signInWithEmailAndPassword(auth, email, password);
      const user = await post({
        url: endpoints.login,
        payload: { email, password },
        callback: callback,
        authRequired: false,
      });

      if (user == null) {
        throw new Error('Bad credentials');
      }
      console.log(user, '------------user');
      setAccessTokenInCookie(user['data']['access_token']);
      console.log(user);
      navigate(routes.donations, { replace: true });
    } catch (error) {
      console.error(error, '-------err');
    }
  };

  return (
    <ThemeProvider theme={SignUpTheme || defaultTheme}>
      <CssBaseline />
      <SignUpContainer
        className="h-full px-4 "
        direction="column"
        justifyContent="space-between"
      >
        <SignUpHeader />
        <Stack
          sx={{
            justifyContent: 'center',
            height: '100dvh',
            p: 2,
          }}
        >
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              // sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              {alertMsg && <AlertMsg msg={alertMsg} severity="error" />}
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={emailError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
              <Box sx={{ mb: 1 }} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Sign In
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
                Don't have an account?
                <span>
                  <Link
                    href={routes.signup}
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    {' '}
                    Sign Up
                  </Link>
                </span>
              </Typography>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>
    </ThemeProvider>
  );
}
