import { ThemeProvider } from '@emotion/react';
import useAppTheme from '@hooks/useTheme';
import { Donation, DonationStatus } from '@interfaces/donation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, Chip, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { routes } from '@routing/routes';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/donation.jpg';

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

  const expiryText =
    donation.expiry_time_in_hours < 0
      ? 'Never expires'
      : `Expires in ${donation.expiry_time_in_hours} hours`;

  return (
    <ThemeProvider theme={theme}>
      <Card
        className="m-0 mr-5 sm:m-4"
        sx={{
          width: 315,
          minWidth: 315,
          maxWidth: 345,
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
          action={
            <Chip
              label={donation.status || 'open'}
              color={color}
              size="small"
            />
          }
          title={donation.name}
          subheader="September 14, 2016"
        />
        <CardMedia component="img" height="194" image={img} alt="Paella dish" />
        <CardContent>
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
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }} disableSpacing>
          <Tooltip title="Like this" placement="right">
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          <Button
            variant="outlined"
            color={`${
              donation.status === DonationStatus.OPEN ? 'info' : 'warning'
            }`}
          >
            {donation.status === DonationStatus.OPEN
              ? expiryText
              : 'Unavailable Donation'}
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}
