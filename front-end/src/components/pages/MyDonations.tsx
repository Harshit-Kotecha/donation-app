import emptyAnimation from '@assets/empty.json';
import DonationQuote from '@components/atoms/DonationQuote';
import Heading from '@components/atoms/Heading';
import DonationsView from '@components/organisms/DonationsView';
import { Donation } from '@interfaces/donation';
import { endpoints } from 'constants/endpoints';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { get } from 'services/network/api-service';
import MainScreen from './MainScreen';

export default function MyDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [receivingDonations, setReceivingDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let res = await get({ url: endpoints.myDonations });
        setDonations(res.data);
        res = await get({ url: endpoints.receiving });
        setReceivingDonations(res.data);
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
      <div className="py-8 px-2">
        <DonationQuote
          title="Your generosity inspires us."
          subtitle="With every donation, you are creating hope and bringing light to the
              lives of those in need."
        />

        {donations?.length > 0 ? (
          <div>
            <Heading
              title="Your Impactful Contributions:"
              className="underline text-green-600 pt-8 md:py-4 text-center"
            />
            <DonationsView donations={donations} />
          </div>
        ) : (
          <div>
            <Lottie
              className={`max-w-[450px] mx-auto`}
              animationData={emptyAnimation}
              loop={true}
            />
            <Heading
              title="No donations yet - start making a difference today!"
              className="text-red-600 text-center py-4"
            />
          </div>
        )}
        {receivingDonations.length > 0 && (
          <div>
            <Heading
              title="Contributions Coming Your Way:"
              className="underline text-green-600 pt-8 md:py-4 text-center"
            />
            <DonationsView donations={receivingDonations} />
          </div>
        )}
      </div>
    </MainScreen>
  );
}
