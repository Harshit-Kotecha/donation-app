import { Donation } from '@interfaces/donation';
import { useEffect, useState } from 'react';
import { get } from 'services/network/api-service';

export default function useDonations() {
  const [isLoading, setIsLoading] = useState(false);
  const [donations, setDonations] = useState<Array<Donation>>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await get({ url: '/api/donations' });

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
