import DonationCard from '@components/atoms/DonationCard';
import PrimarySearchAppBar from '@components/molecules/SearchAppBar';
import { ThemeProvider } from '@emotion/react';
import useDonations from '@hooks/useDonations';
import useAppTheme from '@hooks/useTheme';
import { Donation } from '@interfaces/donation';
import { Box, Button, CircularProgress } from '@mui/material';

const Donations = (donationsMap: Map<string, Array<Donation>>) => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      backgroundImage: 'backgroundImage.default',
    }}
  >
    {[...donationsMap.entries()]?.map(([key, value]) => (
      <div>
        <Button
          sx={{
            backgroundColor: 'background.default',
            color: 'text.primary',
            mx: 3,
            mt: 3,
          }}
          variant="contained"
          disabled
        >
          {key}
        </Button>
        <div className="">
          {value?.map((el, index: number) => (
            <DonationCard key={index} donation={el} />
          ))}
        </div>
      </div>
    ))}

    {/* <Grid2
          container
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ px: 3, my: 5 }}
        >
          {donations?.map((el, index: number) => (
            <DonationCard key={index} donation={el} />
          ))}
        </Grid2> */}
  </Box>
);

export default function HomePage() {
  const theme = useAppTheme();
  const { isLoading, donations } = useDonations();

  const donationsMap: Map<string, Array<Donation>> = new Map();
  donations?.forEach((el) => {
    const donationList = donationsMap.get(el.category) || [];
    donationList.push(el);
    donationsMap.set(el.category, donationList);
  });
  console.log(donationsMap);

  return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar />
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            // height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        Donations(donationsMap)
      )}
    </ThemeProvider>
  );
}
