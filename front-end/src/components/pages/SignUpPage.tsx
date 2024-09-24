import AlertMsg from '@components/atoms/AlertMsg';
import SignUpHeader from '@components/atoms/SignUpHeader';
import useAppTheme from '@hooks/useTheme';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { styled, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { routes } from '@routing/routes';
import { setAccessTokenInCookie, setCookie } from '@utils/handle-tokens';
import { endpoints } from 'constants/endpoints';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from 'services/network/api-service';

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
  width: '100vw',
  height: 'auto',
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.up('sm')]: {
    height: '100%',
  },
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignUpPage() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [phoneNoError, setPhoneNoError] = React.useState(false);
  const [phoneNoErrorMessage, setPhoneNoErrorMessage] = React.useState('');
  const [alertMsg, setAlertMsg] = React.useState<string | null>(null);

  const navigate = useNavigate();

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const phone = document.getElementById('phone') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const name = document.getElementById('name') as HTMLInputElement;
    const confirmPassword = document.getElementById(
      'confirm-password'
    ) as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!phone.value || phone.value.length != 10) {
      setPhoneNoError(true);
      setPhoneNoErrorMessage('Phone number must be 10 digits long.');
      isValid = false;
    } else {
      setPhoneNoError(false);
      setPhoneNoErrorMessage('');
    }

    if (!password.value) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 8 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!confirmPassword.value || confirmPassword.value != password.value) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Both passwords should match');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
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

    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const phone = data.get('phone') as string;

    try {
      // const user = await createUserWithEmailAndPassword(auth, email, password);
      const user = await post({
        url: endpoints.register,
        payload: {
          full_name: name,
          phone_number: phone,
          email,
          password,
        },
        callback: callback,
      });
      console.log(user, '-----------user');
      if (user == null) {
        throw new Error('Bad credentials');
      }
      setAccessTokenInCookie(user['data']['access_token']);
      setCookie({
        key: 'name',
        value: name,
      });
      navigate(routes.donations, { replace: true });
    } catch (error) {
      console.error(error, '---------err');
    }
  };

  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <SignUpContainer direction="column" justifyContent="space-between">
        <SignUpHeader isSignInPage={false} />
        <Stack
          sx={{
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              {alertMsg && <AlertMsg msg={alertMsg} severity="error" />}
              <FormControl>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Raman Kumar"
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? 'error' : 'primary'}
                />
              </FormControl>
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
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="phone">Phone number</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  name="phone"
                  autoComplete="phone"
                  variant="outlined"
                  error={phoneNoError}
                  helperText={phoneNoErrorMessage}
                  color={phoneNoError ? 'error' : 'primary'}
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
              <FormControl>
                <FormLabel htmlFor="confirm-password">
                  Confirm password
                </FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={confirmPasswordError}
                  helperText={confirmPasswordErrorMessage}
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
                Sign up
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
                Already have an account?{' '}
                <span>
                  <Link
                    href={routes.signin}
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    Sign in
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
