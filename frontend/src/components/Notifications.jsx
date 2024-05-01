import { useEffect, useState } from "react";
import Cookies from 'js-cookie'; // Import js-cookie
import api from '../api'; // Import the api.js file
import { Stack, Card, Typography, Sheet , Button} from "@mui/joy";
import { styled } from '@mui/joy/styles';
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

    })
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
                            <Typography level="title-lg" align="left">New Message</Typography>
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