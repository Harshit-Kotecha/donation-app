import deleteIcon from '@assets/delete_icon.svg';
import img from '@assets/donation.jpg';
import like from '@assets/like.svg';
import AlertMsg from '@components/atoms/AlertMsg';
import Button from '@components/atoms/Button';
import Description from '@components/atoms/Description';
import Heading from '@components/atoms/Heading';
import Image from '@components/atoms/Image';
import ItemDetails, {
  ItemDetailsProp,
} from '@components/molecules/ItemDetails';
import MyAppBar from '@components/molecules/MyAppBar';
import { Donation, DonationStatus } from '@interfaces/donation';
import { Backdrop } from '@mui/material';
import { routes } from '@routing/routes';
import { formatDateTime, getExpiryTime } from '@utils/utils';
import { endpoints } from 'constants/endpoints';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteReq, get, patch } from 'services/network/api-service';

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
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [donationStatus, setDonationStatus] = useState(DonationStatus.OPEN);
  const [donation, setDonation] = useState<Donation | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async (id: number) => {
      try {
        const result = await get({
          url: `${endpoints.donations}/${id}`,
        });
        console.log(result, '--------doantion details api');
        setDonation(result['data']);
        setDonationStatus(donation?.status);
      } catch (error) {
        console.error(error, '----donation details');
      }
    };

    if (state) {
      const { donation: tmpDonation }: DonationProp = state;
      setDonation(tmpDonation);
      setDonationStatus(tmpDonation.status);
    } else if (id) {
      fetchData(parseInt(id));
    }
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
            window.scrollTo(0, 0);
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

  const itemDetails: ItemDetailsProp[] = [
    { title: 'Name', subtitle: donation?.name },
    { title: 'Category', subtitle: donation?.category },
    {
      title: 'Created at',
      subtitle: formatDateTime(donation?.created_at),
    },
    {
      title: 'Expiry Time',
      subtitle: donation?.has_expiry
        ? getExpiryTime(donation.expires_at)
        : 'Never expires!',
    },
    { title: 'Email', subtitle: donation?.email },
    { title: 'Phone Number', subtitle: donation?.phone_number.toString() },
    { title: 'Address', subtitle: donation?.address },
    { title: 'Pin Code', subtitle: donation?.pin_code.toString() },
    { title: 'Postal Name', subtitle: donation?.postal_name },
    { title: 'Region', subtitle: donation?.region },
    { title: 'District', subtitle: donation?.district },
    { title: 'State', subtitle: donation?.state },
  ];

  const ItemBtn = ({ img, onClick, count = 0 }) => {
    return (
      <div
        onClick={onClick}
        className="hover:cursor-pointer flex-1 py-4 border border-white rounded-full"
      >
        <div className="flex flex-row w-max mx-auto justify-center items-center">
          {' '}
          <img src={img} className="w-6 h-6 mx-auto" />
          {count > 0 ? <p className="ml-4 text-xl">{count}</p> : <></>}
        </div>
      </div>
    );
  };

  const onDelete = async (id: number) => {
    try {
      const res = await deleteReq({ url: `${endpoints.delete}/${id}` });
      setAlertMsg(res['data']);
      window.scrollTo(0, 0);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const callback = (data: string) => {
    setAlertMsg(data);
    setTimeout(() => {
      setAlertMsg(null);
    }, 3000);
  };

  const onLike = async (id: number) => {
    await patch({ url: `${endpoints.like}/${id}`, callback });
  };

  return (
    <>
      <MyAppBar />
      {donation ? (
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
              text={donation?.description}
              className="font-normal my-3 sm:my-5"
            />
            <div className="flex flex-row mb-4 gap-2">
              <ItemBtn
                img={like}
                onClick={() => onLike(donation.id)}
                count={donation.likes}
              />
              <ItemBtn img={deleteIcon} onClick={() => onDelete(donation.id)} />
            </div>
            <Button
              title={btnAttributes.title}
              onClick={() => btnAttributes.onClick(donation?.id)}
              className={`w-full	bottom-5 right-11 ${btnAttributes.styles}`}
            />
          </div>
        </div>
      ) : (
        <Backdrop
          sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
          open={donation == null}
          onClick={() => {}}
        ></Backdrop>
      )}
    </>
  );
}
