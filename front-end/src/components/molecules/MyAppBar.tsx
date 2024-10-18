import menu from '@assets/menu.svg';
import trophy from '@assets/trophy.svg';
import useMenu from '@hooks/useMobileMode';
import useAppTheme from '@hooks/useTheme';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import { routes } from '@routing/routes';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoBanner from './LogoBanner';
import BasicMenu from './MenuButton';
import TitleLink, { TitleLinkProps } from './TitleLink';

export default function MyAppBar() {
  const theme = useAppTheme();
  const showMenuMode = useMenu();
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => {
    // setAnchorEl(ref.current);
    setIsMenuOpen(true);
  };

  const handleClose = () => {
    // setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const navbarItems: TitleLinkProps[] = [
    { title: 'Home', link: routes.donations },
    { title: 'My Donations', link: routes.myDonations },
    { title: 'Add Donation', link: routes.addDonation },
    { title: 'Leaderboards', link: routes.leaderboard },
    { title: 'Profile', link: routes.myProfile },
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

              {showMenuMode ? (
                <div className="flex flex-row gap-4 items-center">
                  <img
                    className="w-6"
                    src={trophy}
                    onClick={() => {
                      navigate(routes.leaderboard);
                    }}
                  />
                  <div>
                    <img
                      src={menu}
                      ref={ref}
                      onClick={handleClick}
                      className="w-6 h-6"
                    />
                    <BasicMenu
                      open={isMenuOpen}
                      anchorEl={ref.current}
                      handleClose={handleClose}
                      items={navbarItems}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  {navbarItems.map((e, i) => (
                    <TitleLink key={i} title={e.title} link={e.link} />
                  ))}
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
