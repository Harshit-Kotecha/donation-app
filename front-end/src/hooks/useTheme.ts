import { Theme } from '@emotion/react';
import appTheme from '@themes/theme';

export default function useAppTheme(): Theme {
  // const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = appTheme('dark');
  return theme;
}
