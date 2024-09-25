import MyAppBar from '@components/molecules/MyAppBar';
import { ThemeProvider } from '@emotion/react';
import useAppTheme from '@hooks/useTheme';
import { Backdrop, CircularProgress } from '@mui/material';

export default function MainScreen({ children, isLoading }) {
  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className="w-full bg-background-dark">
        <MyAppBar />
        {isLoading ? (
          <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isLoading}
            onClick={() => {}}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          children
        )}
      </div>
    </ThemeProvider>
  );
}
