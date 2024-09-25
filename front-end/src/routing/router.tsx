import AboutPage from '@components/pages/AboutPage';
import AddDonation from '@components/pages/AddDonation';
import DonationDetails from '@components/pages/DonationDetails';
import MyDonations from '@components/pages/MyDonations';
import SignInPage from '@components/pages/SignInPage';
import SignupPage from '@components/pages/SignUpPage';
import ErrorPage from '@pages/ErrorPage';
import HomePage from '@pages/HomePage';
import { routes } from '@routing/routes.js';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: routes.signup,
    element: <SignupPage />,
  },
  {
    path: routes.signin,
    element: <SignInPage />,
  },
  {
    path: routes.donations,
    element: <HomePage />,
  },
  {
    path: `${routes.donations}/:id`,
    element: <DonationDetails />,
  },
  {
    path: routes.addDonation,
    element: <AddDonation />,
  },
  {
    path: routes.about,
    element: <AboutPage />,
  },
  {
    path: routes.myDonations,
    element: <MyDonations />,
  },
]);
