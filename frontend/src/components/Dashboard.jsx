import  { useEffect, useState } from 'react';
import { Card, Divider, Grid, Typography, Chip, Button, Option, Box, Select, CircularProgress  } from "@mui/joy";
import ActivePlans from './ActivePlans.jsx';
import api from '../api';
import Cookies from 'js-cookie';
const Dashboard = () => {
    const userId = Cookies.get('user_id'); 
    const [property, setProperty] = useState(null);
    const [propertyList, setPropertyList] = useState([]);
    const handleSelectChange = (event, newValue) => {
        setProperty(newValue);

    }
    useEffect(() => {
        const fetchProperties = async () => {
            try{
                const properties = await api.getProperties(userId);
                setPropertyList(properties.data);
                if (properties.data.length > 0) {
                    setProperty(properties.data[0].id);
                }
            }catch(error){
                console.log("error getting properties",error);
            }
        }
        fetchProperties();
    }, [userId]);
    return(
        <>
        <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
            <Grid item xs={9}>
                <Typography level="h3" align="left">My Dashboard</Typography>

            </Grid>
            <Grid item xs={3}>
                <Select onChange={handleSelectChange} placeholder={"Select a Property"} >
                    {propertyList.map((property, index) => (
                        <Option key={index} value={property.id}>
                            {property.address}
                        </Option>
                    ))}
                </Select>
            </Grid>
        </Grid>
     
        <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
            <Grid item xs={8}>
                <Card size='sm'>
                    <Typography level="title-lg" align="left">Active Plans</Typography>
                    <ActivePlans propertyId={property}/>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <Typography level="title-lg" align="left">My Budget</Typography>
                    <Divider></Divider>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%', 
                        }}
                    >
                        <CircularProgress
                            determinate value={45}
                            variant='solid'
                            sx={{
                                "--CircularProgress-size": "275px",
                                "--CircularProgress-trackThickness": "40px",
                                "--CircularProgress-progressThickness": "35px",
                            }}
                        >
                            <Typography level='h3'>$183.97/$400</Typography>
                        </CircularProgress>
                    </Box>
                </Card>
            </Grid>

        </Grid>

        </>
    )
}
export default Dashboard;