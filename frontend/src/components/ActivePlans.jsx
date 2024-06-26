import { useState, useEffect } from 'react';
import { Card, Divider, Grid, Typography, Chip, Box, Textarea, Button, Modal } from "@mui/joy";
import PropTypes from 'prop-types';
import api from '../api';
import Cookies from 'js-cookie'; 

const ActivePlans = ({ propertyId }) => {
    const [open, setOpen] = useState(false);
    const userId = Cookies.get('user_id');
    const [messageData, setMessageData] = useState({
        sender: userId,
        receiver: null,
        message: ""
    })
    const handleOpen = (businessId) => {
        setMessageData(prevState => ({
            ...prevState,
            receiver: businessId
        }));
        setOpen(true);
    }
    const handleClose = () => {
        api.postNotification(messageData);
        setOpen(false);
    }
    const updateMessage = (event) => {
        setMessageData(prevState => ({
            ...prevState,
            message: event.target.value
        }));
    }
    const modalContent = (
        <>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%', 
            }}
        >
            <Card sx={{ width: "50%", height: "30%" }}>
                <Typography level="h4" align="left">Contact Provider</Typography>
                <Typography level="body-md" align="left">
                    Please fill out the form below to contact the provider.
                </Typography>
                <Textarea minRows={5} onChange={updateMessage}/>
                <Button onClick={handleClose}>Contact</Button>
            </Card>
        </Box>
        </>
    );
    const [activePlans, setActivePlans] = useState({});
    useEffect(() => {
        const fetchActivePlans = async() => {
            try{
                const activePlansData = await api.getActivePlans(propertyId);
                setActivePlans({
                    ...activePlansData.data
                });

            }catch(error){
                // console.log("error fetching active plans, ", error);
            }
        }
        fetchActivePlans();
    }, [propertyId])
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const handleCancel = async(planId, category) => {
        const extractedPart = category.split('_')[0];
        const planData = {
            property: null,
            handshake: false,
        };
        try {
            await api.putPlan(planId, extractedPart, planData);
            const updatedActivePlans = JSON.parse(JSON.stringify(activePlans));
            const planIndex = updatedActivePlans[category].findIndex(plan => plan.id === planId);
            if (planIndex !== -1) {
                updatedActivePlans[category].splice(planIndex, 1);
                setActivePlans(updatedActivePlans);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const allPlansEmpty = Object.values(activePlans).every(plans => plans.length === 0);
    return (
        <>
            {allPlansEmpty ? (
                <Typography level="title-lg" align="center">No active plans found. Try creating some matches!</Typography>
            ) : (
            <>
                <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
                    {Object.keys(activePlans).map((category, categoryIndex) => (
                        activePlans[category].map((plan, planIndex) => (
                            <Grid item xs={3} key={`${categoryIndex}-${planIndex}`}>
                                <Card size='sm'>
                                    <Typography level="body-lg" align="left">
                                    {plan.service_name}
                                    </Typography>
                                    <Divider></Divider>
                                    <Typography align="left" level="body-md">📥 Provider: {plan.business}</Typography>
                                    <Typography align="left" level="body-md">💰 Cost: ${plan.cost} </Typography>
                                    {category === ("lawn_plans") && (<Typography align="left" level="body-md">📊 Frequency: {plan.frequency}x per month </Typography>)}
                                    {category === ("interior_plans") && (<Typography align="left" level="body-md">📊 Frequency: {plan.frequency}x per month </Typography>)}
                                    {category === ("phone_plans" || "internet_plans") && (<Typography align="left" level="body-md">👥 Users: {plan.users}</Typography>)}
                                    {category === ("phone_plans") && (<Typography align="left" level="body-md">🌐 Plan Type: {capitalizeFirstLetter(plan.plan_type)}</Typography>)}
                                    {category === ("internet_plans") && (<Typography align="left" level="body-md">🚀 Plan Speed: {plan.speed}</Typography>)}
                                    <Divider></Divider>
                                    <Grid container spacing={1} sx={{flexGrow:1 }} alignItems="stretch">
                                        <Grid item xs={4}>
                                            <Chip variant="solid" color="danger" size="md" onClick={() => handleCancel(plan.id, category)}>Cancel</Chip>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Chip variant="solid" color="primary" size="md" onClick={() => handleOpen(plan.business)} >Contact Provider</Chip>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))
                    ))}
                </Grid>
                <Modal open={open} onClose={handleClose}>
                    {modalContent}
                </Modal>
            </>
        )}
    </>
    )
}
export default ActivePlans;
ActivePlans.propTypes = {
    propertyId: PropTypes.number.isRequired,
};