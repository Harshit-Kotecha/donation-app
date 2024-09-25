import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { TitleLinkProps } from './TitleLink';

interface MenuButtonProp {
  open: boolean;
  anchorEl: Element;
  handleClose: () => void;
  items: TitleLinkProps[];
}

export default function BasicMenu({
  open,
  anchorEl,
  handleClose,
  items,
}: MenuButtonProp) {
  const navigate = useNavigate();

  return (
    <div>
      {/* <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {items.map((e, i) => (
          <MenuItem key={i} onClick={() => navigate(e.link)}>
            {e.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
