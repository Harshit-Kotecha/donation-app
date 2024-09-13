import logo from '@assets/logo.svg';
import { Typography } from '@mui/material';
import { routes } from '@routing/routes';
import { appConstants } from 'constants/app-constants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoBanner() {
  const [showPointer, setShowPointer] = useState<boolean>(false);

  const navigate = useNavigate();

  const appName = appConstants.appName;

  return (
    <div
      className={`flex items-center ${
        showPointer ? 'hover:cursor-pointer' : ''
      }`}
      onMouseEnter={() => {
        setShowPointer(true);
      }}
      onClick={() => navigate(routes.donations)}
    >
      <img src={logo} className="w-min-2 max-w-9 sm:w-min-4 sm:max-w-10 mr-5" />
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
    </div>
  );
}
