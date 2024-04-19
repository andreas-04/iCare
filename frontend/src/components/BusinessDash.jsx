import { useState, useEffect } from "react";
import api from "../api";
import Cookies from 'js-cookie';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Typography, Grid, Card, Divider, Select, selectClasses, Option, Button, Modal, Box, Textarea} from '@mui/joy';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import ServiceForm from "./ServiceForm";
const BusinessDash = () => {
    const [activePlans, setActivePlans] = useState({});
    const [formType, setFormType] = useState("");
    const [addresses, setAddresses] = useState({}); // New state to store addresses
    const userId = Cookies.get('user_id');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                <Typography level="h4" align="left">Contact Customer</Typography>
                <Typography level="body-md" align="left">
                    Please fill out the form below to contact the customer.
                </Typography>
                <Textarea minRows={5} />
                <Button onClick={handleClose}>Contact</Button>
            </Card>
        </Box>

        </>
    );
    const handleCancel = async(planId, category) => {
        const extractedPart = category.split('_')[0];

        try {
            await api.deletePlan(planId, extractedPart);
            fetchActivePlans();

        } catch (error) {
            console.log(error);
        }
    };

    async function getAddress(propertyId) {
        try {
            if (propertyId === null) {
                return null;
            } else {
                const response = await api.getProperty(propertyId);
                if (response && response.data) {
                    // Update addresses state with the new address
                    setAddresses(prevAddresses => ({
                        ...prevAddresses,
                        [propertyId]: response.data.address
                    }));
                } else {
                    console.error("Response data is undefined or missing");
                    return null;
                }
            }
        } catch (error) {
            console.error("Failed to fetch property data:", error);
            return null;
        }
    }
    const fetchActivePlans = async() => {
        try{
            const activePlanData = await api.getActiveBusinessPlans(userId);
            setActivePlans({
                ...activePlanData.data
            });
            for (const planType of Object.keys(activePlanData.data)) {
                for (const plan of activePlanData.data[planType]) {
                    getAddress(plan.property);
                }
            }
        
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        fetchActivePlans();
    })
    const handleSelectChange = (event, newValue) => {
        setFormType(newValue);
    }
    return (
        <>
        <Typography level="h2" align="left">My Dashboard</Typography>
            <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                <Grid item xs={3}>
                    <Card  size="sm">
                        <Typography level="h4" align="left">Create New Service Plan</Typography>
                        <Divider></Divider>
                        <Select
                            placeholder="Plan Type"
                            indicator={<KeyboardArrowDown />}
                            sx={{
                                [`& .${selectClasses.indicator}`]: {
                                transition: '0.2s',
                                [`&.${selectClasses.expanded}`]: {
                                    transform: 'rotate(-180deg)',
                                },
                                },
                            }}
                            onChange={handleSelectChange}
                        >
                            <Option value="lawn">Lawn</Option>
                            <Option value="interior">interior</Option>
                            <Option value="phone">phone</Option>
                            <Option value="internet">internet</Option>
                            
                        </Select>
                        <ServiceForm form_type={formType}/>
                    </Card>
                    
                </Grid>
                <Grid item xs={9}>
                    <Card size="sm">
                        <Typography level="h4" align="left">My Plans</Typography>
                        <AccordionGroup
                        variant="outlined"
                        transition="0.2s"
                        sx={{
                            borderRadius: 'lg',
                            [`& .${accordionSummaryClasses.button}:hover`]: {
                            bgcolor: 'transparent',
                            },
                            [`& .${accordionDetailsClasses.content}`]: {
                            boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
                            [`&.${accordionDetailsClasses.expanded}`]: {
                                paddingBlock: '0.75rem',
                            },
                            },
                        }}
                        >
                            {Object.keys(activePlans).map((planType) => (
                                activePlans[planType].map((plan, index) => (
                                <Accordion key={`${planType}-${index}`} >
                                    <AccordionSummary>
                                    <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                                        <Grid item xs={4.5}>
                                            <Typography level="title-md">{plan.service_name}</Typography>
                                        </Grid>
                                        <Divider  orientation="vertical"></Divider>
                                        <Grid item xs={3.3}>
                                            <Typography level="title-md">{planType}</Typography>
                                        </Grid>
                                        <Divider  orientation="vertical"></Divider>
                                        <Grid item xs={3.25}>
                                            <Typography level="title-md">{addresses[plan.property] || 'No Match...'}</Typography>
                                        </Grid>
                                    </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails variant="soft">
                                        <Grid container spacing={1} sx={{ flexGrow: 1 }} alignItems="stretch">
                                            <Grid item xs={8}>
                                                <Card variant='outlined' size='sm' >
                                                    <Typography level="title-md" align="left">Service Description </Typography>
                                                    <Divider orientation="horizontal" flexitem="true" ></Divider>
                                                    <Typography level="body-md" align="left">{plan.service_description}</Typography>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Card size="sm">
                                                    <Typography level="title-md" align="left" >Plan Details</Typography>
                                                    <Divider></Divider>
                                                    <Typography level="body-md" align="left">Cost: ${plan.cost}</Typography>
                                                    {planType === ("lawn_plans") && (<Typography level="body-md" align="left">Frequency: {plan.frequency} per month</Typography>)}
                                                    {planType === ("interior_plans") && (<Typography level="body-md" align="left">Frequency: {plan.frequency} per month</Typography>)}
                                                    {planType === ("phone_plans") && (<><Typography level="body-md" align="left">Users: {plan.users} </Typography><Typography level="body-md" align="left">Plan Type: {plan.plan_type}</Typography></>) }
                                                    {planType === ("internet_plans") && (<><Typography level="body-md" align="left">Devices: {plan.users}</Typography><Typography level="body-md" align="left"><Typography level="body-md" align="left">Plan Speed: {plan.speed} mb/s</Typography></Typography></>)}

                                                    <Button size="sm" onClick={handleOpen}>Contact Customer</Button>
                                                    <Button size="sm" color="danger" onClick={() => handleCancel(plan.id, planType)}>Delete Plan</Button>
                                                </Card>
                                                
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        ))}
                        </AccordionGroup>
                    </Card>
                </Grid>
            </Grid>
            <Modal  open={open} onClose={handleClose}>
                {modalContent}
            </Modal>
        </>
    )
}
export default BusinessDash;