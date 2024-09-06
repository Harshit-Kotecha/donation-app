import Button from '@components/atoms/Button';
import Heading from '@components/atoms/Heading';
import useAppTheme from '@hooks/useTheme';
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { get, post } from 'services/network/api-service';

const onSubmit = async () => {
  const name: string = (document.getElementById('name') as HTMLInputElement)
    .value;
  // const email: string = (document.getElementById('email') as HTMLInputElement)
  //   .value;
  const phoneNumber: string = (
    document.getElementById('phone_number') as HTMLInputElement
  ).value;
  const age: string = (document.getElementById('age') as HTMLInputElement)
    .value;
  const pinCode: string = (
    document.getElementById('pin_code') as HTMLInputElement
  ).value;
  const category: string = (
    document.getElementById('category') as HTMLInputElement
  ).value;
  const expiryTime: string = (
    document.getElementById('expiry_time') as HTMLInputElement
  ).value;
  const address: string = (
    document.getElementById('address') as HTMLInputElement
  ).value;

  const pinCodeJson = await get({
    url: `api.postalpincode.in/pincode/${pinCode}`,
  });
  console.log(pinCodeJson, 'pincode---------------');
  const pincodeData = pinCodeJson.data[0]['PostOffice'][0];

  const data = {
    name,
    age: parseInt(age),
    address,
    expiry_time_in_hours: parseInt(expiryTime),
    category,
    phone_number: parseInt(phoneNumber),
    pin_code: parseInt(pinCode),
    region: pincodeData['Region'],
    district: pincodeData['District'],
    state: pincodeData['State'],
  };

  console.log(data, '--data--------------');

  const rs = await post({ url: '/api/donations', payload: data });
  console.log(rs, 'result');
};

export default function AddDonation() {
  const theme = useAppTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col items-center w-full py-7">
        <Heading title="Fill the form to add a new donation:" />
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '30%',
            marginTop: '2rem',
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
            title="Donate"
            onClick={onSubmit}
            styles="bg-blue-700 hover:bg-blue-500"
          />
        </Box>
      </div>
    </ThemeProvider>
  );
}
