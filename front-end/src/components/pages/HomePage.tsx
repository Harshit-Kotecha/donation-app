import img from '@assets/donation-app.jpg';
import Button from '@components/atoms/Button';
import DonationCard from '@components/atoms/DonationCard';
import Image from '@components/atoms/Image';
import PrimarySearchAppBar from '@components/molecules/SearchAppBar';
import { ThemeProvider } from '@emotion/react';
import useAppTheme from '@hooks/useTheme';
import { Donation } from '@interfaces/donation';
import { Backdrop, CircularProgress } from '@mui/material';
import '@styles/style.css';
import { debounce } from '@utils/utils';
import { endpoints } from 'constants/endpoints';
import { useEffect, useMemo, useRef, useState } from 'react';
import { get } from 'services/network/api-service';

export default function HomePage() {
  const theme = useAppTheme();

  // console.log(allDonations, 'all donations');
  const [isLoading, setIsLoading] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const queryRef = useRef('');

  const controllerRef = useRef(new AbortController());

  const onQueryChange = (e: object) => {
    const query: string = e['target']['value'].trim();
    console.log(query, '--input home');

    if (query === queryRef.current) {
      return;
    }

    queryRef.current = query;
    searchFun();
  };

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const result = await get({
        url: endpoints.categories,
      });
      setCategories(result.data);
    } catch (error) {
      console.error(error, '-----home page');
    } finally {
      setIsLoading(false);
    }
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
    fetchCategories();
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

      <div className="flex flex-wrap gap-4">
        {categories.map((el, index) => (
          <Button
            key={index}
            title={el}
            onClick={() => {}}
            className="bg-black text-white border border-white"
          />
        ))}
      </div>

      <div className="flex flex-wrap justify-center px-2 bg-background-dark py-5 sm:py-7 md:py-8 xl:py-11">
        {donations.map((el, i) => (
          <DonationCard donation={el} key={i} />
        ))}
      </div>
    </ThemeProvider>
  );
}
