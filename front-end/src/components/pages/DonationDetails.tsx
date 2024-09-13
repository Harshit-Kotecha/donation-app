import img from '@assets/donation.jpg';
import AlertMsg from '@components/atoms/AlertMsg';
import Button from '@components/atoms/Button';
import Description from '@components/atoms/Description';
import Heading from '@components/atoms/Heading';
import Image from '@components/atoms/Image';
import ItemDetails, {
  ItemDetailsProp,
} from '@components/molecules/ItemDetails';
import SearchAppBar from '@components/molecules/SearchAppBar';
import { Donation, DonationStatus } from '@interfaces/donation';
import { RootState } from '@redux/store';
import { routes } from '@routing/routes';
import { endpoints } from 'constants/endpoints';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { patch } from 'services/network/api-service';

interface DonationProp {
  donation: Donation;
}

interface BtnAttributes {
  title: string;
  styles: string;
  onClick: (id: number) => void;
}

export default function DonationDetails() {
  const { state } = useLocation();
  const { id } = useParams();
  const donations = useSelector((state: RootState) => state.donation.value);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [donationStatus, setDonationStatus] = useState(DonationStatus.OPEN);
  const navigate = useNavigate();

  let donation: Donation;
  if (state) {
    const { donation: tmp }: DonationProp = state;
    donation = tmp;
  } else if (id) {
    donation = donations?.find((el) => el.id === parseInt(id));
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setDonationStatus(donation?.status);
  }, []);

  const getBtnAttributes = (status?: string) => {
    const btnAttributes: BtnAttributes = {
      title: 'Receive Donation',
      styles: '',
      onClick: async (id) => {
        try {
          const res = await patch({
            url: `${endpoints.update}/${id}`,
            queryParams: { status: 'processing' },
          });

          if (res['success']) {
            setAlertMsg(res['data']);
            setDonationStatus(DonationStatus.PROCESSING);
            setTimeout(() => {
              setAlertMsg(null);
              navigate(routes.donations, { replace: true });
            }, 2000);
          } else {
            throw new Error(res['message']);
          }
        } catch (err) {
          setAlertMsg('Something went wrong!');
          setTimeout(() => {
            setAlertMsg(null);
          }, 2000);
          console.error(err, 'patch error');
        }
      },
    };

    switch (status) {
      case DonationStatus.CLOSED: {
        btnAttributes.title = 'This donation is closed now.';
        btnAttributes.styles =
          'bg-red-700 hover:cursor-default hover:bg-red-700';
        btnAttributes.onClick = () => {};
        break;
      }
      case DonationStatus.PROCESSING: {
        btnAttributes.title = 'Donation is in processing phase';
        btnAttributes.styles =
          'bg-purple-700 hover:cursor-auto hover:bg-purple-700';
        btnAttributes.onClick = () => {};
        break;
      }
    }

    return btnAttributes;
  };

  const btnAttributes = getBtnAttributes(donationStatus);

  if (!donation) {
    return <h1>Invalid request</h1>;
  }

  const itemDetails: ItemDetailsProp[] = [
    { title: 'Name', subtitle: donation.name.toUpperCase() },
    { title: 'Category', subtitle: donation.category.toUpperCase() },
    ...(donationStatus === DonationStatus.OPEN
      ? [
          {
            title: 'Expiry Time',
            subtitle: `${donation.expiry_time_in_hours} hours`,
          },
        ]
      : []),
    { title: 'Email', subtitle: donation.email },
    { title: 'Phone Number', subtitle: donation.phone_number.toString() },
    { title: 'Address', subtitle: donation.address },
    { title: 'Pin Code', subtitle: donation.pin_code.toString() },
    { title: 'Postal Name', subtitle: donation.postal_name },
    { title: 'Region', subtitle: donation.region },
    { title: 'District', subtitle: donation.district },
    { title: 'State', subtitle: donation.state },
  ];

  return (
    <>
      <SearchAppBar />
      <div className="flex flex-col sm:flex-row justify-evenly sm:gap-0 bg-background-dark">
        <div className="flex-grow">
          <Image img={img} />
        </div>
        <div className="flex-grow px-4 py-5 sm:px-20 sm:py-5 sm:min-w-[100px]">
          {alertMsg && <AlertMsg msg={alertMsg} />}
          <Heading
            title={`Donor details:`}
            className="mb-5 underline text-green-600"
          />
          {itemDetails.map((item, index) => (
            <ItemDetails
              key={index}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}
          <Heading
            title="Donation description:"
            className="mt-5 underline text-green-600"
          />
          <Description
            text={donation.description}
            className="font-normal my-3 sm:my-5"
          />
          <Button
            title={btnAttributes.title}
            onClick={() => btnAttributes.onClick(donation.id)}
            styles={`w-full	bottom-5 right-11 ${btnAttributes.styles}`}
          />
        </div>
      </div>
    </>
  );
}
