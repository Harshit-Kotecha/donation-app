import DonationCard from '@components/atoms/DonationCard';
import PrimarySearchAppBar from '@components/molecules/SearchAppBar';
import { ThemeProvider } from '@emotion/react';
import useDonations from '@hooks/useDonations';
import useAppTheme from '@hooks/useTheme';
import { Donation } from '@interfaces/donation';
import { Box, CircularProgress } from '@mui/material';
import '@styles/style.css';

const Donations = (donationsMap: Map<string, Array<Donation>>) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        backgroundImage: 'backgroundImage.default',
      }}
    >
      {[...donationsMap.entries()]?.map(([key, value], idx) => (
        <div key={idx} className="px-16">
          <p className="text-3xl text-slate-500 mb-4 pt-11 ml-6">
            {key.toUpperCase()}
          </p>
          <div className="flex overflow-x-auto scroll-container">
            {value?.map((el, index: number) => (
              <DonationCard key={index} donation={el} />
            ))}
          </div>
          {/* {
            <Grid2
              container
              alignItems="center"
              justifyContent="center"
              spacing={{ xs: 0, md: 0 }}
              // columns={{ xs: 4, sm: 8, md: 12 }}
              // sx={{ px: 3, my: 5 }}
            >
              {value?.map((el, index: number) => (
                <DonationCard key={index} donation={el} />
              ))}
            </Grid2>
          } */}
        </div>
      ))}
    </Box>
  );
};

export default function HomePage() {
  const theme = useAppTheme();
  const { isLoading, donations } = useDonations();

  const donationsMap: Map<string, Array<Donation>> = new Map();
  donations?.forEach((el) => {
    const donationList = donationsMap.get(el.category) || [];
    donationList.push(el);
    donationsMap.set(el.category, donationList);
  });

  return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar />
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            height: '85%',
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
