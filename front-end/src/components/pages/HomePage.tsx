import img from '@assets/donation-app.jpg';
import DonationCard from '@components/atoms/DonationCard';
import Image from '@components/atoms/Image';
import PrimarySearchAppBar from '@components/molecules/SearchAppBar';
import { ThemeProvider } from '@emotion/react';
import useAppTheme from '@hooks/useTheme';
import { Donation } from '@interfaces/donation';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import '@styles/style.css';
import { debounce } from '@utils/utils';
import { endpoints } from 'constants/endpoints';
import { useEffect, useMemo, useRef, useState } from 'react';
import { get } from 'services/network/api-service';

const Donations = (donationsMap: Map<string, Array<Donation>>) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        backgroundImage: 'backgroundImage.default',
        minHeight: '100%',
      }}
    >
      {[...donationsMap.entries()]?.map(([key, value], idx) => (
        <div key={idx} className="sm:px-16">
          <p className="text-2xl sm:text-3xl px-4 text-slate-500 mb-3 pt-5 sm:pt-11 ">
            {key.toUpperCase()}
          </p>
          <div className="flex overflow-x-auto scroll-container snap-x snap-mandatory scroll-smooth">
            {value
              ?.sort((a: Donation, b: Donation) => {
                if (a.expires_at === 0) return 1; // Push a with expiry_time_in_hours = 0 to the end
                if (b.expires_at === 0) return -1; // Push b with expiry_time_in_hours = 0 to the end
                return a.expires_at - b.expires_at; // Sort by expiry_time_in_hours in increasing order
              })
              .map((el, index: number) => (
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
  // const { isLoading, donations: allDonations } = useDonations();

  // console.log(allDonations, 'all donations');
  const [isLoading, setIsLoading] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  // const [searchQuery, setSearchQuery] = useState('');
  const queryRef = useRef('');

  const controllerRef = useRef(new AbortController());

  const donationsMap: Map<string, Array<Donation>> = new Map();
  donations?.forEach((el) => {
    const donationList = donationsMap.get(el.category) || [];
    donationList.push(el);
    donationsMap.set(el.category, donationList);
  });

  const onQueryChange = (e: object) => {
    const query: string = e['target']['value'].trim();
    console.log(query, '--input home');

    if (query === queryRef.current) {
      return;
    }

    queryRef.current = query;
    searchFun();
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const queryText = queryRef.current;
      const foundDonations = await get({
        url: endpoints.donations,
        queryParams: queryText && { search_key: queryText },
        abortController: controllerRef.current,
      });
      console.log(foundDonations, 'inside effect');
      setDonations(foundDonations.data);
    } catch (error) {
      console.error(error, '-----home page');
    } finally {
      setIsLoading(false);
    }
  };

  const searchFun = useMemo(() => debounce(fetchData, 700), []);

  useEffect(() => {
    fetchData();
  }, []);

  console.log(donations, 'donations');

  return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar onChange={onQueryChange} />
      <div className="flex flex-col lg:flex-row bg-background-dark items-center">
        <Image img={img} className="lg:w-[40%] xl:w-6/12" />
        <div className="mt-3 mx-4 lg:ml-11 justify-evenly">
          <p className="flex-1 text-2xl font-bold text-white sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl mb-2 sm:mb-5 xl:mb-9">
            Giving is the essence of living.
          </p>
          <p className="flex-1 text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-medium text-gray-600">
            Donations spread kindness, empowering lives and creating lasting
            change.
          </p>
        </div>
      </div>
      <div className=""></div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {donationsMap.size === 0 ? (
        <h1 className="text-3xl text-center mt-11">No donations to show</h1>
      ) : (
        Donations(donationsMap)
      )}
    </ThemeProvider>
  );
}
