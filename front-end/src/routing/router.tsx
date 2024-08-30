import SignInPage from "@components/pages/SignInPage";
import SignupPage from "@components/pages/SignUpPage";
import ErrorPage from "@pages/ErrorPage";
import HomePage from "@pages/HomePage";
import { routes } from "@routing/routes.js";
import App from "App";
import { createBrowserRouter } from "react-router-dom";

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
