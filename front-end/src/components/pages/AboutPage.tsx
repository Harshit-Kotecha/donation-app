import Button from '@components/atoms/Button';
import Description from '@components/atoms/Description';
import Heading from '@components/atoms/Heading';
import PageContainer from '@components/atoms/PageContainer';
import SearchAppBar from '@components/molecules/SearchAppBar';
import useAppTheme from '@hooks/useTheme';
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { appConstants } from 'constants/app-constants';
import { useState } from 'react';

export default function AboutPage() {
  const appDescription = appConstants.appDescription;
  const theme = useAppTheme();

  // State for form fields and errors
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const [messageError, setMessageError] = useState(false);
  const [messageErrorMsg, setMessageErrorMsg] = useState('');

  // Validation function
  const validateInputs = () => {
    let isValid = true;

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLInputElement)
      .value;

    // Name validation
    if (!name || name.length < 2) {
      setNameError(true);
      setNameErrorMsg(
        'Full name is required and should be at least 2 characters.'
      );
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMsg('');
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
      setEmailError(true);
      setEmailErrorMsg('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMsg('');
    }

    // Message validation
    if (!message || message.length < 10) {
      setMessageError(true);
      setMessageErrorMsg(
        'Message is required and should be at least 10 characters.'
      );
      isValid = false;
    } else {
      setMessageError(false);
      setMessageErrorMsg('');
    }

    return isValid;
  };

  const onSubmit = () => {
    if (!validateInputs()) {
      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchAppBar />
      <PageContainer>
        <Description text={appDescription} />
        <div className="flex items-center flex-col-reverse sm:flex-row">
          <div className="flex-1 mt-4 sm:mt-8 w-full sm:w-6/12">
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Raman"
                  error={nameError}
                  helperText={nameErrorMsg}
                  color={nameError ? 'error' : 'primary'}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Your email id:</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="email"
                  placeholder="yours@email.com"
                  type="email"
                  id="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMsg}
                  color={emailError ? 'error' : 'primary'}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="message">Your message:</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="message"
                  placeholder="I liked your product..."
                  rows={5}
                  multiline={true}
                  type="text"
                  id="message"
                  autoComplete="message"
                  variant="outlined"
                  error={messageError}
                  helperText={messageErrorMsg}
                  color={messageError ? 'error' : 'primary'}
                />
              </FormControl>
              <Box sx={{ mb: 1 }} />
              <Button
                title="Send Message"
                onClick={onSubmit}
                styles="bg-cyan-600 hover:bg-cyan-500"
              />
            </Box>
          </div>
          <div className="flex-1">
            <Heading
              title="Contact Us:"
              className="underline underline-offset-1 w-6/12 text-cyan-500"
            />
            <Description text={appConstants.contactUs} className="mt-5" />
          </div>
        </div>{' '}
      </PageContainer>
    </ThemeProvider>
  );
}
