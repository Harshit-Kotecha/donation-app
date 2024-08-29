import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "@utils/handle-tokens";

export default function ProtectedRoute({ element }) {
  const isLoggedIn = isUserLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signup");
    }
  }, []);

  console.log(isLoggedIn, " ------- isLogin ");

  if (!isLoggedIn) return null;

  return element;
}
