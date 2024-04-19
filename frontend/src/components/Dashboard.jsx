import  { useEffect, useState } from 'react';
import { Grid, Typography, Option, Select  } from "@mui/joy";
import ActivePlans from './ActivePlans.jsx';
import BudgetView from './BudgetView.jsx';
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
                <Typography level="h2" align="left">My Dashboard</Typography>

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
            <Grid item xs={4}>
                    <BudgetView propertyId={property}/>
            </Grid>
            <Grid item xs={8}>
                {/* <Typography level="title-lg" align="left">Active Plans</Typography> */}
                <ActivePlans propertyId={property}/>
            </Grid>

        </Grid>

        </>
    )
}
export default Dashboard;