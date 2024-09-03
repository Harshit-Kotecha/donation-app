import { Donation } from '@interfaces/donation';
import { update } from '@redux/donationSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { get } from 'services/network/api-service';

export default function useDonations() {
  const [isLoading, setIsLoading] = useState(false);
  const [donations, setDonations] = useState<Array<Donation>>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await get({ url: '/api/donations' });

        dispatch(update(result.data));
        setDonations(result.data as Array<Donation>);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, donations };
}
