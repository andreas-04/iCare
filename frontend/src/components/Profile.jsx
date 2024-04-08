import  { useEffect, useState } from 'react';
import { Typography, Card, Input, Button, Grid } from "@mui/joy";
import Cookies from 'js-cookie'; // Import js-cookie
import api from '../api'; // Import the api.js file
import PropertyForm from './PropertyForm';

const Profile = () => {
    const [properties, setProperties] = useState([]);
    useEffect(() => {
        const userId = Cookies.get('user_id'); // Assuming 'userId' is the name of the cookie
        if (userId) {
            api.getProperties(userId)
                .then(response => {
                    setProperties(response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.error('Error fetching properties:', error);
                });
        }
    }, []);
    console.log(properties)
    return(
        <>
        <Typography level="h3" align="left">My Properties</Typography>
        <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
            
            {properties.map(property => (
                <Grid item xs={4} key={property.id}>
                    <PropertyForm property={property} />
                </Grid>
            ))}
            <Grid item xs={4}>
                <Card sx={{height: "95%"}}>
                    <Button sx={{marginTop:"80%",}}>+</Button>
                    <Typography level="body-md">
                        New Property
                    </Typography>
                </Card>
            </Grid>
        </Grid>
        </>
    )
}
export default Profile;