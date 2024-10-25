import img from '@assets/donation-app.jpg';
import filter from '@assets/filter.svg';
import search from '@assets/search.svg';
import Banner from '@components/molecules/Banner';
import FiltersDialog from '@components/molecules/FiltersDialog';
import PrimarySearchAppBar from '@components/molecules/MyAppBar';
import DonationsView from '@components/organisms/DonationsView';
import { ThemeProvider } from '@emotion/react';
import useAppTheme from '@hooks/useTheme';
import { Donation } from '@interfaces/donation';
import {
  Alert,
  AlertTitle,
  Backdrop,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material';
import '@styles/style.css';
import { debounce } from '@utils/utils';
import { endpoints } from 'constants/endpoints';
import { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { get } from 'services/network/api-service';
import { getCategories } from 'services/network/donation-api-services';

interface PaginationProp {
  pageSize: number;
  page: number;
  totalPages: number;
}

export default function HomePage() {
  const theme = useAppTheme();

  // console.log(allDonations, 'all donations');
  const [isLoading, setIsLoading] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const queryRef = useRef('');

  const paginationRef: PaginationProp = {
    page: 0,
    pageSize: 10,
    totalPages: 1,
  };
  const pageRef = useRef<PaginationProp>(paginationRef);

  const controllerRef = useRef(new AbortController());

  const [filterOpen, setFilterOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  const handleChange = (event: SelectChangeEvent, type: string) => {
    const value: string = event.target.value;
    if (type === 'category') {
      setFilterCategory(value);
    } else if (type === 'status') {
      setFilterStatus(value);
    }
  };

  const handleClickOpen = () => {
    setFilterOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== 'backdropClick') {
      setFilterOpen(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const queryParams = {};
      if (filterCategory) {
        queryParams['category'] = filterCategory;
      }
      if (filterStatus) {
        queryParams['status'] = filterStatus;
      }

      const foundDonations = await get({
        url: endpoints.donations,
        queryParams: queryParams,
        callback,
      });
      setDonations(foundDonations.data);
    } catch (error) {
      console.error(error, '-----home page');
    } finally {
      setIsLoading(false);
      setFilterOpen(false);
    }
  };

  const onQueryChange = (e: object) => {
    const query: string = e['target']['value'].trim();

    if (query === queryRef.current) {
      return;
    }

    queryRef.current = query;
    searchFun();
  };

  const callback = (data: string) => {
    setAlertMsg(data);
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    setCategories(await getCategories(callback));
    setIsLoading(false);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const queryText = queryRef.current;
      const foundDonations = await get({
        url: endpoints.donations,
        queryParams: {
          page: pageRef.current.page,
          page_size: pageRef.current.pageSize,
          ...[queryText && { search_key: queryText }],
        },
        abortController: controllerRef.current,
        callback,
      });
      if (pageRef.current.page == 0) {
        setDonations(foundDonations.data);
      } else {
        setDonations((prev) => {
          prev.push(foundDonations.data);
          return prev;
        });
      }
      pageRef.current.totalPages = foundDonations['total_pages'];
      pageRef.current.page++;
    } catch (error) {
      console.error(error, '-----home page');
    } finally {
      setIsLoading(false);
    }
  };

  const searchFun = useMemo(() => debounce(fetchData, 400), []);

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar />
      <Banner
        src={img}
        title="Giving is the essence of living."
        subtitle="Donations spread kindness, empowering lives and creating lasting
            change."
      />
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {alertMsg && (
        <Alert className="m-4" severity="error">
          <AlertTitle>Error</AlertTitle>
          {alertMsg}
        </Alert>
      )}
      <div className="flex max-w-[350px] md:max-w-[600px] border-gray-400 pt-6 justify-center items-center mx-auto relative">
        <img className="w-[24px] h-[24px] absolute left-[20px]" src={search} />
        <input
          className="w-full pl-14 pr-4 py-3 rounded-full text-xl"
          type="search"
          onChange={onQueryChange}
        />
        <img
          src={filter}
          onClick={handleClickOpen}
          className="w-[28px] h-[28px] ml-4 hover:cursor-pointer"
        />
      </div>
      <FiltersDialog
        categories={categories}
        status={['open', 'closed']}
        open={filterOpen}
        filterCategory={filterCategory}
        filterStatus={filterStatus}
        handleChange={handleChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <InfiniteScroll
        dataLength={donations.length} //This is important field to render the next data
        next={fetchData}
        // hasMore={pageRef.current.page < pageRef.current.totalPages}
        hasMore={false}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <DonationsView donations={donations} />
      </InfiniteScroll>
    </ThemeProvider>
  );
}
