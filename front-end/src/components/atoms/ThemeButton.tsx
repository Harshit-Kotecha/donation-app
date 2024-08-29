import { ToggleButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toggleTheme } from "@redux/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";

export default function ThemeButton() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <ToggleButton
      sx={{ border: "none", ml: 2, p: 1 }}
      value="theme"
      onClick={() => dispatch(toggleTheme())}
    >
      {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </ToggleButton>
  );
}
