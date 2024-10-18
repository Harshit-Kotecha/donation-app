import charityAnimation from '@assets/charity.json';
import AlertMsg from '@components/atoms/AlertMsg';
import Button from '@components/atoms/Button';
import DonationQuote from '@components/atoms/DonationQuote';
import PageContainer from '@components/atoms/PageContainer';
import MyDateTimePicker from '@components/molecules/MyDateTimePicker';
import { Pincode } from '@interfaces/pincode';
import {
  Box,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { routes } from '@routing/routes';
import { convertToISOFormat } from '@utils/utils';
import { endpoints } from 'constants/endpoints';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get, post } from 'services/network/api-service';
import { getCategories } from 'services/network/donation-api-services';
import MainScreen from './MainScreen';

export default function AddDonation() {
  // Name field validation states
  const [nameError, setNameError] = useState<boolean>(false);
  const [nameErrorMsg, setNameErrorMsg] = useState<string>('');

  // Email field validation states
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');

  // Description field validation states
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState<string>('');

  // Age field validation states
  const [ageError, setAgeError] = useState<boolean>(false);
  const [ageErrorMsg, setAgeErrorMsg] = useState<string>('');

  // Address field validation states
  const [addressError, setAddressError] = useState<boolean>(false);
  const [addressErrorMsg, setAddressErrorMsg] = useState<string>('');

  // Expiry Time field validation states
  // const [expiryTimeError, setExpiryTimeError] = useState<boolean>(false);
  // const [expiryTimeErrorMsg, setExpiryTimeErrorMsg] = useState<string>('');
  const [expiryTime, setExpiryTime] = useState<string | null>(null);

  // Category field validation states
  const [categoryError, setCategoryError] = useState<boolean>(false);
  const [categoryErrorMsg, setCategoryErrorMsg] = useState<string>('');

  // Phone Number field validation states
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [phoneNumberErrorMsg, setPhoneNumberErrorMsg] = useState<string>('');

  // Pin Code field validation states
  const [pinCodeError, setPinCodeError] = useState<boolean>(false);
  const [pinCodeErrorMsg, setPinCodeErrorMsg] = useState<string>('');

  // Pin Code data
  const [pincodeData, setPincodeData] = useState<Pincode | null>(null);

  // Alert status
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

  const navigate = useNavigate();

  const validateInputs = ({
    name,
    age,
    email,
    address,
    description,
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

    // Validate email
    if (
      !email ||
      email.trim().length < 1 ||
      !email.includes('@') ||
      !email.includes('.')
    ) {
      setEmailError(true);
      setEmailErrorMsg('Valid email address is required.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMsg('');
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

    // Validate description (should not be empty)
    if (!description || description.trim().length < 1) {
      setDescriptionError(true);
      setDescriptionErrorMsg('Description is required.');
      isValid = false;
    } else {
      setDescriptionError(false);
      setDescriptionErrorMsg('');
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
    const email: string = (
      document.getElementById('email_id') as HTMLInputElement
    ).value;
    const phoneNumber: string = (
      document.getElementById('phone_number') as HTMLInputElement
    ).value;
    const age: string = (document.getElementById('age') as HTMLInputElement)
      .value;
    const pinCode: string = (
      document.getElementById('pin_code') as HTMLInputElement
    ).value;
    const category: string = isAddingNewCategory
      ? (
          document.getElementById('category') as HTMLInputElement
        )?.value?.toLowerCase()
      : selectedCategory;
    // const expiryTime: string = (
    //   document.getElementById('expiry_time') as HTMLInputElement
    // ).value;
    const address: string = (
      document.getElementById('address') as HTMLInputElement
    ).value;
    const description: string = (
      document.getElementById('description') as HTMLInputElement
    ).value;

    try {
      const data = {
        name,
        age: parseInt(age),
        address,
        email,
        description,
        expires_at: expiryTime,
        category,
        phone_number: parseInt(phoneNumber),
        pin_code: parseInt(pinCode),
        postal_name: pincodeData?.postalName,
        region: pincodeData?.region,
        district: pincodeData?.district,
        state: pincodeData?.state,
      };

      console.log(data, 'data ------------ ');

      if (!validateInputs(data)) {
        return;
      }

      if (!pincodeData) {
        throw Error('Invalid pin code');
      }

      const response = await post({ url: endpoints.donations, payload: data });
      // alert(response['message']);
      if (response['success']) {
        window.scrollTo(0, 0);
        setAlertMsg(response['message']);
        setTimeout(() => {
          setAlertMsg(null);
          navigate(routes.donations);
        }, 2000);
      } else {
        throw new Error(response['message']);
      }
    } catch (error) {
      console.error(error);
      alert('Invalid PinCode');
    }
  };

  const getPinCodeData = async (pinCode: number): Promise<Pincode> => {
    try {
      const pinCodeJson = await get({
        url: `${endpoints.pinCode}/${pinCode}`,
        authRequired: false,
      });
      if (!pinCodeJson || !pinCodeJson[0]['PostOffice']) {
        throw new Error('No records found');
      }
      const pincodeData = pinCodeJson[0]['PostOffice'][0];
      const result: Pincode = {
        postalName: pincodeData['Name'],
        region: pincodeData['Region'],
        district: pincodeData['District'],
        state: pincodeData['State'],
      };
      return result;
    } catch (error) {
      console.error(error, '--------pincode');
      alert('Invalid Pin Code');
      return null;
    }
  };

  const onPinCodeChange = async (e: object) => {
    const pincode: string = e['target']['value'].trim();
    if (pincode.length === 6) {
      try {
        const parsedCode = parseInt(pincode);
        const data = await getPinCodeData(parsedCode);
        setPincodeData(data);
      } catch (error) {
        console.error(error, 'pincode change..........');
        alert('Pincode must be an integer');
      }
    } else if (pincodeData) {
      setPincodeData(null);
    }
  };

  const onAcceptDateTime = (e) => {
    const time = convertToISOFormat(e['$d']);
    setExpiryTime(time);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setCategories(await getCategories());
      setIsLoading(false);
    };
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <MainScreen isLoading={isLoading}>
      <PageContainer>
        <div className="flex flex-col items-center bg-background-dark">
          <DonationQuote
            title="Your kindness can make a real difference"
            subtitle="Consider making a donation today!"
          />
          {alertMsg ? <AlertMsg msg={alertMsg} /> : <></>}
          <Lottie
            className={`max-w-[200px] py-0 mx-auto mb-[-30px] mt-[-10px]`}
            animationData={charityAnimation}
            loop={true}
          />
          <Box
            className="w-full max-w-[700px]"
            component="form"
            onSubmit={onSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              // width: '30%',
              // minWidth: '350px',
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
              <FormLabel htmlFor="email_id">Email address</FormLabel>
              <TextField
                required
                fullWidth
                name="email_id"
                placeholder=""
                type="email"
                id="email_id"
                autoComplete="email_id"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMsg}
                color={emailError ? 'error' : 'primary'}
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
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                required
                fullWidth
                name="description"
                placeholder="I have..."
                type="text"
                id="description"
                autoComplete="description"
                multiline={true}
                rows={3}
                variant="outlined"
                error={descriptionError}
                helperText={descriptionErrorMsg}
                color={descriptionError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="category-dropdown">Category</InputLabel>
              <Select
                id="category-select"
                value={selectedCategory}
                label="Category"
                error={categoryError}
                color={categoryError ? 'error' : 'primary'}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'add-new') {
                    setIsAddingNewCategory(true);
                  } else {
                    setIsAddingNewCategory(false);
                  }
                  setSelectedCategory(value);
                }}
              >
                {categories?.map((e, i) => (
                  <MenuItem key={i} value={e}>
                    {e}
                  </MenuItem>
                ))}
                <MenuItem value="add-new">+ Add new category</MenuItem>
              </Select>
            </FormControl>
            {isAddingNewCategory && (
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
            )}
            <MyDateTimePicker
              label="Choose expiry time, if there's any"
              onAccept={onAcceptDateTime}
            />
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
                onChange={onPinCodeChange}
                error={pinCodeError}
                helperText={pinCodeErrorMsg}
                color={pinCodeError ? 'error' : 'primary'}
              />
            </FormControl>
            {pincodeData ? (
              <FormControl>
                <FormLabel htmlFor="pin_code_data">Location</FormLabel>
                <TextField
                  fullWidth
                  name="pin_code_data"
                  placeholder=""
                  type="text"
                  id="pin_code_data"
                  autoComplete="pin_code_data"
                  variant="outlined"
                  focused={true}
                  value={`${pincodeData.postalName}, ${pincodeData.region}, ${pincodeData.district}, ${pincodeData.state}`}
                  error={pinCodeError}
                  helperText={pinCodeErrorMsg}
                  color="warning"
                  inputMode="none"
                />
              </FormControl>
            ) : (
              <></>
            )}
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
              className="bg-blue-700 hover:bg-blue-500"
            />
          </Box>
        </div>
      </PageContainer>
    </MainScreen>
  );
}
