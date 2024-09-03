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
import Collapse from '@mui/material/Collapse';
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

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          width: 345,
          ':hover': {
            boxShadow: `0px 0px 20px 10px ${theme['palette']['shadow']}}`,
            cursor: 'pointer',
          },
        }}
        onClick={() => {
          const path = `${routes.donationDetails}/${donation.id}`;
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
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
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
          <Button variant="outlined" color="info">
            Show more
          </Button>
          {/* <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore> */}
        </CardActions>
        <Collapse in={false} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
            <Typography sx={{ marginBottom: 2 }}>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography sx={{ marginBottom: 2 }}>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that
              don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
}
