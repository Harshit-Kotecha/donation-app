import profileAnimation from '@assets/profile.json';
import Button from '@components/atoms/Button';
import DonationQuote from '@components/atoms/DonationQuote';
import LogoutDialog from '@components/organisms/LogoutDialog';
import { routes } from '@routing/routes';
import { deleteCookie } from '@utils/handle-tokens';
import { cookiesKeys } from 'constants/cookies-keys';
import { endpoints } from 'constants/endpoints';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from 'services/network/api-service';
import MainScreen from './MainScreen';
interface ProfileData {
  email: string;
  full_name: string;
  phone_number: number;
}

const DataView = ({ title, text }) => (
  <div className="flex flex-col gap-1">
    <p className="text-gray-400 font-light md:text-xl lg:text-2xl">{title}:</p>
    <p className="text-white font-bold md:text-xl lg:text-2xl">{text}</p>
  </div>
);

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickYes = () => {
    deleteCookie(cookiesKeys.accessToken);
    navigate(routes.signin, { replace: true });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await get({ url: endpoints.profile });
        setProfileData(res.data);
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
      <div className="px-4 py-6">
        <DonationQuote
          title="Thank You for Being a Valued Member!"
          subtitle="Your contributions and presence help us grow and make a lasting impact."
        />
        <div className="flex flex-col mt-8 lg:mt-12 xl:mt-14 md:flex-row md:items-center">
          {profileData && (
            <div className="flex flex-col gap-4 lg:gap-8 md:mx-auto">
              <DataView title="Full name" text={profileData.full_name} />
              <DataView title="Email" text={profileData.email} />
              <DataView title="Phone number" text={profileData.phone_number} />
            </div>
          )}
          <Lottie
            className={`max-w-[250px] py-0 mx-auto`}
            animationData={profileAnimation}
            loop={true}
          />
        </div>
        {open && (
          <LogoutDialog
            open={open}
            handleClose={handleClose}
            handleClickYes={handleClickYes}
          />
        )}
        <Button
          title="Log out"
          onClick={() => {
            setOpen(true);
          }}
          className="bg-red-600 hover:bg-red-500 text-white mt-20 tracking-tight mx-auto md:max-w-[500px]"
        />
      </div>
    </MainScreen>
  );
}
