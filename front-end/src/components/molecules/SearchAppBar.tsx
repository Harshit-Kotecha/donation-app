import useAppTheme from '@hooks/useTheme';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { alpha, styled, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { routes } from '@routing/routes';
import LogoBanner from './LogoBanner';
import TitleLink, { TitleLinkProps } from './TitleLink';

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

interface SearchAppBarProps {
  onChange?: (e: object) => void;
}

export default function SearchAppBar({ onChange }: SearchAppBarProps) {
  const theme = useAppTheme();

  const navbarItems: TitleLinkProps[] = [
    { title: 'My Donations', link: routes.about },
    { title: 'Donate', link: routes.addDonation },
    { title: 'About', link: routes.about },
  ];

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
            <div className="flex items-center w-full justify-between">
              <LogoBanner />
              <div className="flex items-center">
                {navbarItems.map((e, i) => (
                  <TitleLink key={i} title={e.title} link={e.link} />
                ))}
                {/* <Search onChange={onChange} onSubmit={onChange}>
                  <SearchIconWrapper sx={{ color: 'text.primary' }}>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    sx={{ color: 'text.primary', borderColor: 'text.primary' }}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search> */}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
