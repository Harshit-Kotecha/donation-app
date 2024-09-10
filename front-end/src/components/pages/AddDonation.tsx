import Button from '@components/atoms/Button';
import Heading from '@components/atoms/Heading';
import SearchAppBar from '@components/molecules/SearchAppBar';
import useAppTheme from '@hooks/useTheme';
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { routes } from '@routing/routes';
import { endpoints } from 'constants/endpoints';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, post } from 'services/network/api-service';

export default function AddDonation() {
  const theme = useAppTheme();
  // Name field validation states
  const [nameError, setNameError] = useState<boolean>(false);
  const [nameErrorMsg, setNameErrorMsg] = useState<string>('');

  // Age field validation states
  const [ageError, setAgeError] = useState<boolean>(false);
  const [ageErrorMsg, setAgeErrorMsg] = useState<string>('');

  // Address field validation states
  const [addressError, setAddressError] = useState<boolean>(false);
  const [addressErrorMsg, setAddressErrorMsg] = useState<string>('');

  // Expiry Time field validation states
  const [expiryTimeError, setExpiryTimeError] = useState<boolean>(false);
  const [expiryTimeErrorMsg, setExpiryTimeErrorMsg] = useState<string>('');

  // Category field validation states
  const [categoryError, setCategoryError] = useState<boolean>(false);
  const [categoryErrorMsg, setCategoryErrorMsg] = useState<string>('');

  // Phone Number field validation states
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState<string>('');

  // Pin Code field validation states
  const [pinCodeError, setPinCodeError] = useState<boolean>(false);
  const [pinCodeErrorMsg, setPinCodeErrorMsg] = useState<string>('');

  const navigate = useNavigate();

  const validateInputs = ({
    name,
    age,
    address,
    expiry_time_in_hours,
    category,
    phone_number,
    pin_code,
  }): boolean => {
    let isValid = true;

    // Validate name
    if (!name || name.trim().length < 1) {
      setNameError(true);
      setNameErrorMsg('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMsg('');
    }

    // Validate age (must be >= 18)
    if (!age || age < 18) {
      setAgeError(true);
      setAgeErrorMsg('Age must be at least 18.');
      isValid = false;
    } else {
      setAgeError(false);
      setAgeErrorMsg('');
    }

    // Validate address (should not be empty)
    if (!address || address.trim().length < 1) {
      setAddressError(true);
      setAddressErrorMsg('Address is required.');
      isValid = false;
    } else {
      setAddressError(false);
      setAddressErrorMsg('');
    }

    // Validate expiry time (should not be empty or NaN)
    if (!expiry_time_in_hours || isNaN(expiry_time_in_hours)) {
      setExpiryTimeError(true);
      setExpiryTimeErrorMsg('Expiry time must be a valid number.');
      isValid = false;
    } else {
      setExpiryTimeError(false);
      setExpiryTimeErrorMsg('');
    }

    // Validate category (should not be empty)
    if (!category || category.trim().length < 1) {
      setCategoryError(true);
      setCategoryErrorMsg('Category is required.');
      isValid = false;
    } else {
      setCategoryError(false);
      setCategoryErrorMsg('');
    }

    // Validate phone number (must be 10 digits)
    if (!phone_number || phone_number.toString().length !== 10) {
      setPhoneNumberError(true);
      setPhoneNumberErrorMsg('Phone number must be exactly 10 digits long.');
      isValid = false;
    } else {
      setPhoneNumberError(false);
      setPhoneNumberErrorMsg('');
    }

    // Validate pin code (must be 6 digits)
    if (!pin_code || pin_code.toString().length !== 6) {
      setPinCodeError(true);
      setPinCodeErrorMsg('Pin code must be exactly 6 digits long.');
      isValid = false;
    } else {
      setPinCodeError(false);
      setPinCodeErrorMsg('');
    }

    return isValid;
  };

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
    ).value.toLowerCase();
    const expiryTime: string = (
      document.getElementById('expiry_time') as HTMLInputElement
    ).value;
    const address: string = (
      document.getElementById('address') as HTMLInputElement
    ).value;

    const data = {
      name,
      age: parseInt(age),
      address,
      expiry_time_in_hours: parseInt(expiryTime),
      category,
      phone_number: parseInt(phoneNumber),
      pin_code: parseInt(pinCode),
    };

    if (!validateInputs(data)) {
      return;
    }

    try {
      const pincodeData = await getPinCodeData(parseInt(pinCode));
      if (!pincodeData) {
        throw Error('Invalid pin code');
      }
      data['region'] = pincodeData['Region'];
      data['district'] = pincodeData['District'];
      data['state'] = pincodeData['State'];

      const response = await post({ url: endpoints.donations, payload: data });
      console.log(response, 'result');
      alert(response['message']);
      navigate(routes.donations);
    } catch (error) {
      console.error(error['message']);
      // alert('Invalid PinCode');
    }
  };

  const getPinCodeData = async (pinCode: number) => {
    try {
      const pinCodeJson = await get({
        url: `${endpoints.pinCode}/${pinCode}`,
      });
      console.log(pinCodeJson, 'pincode---------------');
      const pincodeData = pinCodeJson[0]['PostOffice'][0];
      return pincodeData;
    } catch (error) {
      console.error(error, '--------pincode');
      alert('Invalid Pin Code');
      return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchAppBar />
      <div className="flex flex-col items-center w-full py-7 bg-background-dark">
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
              error={nameError}
              helperText={nameErrorMsg}
              color={nameError ? 'error' : 'primary'}
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
              error={ageError}
              helperText={ageErrorMsg}
              color={ageError ? 'error' : 'primary'}
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
              error={phoneNumberError}
              helperText={phoneNumberErrorMsg}
              color={phoneNumberError ? 'error' : 'primary'}
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
              error={categoryError}
              helperText={categoryErrorMsg}
              color={categoryError ? 'error' : 'primary'}
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
              error={expiryTimeError}
              helperText={expiryTimeErrorMsg}
              color={expiryTimeError ? 'error' : 'primary'}
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
              error={pinCodeError}
              helperText={pinCodeErrorMsg}
              color={pinCodeError ? 'error' : 'primary'}
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
              error={addressError}
              helperText={addressErrorMsg}
              color={addressError ? 'error' : 'primary'}
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
