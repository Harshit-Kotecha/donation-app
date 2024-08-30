import { Theme } from "@emotion/react";
import { RootState } from "@redux/store";
import appTheme from "@themes/theme";
import { useSelector } from "react-redux";

export default function useAppTheme(): Theme {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = appTheme(mode);
  return theme;
}
