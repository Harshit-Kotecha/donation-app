import img from '@assets/donation-app.jpg';
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
      <div className="flex flex-row bg-background-dark items-center">
        <img src={img} className=" flex-1 w-6/12 " />
        <div className="ml-11 justify-evenly">
          <p className="flex-1 text-6xl font-bold text-white mb-11">
            Giving is the essence of living.
          </p>
          <p className="flex-1 text-3xl font-bold text-gray-600">
            Donations spread kindness, empowering lives and creating lasting
            change.
          </p>
        </div>
      </div>
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
