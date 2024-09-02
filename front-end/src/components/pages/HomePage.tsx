import DonationCard from '@components/atoms/DonationCard';
import PrimarySearchAppBar from '@components/molecules/SearchAppBar';
import { ThemeProvider } from '@emotion/react';
import useDonations from '@hooks/useDonations';
import useAppTheme from '@hooks/useTheme';
import { Donation } from '@interfaces/donation';
import { Box, Button, Grid2 } from '@mui/material';

export default function HomePage() {
  const theme = useAppTheme();
  const { donations } = useDonations();

  const donationsMap: Map<string, Array<Donation>> = new Map();
  donations?.forEach((el) => {
    const donationList = donationsMap.get(el.category) || [];
    donationList.push(el);
    donationsMap.set(el.category, donationList);
  });
  console.log(donationsMap);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: 'background.default',
          backgroundImage: 'backgroundImage.default',
        }}
      >
        <PrimarySearchAppBar />
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
            <Grid2
              container
              alignItems="center"
              justifyContent="left"
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ px: 3, my: 5 }}
            >
              {value?.map((el, index: number) => (
                <DonationCard key={index} donation={el} />
              ))}
            </Grid2>
          </div>
        ))}

        <Grid2
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
        </Grid2>
      </Box>
    </ThemeProvider>
  );
}
