import {ButtonGroup, Card} from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import api from '../api.js';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import Notifications from './Notifications.jsx';


export default function Navbar() {
    const handleLogout = () => {
        api.logout()
        .then(() => {
           console.log('Logged out successfully');
           window.location.reload();
        })
        .catch(error => {
           console.error('Error logging out:', error);
        });
    };

    return (
      <>
      <Card size="sm">
        <ButtonGroup
          aria-label="radius button group"
          sx={{ '--ButtonGroup-radius': '8px',
          // backgroundColor: 'white',
          }}
          variant='outlined'
          orientation='horizontal'
          size='lg'
        >
          <Link to={"/"}>
            <IconButton variant='plain' size='lg' color='primary'>
                <AppsIcon />
            </IconButton>
          </Link>
          <Link to={"/profile"}>
            <IconButton variant='plain' size='lg' color='primary'>
                <HomeIcon />
            </IconButton>
          </Link>
          <Link to={"/matches"}>
            <IconButton variant='plain' size='lg' color='primary'>
                <JoinInnerIcon />
            </IconButton>
          </Link>
            <Dropdown>
              <MenuButton size='sm' variant='plain'>
                <IconButton variant='plain' size='sm' color='primary'>
                  <NotificationsIcon/>
                </IconButton>
              </MenuButton>
              <Menu variant='pain'>
                <Card variant="plain"sx={{width: 400 }}>
                  <Notifications/>
                </Card>
              </Menu>
            </Dropdown>


          <IconButton variant='plain' onClick={handleLogout} size='lg' color='primary'>
            <LogoutIcon />
          </IconButton>

        </ButtonGroup>
      </Card>
      </>

      
    );
  }