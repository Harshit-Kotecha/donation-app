import Heading from '@components/atoms/Heading';
import useAppTheme from '@hooks/useTheme';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  ThemeProvider,
} from '@mui/material';

export default function AddDonation() {
  const theme = useAppTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col items-center w-full">
        <Heading title="Fill the form to add a new donation:" />
        <Box
          component="form"
          //   onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '30%',
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
              // error={nameError}
              // helperText={nameErrorMessage}
              // color={nameError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              variant="outlined"
              // error={emailError}
              // helperText={emailErrorMessage}
              // color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone_number">Phone number</FormLabel>
            <TextField
              required
              fullWidth
              name="phone_number"
              placeholder=""
              type="number"
              id="phone_number"
              autoComplete="phone_number"
              variant="outlined"
              // error={passwordError}
              // helperText={passwordErrorMessage}
              // color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="age">Age</FormLabel>
            <TextField
              required
              fullWidth
              name="age"
              placeholder=""
              type="number"
              id="age"
              autoComplete="age"
              variant="outlined"
              // error={passwordError}
              // helperText={passwordErrorMessage}
              // color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="category">Category</FormLabel>
            <TextField
              required
              fullWidth
              name="category"
              placeholder=""
              type="text"
              id="category"
              autoComplete="category"
              variant="outlined"
              // error={passwordError}
              // helperText={passwordErrorMessage}
              // color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="expiry_time">Expiry Time (in hours)</FormLabel>
            <TextField
              required
              fullWidth
              name="expiry_time"
              placeholder=""
              type="number"
              id="expiry_time"
              autoComplete="expiry_time"
              variant="outlined"
              // error={passwordError}
              // helperText={passwordErrorMessage}
              // color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="pin_code">Pin Code</FormLabel>
            <TextField
              required
              fullWidth
              name="pin_code"
              placeholder=""
              type="number"
              id="pin_code"
              autoComplete="pin_code"
              variant="outlined"
              // error={passwordError}
              // helperText={passwordErrorMessage}
              // color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <TextField
              required
              fullWidth
              name="address"
              placeholder=""
              type="text"
              rows={3}
              id="address"
              multiline={true}
              autoComplete="address"
              variant="outlined"
              // error={passwordError}
              // helperText={passwordErrorMessage}
              // color={passwordError ? 'error' : 'primary'}
            />
          </FormControl>
          <Box sx={{ mb: 1 }} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            //   onClick={validateInputs}
          >
            DONATE
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  );
}
