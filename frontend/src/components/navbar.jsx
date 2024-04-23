import {ButtonGroup, Card} from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import { Link } from 'react-router-dom';
import api from '../api.js';

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
            <IconButton variant='plain' size='lg'>
                <AppsIcon />
            </IconButton>
          </Link>
          <Link to={"/profile"}>
            <IconButton variant='plain' size='lg'>
                <HomeIcon />
            </IconButton>
          </Link>
          <Link to={"/notifications"}>
            <IconButton variant='plain' size='lg'>
                <JoinInnerIcon />
            </IconButton>
          </Link>
            <IconButton variant='plain' onClick={handleLogout} size='lg'>
                <LogoutIcon />
            </IconButton>
        </ButtonGroup>
      </Card>
      </>

      
    );
  }