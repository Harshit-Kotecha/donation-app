import logo from '@assets/logo.svg';
import useAppTheme from '@hooks/useTheme';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { alpha, styled, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { routes } from '@routing/routes';
import { appConstants } from 'constants/app-constants';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const appName = appConstants.appName;
  const theme = useAppTheme();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            backgroundColor: 'background.default',
            textAlign: 'left',
          }}
          position="static"
        >
          <Toolbar>
            <img src={logo} className="w-min-4 max-w-11 mr-5" />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                color: 'text.primary',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}
            >
              {appName}
            </Typography>
            <Link
              to={routes.addDonation}
              className="mr-6 text-white hover:text-green-500 font-bold tracking-wider"
            >
              DONATE
            </Link>
            <Search>
              <SearchIconWrapper sx={{ color: 'text.primary' }}>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{ color: 'text.primary', borderColor: 'text.primary' }}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
