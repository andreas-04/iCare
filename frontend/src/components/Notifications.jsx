import { useEffect, useState } from "react";
import Cookies from 'js-cookie'; // Import js-cookie
import api from '../api'; // Import the api.js file
import { Stack, Card, Typography, Sheet , Button, Grid, IconButton} from "@mui/joy";
import { styled } from '@mui/joy/styles';
import ClearIcon from '@mui/icons-material/Clear';
const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography['body-sm'],
    textAlign: 'center',
    fontWeight: theme.fontWeight.md,
    color: theme.vars.palette.text.secondary,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: theme.spacing(1),
    borderRadius: theme.radius.md,
  }));
const Notifications = () => {
    const [notifications, setNotifications] = useState({});

    useEffect(() =>{
        const userId = Cookies.get('user_id');
        //get notifications
        api.getNotifications(userId).then(response => {
            setNotifications(response.data);
        }).catch(error => {
            console.log(error)
        });

    }, []);
    const handleDelete = async(notifId) => {
        try{
             await api.deleteNotification(notifId);
            setNotifications(prevNotifications => {
                // Filter out the deleted notification
                const updatedNotifications = prevNotifications.notifications.filter(notification => notification.id !== notifId);
                return { ...prevNotifications, notifications: updatedNotifications };
            });
        }catch(error){
            console.log(error)
        }
    };
    console.log(notifications)
    return(
        <>
            <Stack
                direction="column"
                alignItems="stretch"
                spacing={1}
            >
                {notifications.notifications && notifications.notifications.map((notification, index) => (
                    <Item key={index}>
                        <Card size="sm" variant="plain">
                            <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
                                <Grid item xs={10.5}>
                                    <Typography level="title-lg" align="left">New Message</Typography>
                                </Grid>
                                <Grid item xs={1.5}>
                                    <IconButton variant="plain" sx={{marginTop: "-10px"}} onClick={() => handleDelete(notification.id)}>
                                        <ClearIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Typography level="body-lg" align="left">{notification.message}</Typography>
                        </Card>
                    </Item>
                ))}
                {notifications.lawn_match_notifications && notifications.lawn_match_notifications.map((notification, index) => (
                    <Item key={index}>
                        <Card size="sm" variant="plain">
                            <Typography level="title-lg" align="left">New Potential Lawn Match</Typography>
                            <Typography level="body-lg" align="left">Provider: {notification.sender}</Typography>
                            <Button>Accept</Button>
                            <Button>Reject</Button>
                        </Card>
                    </Item>
                ))}
                {notifications.interior_match_notifications && notifications.interior_match_notifications.map((notification, index) => (
                    <Item key={index}>
                        <Card size="sm" variant="plain">
                            <Typography level="title-lg" align="left">New Potential Interior Match</Typography>
                            <Typography level="body-lg" align="left">Provider: {notification.sender}</Typography>
                            <Button>Accept</Button>
                            <Button>Reject</Button>
                        </Card>
                    </Item>
                ))}
                {notifications.internet_match_notifications && notifications.internet_match_notifications.map((notification, index) => (
                    <Item key={index}>
                        <Card size="sm" variant="plain">
                            <Typography level="title-lg" align="left">New Potential Internet Match</Typography>
                            <Typography level="body-lg" align="left">Provider: {notification.sender}</Typography>
                            <Button>Accept</Button>
                            <Button>Reject</Button>
                        </Card>
                    </Item>
                ))}
                {notifications.phone_match_notifications && notifications.phone_match_notifications.map((notification, index) => (
                    <Item key={index}>
                        <Card size="sm" variant="plain">
                            <Typography level="title-lg" align="left">New Potential Phone Match</Typography>
                            <Typography level="body-lg" align="left">Provider: {notification.sender}</Typography>
                            <Button>Accept</Button>
                            <Button>Reject</Button>
                        </Card>
                    </Item>
                ))}
            </Stack>
        </>
    )
}
export default Notifications;