import DonationCard from "@components/atoms/DonationCard";
import PrimarySearchAppBar from "@components/molecules/SearchAppBar";
import { ThemeProvider } from "@emotion/react";
import useDonations from "@hooks/useDonations";
import useAppTheme from "@hooks/useTheme";
import { Box, Grid2 } from "@mui/material";

export default function HomePage() {
  const theme = useAppTheme();
  const { donations } = useDonations();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "background.default",
          backgroundImage: "backgroundImage.default",
        }}
      >
        <PrimarySearchAppBar />
        <Grid2
          container
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ px: 3, my: 5 }}
        >
          {donations?.map((el) => (
            // <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <DonationCard donation={el} />
            // </Grid2>
          ))}
        </Grid2>
      </Box>
    </ThemeProvider>
  );
}
