import { isUserLoggedIn } from "@utils/handle-tokens";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ element }) {
  const isLoggedIn = isUserLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signup");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return element;
}
