import App from "App";
import ErrorPage from "@pages/ErrorPage";
import LoginPage from "@pages/LogIn";
import SignupPage from "@components/pages/SignUpPage";
import { createBrowserRouter } from "react-router-dom";
import { routes } from "@routing/routes.js";
import HomePage from "@pages/HomePage";
import SignInPage from "@components/pages/SignInPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    path: routes.home,
    element: <HomePage />,
  },
]);
