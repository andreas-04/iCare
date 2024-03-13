import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import logout from '../api.js';


export default function Navbar() {
    const handleLogout = () => {
        logout();
        // Optionally, redirect the user to the login page
    };
    return (
      <ButtonGroup
        aria-label="radius button group"
        sx={{ '--ButtonGroup-radius': '10px',
        backgroundColor: 'white',
        }}
        orientation='vertical'
      >
        <Link to={"/"}>
          <IconButton variant='plain'>
              <AppsIcon/>
          </IconButton>
        </Link>
        <Link to={"/profile"}>
          <IconButton variant='plain'>
              <HomeIcon/>
          </IconButton>
        </Link>
        <Link to={"/notifications"}>
          <IconButton variant='plain'>
              <NotificationsIcon/>
          </IconButton>
        </Link>
          <IconButton variant='plain' onClick={handleLogout}>
              <LogoutIcon />
          </IconButton>
      </ButtonGroup>
    );
  }