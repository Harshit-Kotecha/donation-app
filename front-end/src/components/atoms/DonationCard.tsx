import clockIcon from '@assets/clock.svg';
import { ThemeProvider } from '@emotion/react';
import useAppTheme from '@hooks/useTheme';
import { Donation, DonationStatus } from '@interfaces/donation';
import { Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { routes } from '@routing/routes';
import { getExpiryTimeDifference } from '@utils/utils';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/donation.jpg';
import IconWithText from './IconWithText';

interface DonationCardProps {
  donation: Donation;
}

export default function DonationCard({ donation }: DonationCardProps) {
  const theme = useAppTheme();
  const navigate = useNavigate();

  let color: 'error' | 'secondary' | 'success' = 'success';
  switch (donation.status) {
    case DonationStatus.CLOSED:
      color = 'error';
      break;

    case DonationStatus.PROCESSING:
      color = 'secondary';
      break;

    default:
      color = 'success';
  }

  return (
    <ThemeProvider theme={theme}>
      <Card
        className="m-0 mr-5 pb-0 sm:m-4"
        sx={{
          width: 315,
          minWidth: 315,
          maxWidth: 345,
          padding: 0,
          // minHeight: 481,
          // maxHeight: 500,
          margin: '1rem',
          // marginRight: '-0.1rem',

          ':hover': {
            boxShadow: `0px 0px 20px 10px ${theme['palette']['shadow']}}`,
            cursor: 'pointer',
          },
        }}
        onClick={() => {
          const path = `${routes.donations}/${donation.id}`;
          navigate(path, {
            state: { donation: donation },
          });
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={<Chip label={donation.status} color={color} size="small" />}
          title={donation.name}
          subheader={`${donation.district}, ${donation.state}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={img}
          alt="Donation img"
        />
        <CardContent className="px-4 py-4">
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              textOverflow: 'ellipsis',
              minHeight: '60px',
            }}
          >
            {donation.description}
          </Typography>
          <IconWithText
            icon={clockIcon}
            text={getExpiryTimeDifference(donation.expires_at)}
          />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
