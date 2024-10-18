import { Donation } from '@interfaces/donation';
import { update } from '@redux/rdx-donation-slice';
import { endpoints } from 'constants/endpoints';
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

        const result = await get({
          url: endpoints.donations,
          callback,
        });

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

const callback = (data) => {
  alert(data);
};
