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
import PropTypes from 'prop-types';

export default function Navbar({userType}) {
    const  handleLogout = async() => {
        await api.logout()
        .then(() => {
          window.location.reload();
        })
        .catch(error => {
           console.error('Error logging out:', error);
        });
    };
    return (
      <>
      {userType === "homeowner" ? 
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
      </> : <>
      <Card variant="plain" size="sm">
        <ButtonGroup
          aria-label="radius button group"
          sx={{ '--ButtonGroup-radius': '8px',
          // backgroundColor: 'white',
          }}
          variant='outlined'
          orientation='horizontal'
          size='lg'
        >
          <Dropdown>
              <MenuButton size='sm' variant='plain'>
                <IconButton variant='plain' size='sm' color='primary'>
                  <NotificationsIcon/>
                </IconButton>
              </MenuButton>
              <Menu variant='plain'>
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
      </>}
  
      </>

      
    );
}
Navbar.propTypes = {
  userType: PropTypes.string.isRequired,
};