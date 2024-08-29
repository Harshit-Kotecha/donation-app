import DonationCard from "@components/atoms/DonationCard";
import PrimarySearchAppBar from "@components/molecules/PrimarySearchAppBar";
import { ThemeProvider } from "@emotion/react";
import useDonations from "@hooks/useDonations";
import { Box, Grid2, Stack } from "@mui/material";
import appTheme from "@themes/theme";

export default function HomePage() {
  const theme = appTheme();
  const { isLoading, donations } = useDonations();
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "background.default" }}>
        <PrimarySearchAppBar />
        <Grid2
          container
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ px: 3, my: 5 }}
        >
          {donations?.map((el, index) => (
            <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <DonationCard donation={el} />
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </ThemeProvider>
  );
}
