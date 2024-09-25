import DonationQuote from '@components/atoms/DonationQuote';
import DonationsView from '@components/organisms/DonationsView';
import { Donation } from '@interfaces/donation';
import { endpoints } from 'constants/endpoints';
import { useEffect, useState } from 'react';
import { get } from 'services/network/api-service';
import MainScreen from './MainScreen';

export default function MyDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await get({ url: endpoints.myDonations });
        setDonations(res.data);
      } catch (error) {
        alert(error['message']);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <MainScreen isLoading={isLoading}>
      <div className="py-8">
        <DonationQuote
          title="Your generosity inspires us."
          subtitle="With every donation, you are creating hope and bringing light to the
              lives of those in need."
        />
        <DonationsView donations={donations} />
      </div>
    </MainScreen>
  );
}
