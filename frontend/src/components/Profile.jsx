import  { useEffect, useState } from 'react';
import { Typography, Button, Grid } from "@mui/joy";
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
                    //console.log(response.data)
                })
                .catch(error => {
                    console.error('Error fetching properties:', error);
                });
        }
    }, []);
    const handleAddProperty = () => {
        const userId = Cookies.get('user_id');
        const newPropertyData = {
            user: userId,
        };
        api.addProperty(newPropertyData)
            .then(response => {
                setProperties([...properties, response.data]);
            })
            .catch(error => {
                console.error('Error adding property:', error);
            });
    };
    const handleDeleteProperty = (propertyId) => {
        api.deleteProperty(propertyId)
            .then(() => {
                console.log('Property deleted successfully');
                setProperties(properties.filter(property => property.id !== propertyId));
            })
            .catch(error => {
                console.error('Error deleting property:', error);
            });
    };

    return(
        <>
        
        <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
            <Grid item xs={11}>
                <Typography level="h2" align="left">My Properties</Typography>
            </Grid>
            <Grid item xs={1}>
                <Button onClick={handleAddProperty} color='success' size='md' >New Property</Button>
            </Grid>
            {properties.map(property => (
                <Grid item xs={6} key={property.id}>
                    <PropertyForm property={property}  onDelete={handleDeleteProperty} />
                </Grid>
            ))}
        </Grid>
        </>
    )
}
export default Profile;