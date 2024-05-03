import { useState, useEffect, useCallback } from "react";
import api from "../api";
import Cookies from 'js-cookie';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Typography, Grid, Card, Divider, Select, selectClasses, Option, Button} from '@mui/joy';
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
    const [plans, setPlans] = useState({});
    const [fetchType, setFetchType] = useState("all");
    const [formType, setFormType] = useState("");
    const [addresses, setAddresses] = useState({});
    const userId = Cookies.get('user_id');
    const handleCancel = async(planId, category) => {
        const extractedPart = category.split('_')[0];
        try {
            await api.deletePlan(planId, extractedPart);
            fetchPlans(fetchType);

        } catch (error) {
            console.log(error);
        }
    };


    const fetchPlans = useCallback(async (fetchType) => {
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
        try {
            const planData = await api.getBusinessPlans(userId, fetchType);
            setPlans({
                ...planData.data
            });

            // Create a set to store unique property IDs
            const uniquePropertyIds = new Set();

            // Iterate over each plan type and plan to collect unique property IDs
            for (const planType of Object.keys(planData.data)) {
                for (const plan of planData.data[planType]) {
                    if (plan.property) {
                        uniquePropertyIds.add(plan.property);
                    }
                }
            }

            // Fetch addresses for unique property IDs
            for (const propertyId of uniquePropertyIds) {
                getAddress(propertyId);
            }
        } catch (error) {
            console.log(error);
        }
    }, [userId]); 

    useEffect(() => {
        fetchPlans(fetchType);
    }, [fetchType, fetchPlans]);

    const handleSelectChange = (event, newValue) => {
        setFormType(newValue);
    }
    const handleSelectChangePlan = (event, newVal) => {
        setFetchType(newVal);
    }

    const handleAccept = async(planId, planType) => {
        const extractedPart = planType.split('_')[0];
        try{
            await api.putPlan(planId, extractedPart, {
                handshake: true,
            });
            fetchPlans(fetchType);
        }catch(error){
            console.error(error);
        }

    }
    const handleDeny = async(planId, planType) => {
        const extractedPart = planType.split('_')[0];
        try{
            await api.putPlan(planId, extractedPart, {
                property: null,
            });
            fetchPlans(fetchType);
        }catch(error){
            console.error(error);
        }

    }
    return (
        <>
        <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
            <Grid item xs={9}>
                <Typography level="h2" align="left">My Dashboard</Typography>
            </Grid>
            <Grid item xs={3}>
                <Select
                    indicator={<KeyboardArrowDown />}
                    sx={{
                        [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                            transform: 'rotate(-180deg)',
                        },
                        },
                    }}
                    defaultValue={"all"}
                    size="lg"
                    onChange={handleSelectChangePlan}
                >
                    <Option value={"all"}>All Plans</Option>
                    <Option value={"pending"}>Pending Plans</Option>
                    <Option value={"active"}>Active Plans</Option>
                </Select>
            </Grid>
                <Grid item xs={3}>
                    <Card  size="md">
                        <Typography level="h3" align="left">Create New Service Plan</Typography>
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
                        <ServiceForm form_type={formType} onPlanCreate={() => fetchPlans(fetchType)} />
                    </Card>
                    
                </Grid>
                <Grid item xs={9}>
                    <Card size="md">
                        <Typography level="h3" align="left">My Plans</Typography>
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
                            {Object.keys(plans).map((planType) => (
                                plans[planType].map((plan, index) => (
                                <Accordion key={`${planType}-${index}`} >
                                    <AccordionSummary>
                                    <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                                        <Grid item xs={4.5}>
                                            <Typography level="title-lg">{plan.service_name}</Typography>
                                        </Grid>
                                        <Grid item xs={3.3}>
                                            <Typography level="title-lg">{planType}</Typography>
                                        </Grid>

                                    
                                        <Grid item xs={3.25}>
                                            <Typography level="title-lg">{addresses[plan.property] || 'No Match...'}</Typography>
                                        </Grid>
                                    </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails variant="soft">
                                        <Grid container spacing={1} sx={{ flexGrow: 1 }} alignItems="stretch">
                                            <Grid item xs={8}>
                                                <Card variant='outlined' size='md' >
                                                    <Typography level="title-lg" align="left">Service Description </Typography>
                                                    <Divider orientation="horizontal" flexitem="true" ></Divider>
                                                    <Typography level="body-md" align="left">{plan.service_description}</Typography>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Card size="md">
                                                    <Grid container spacing={1} sx={{ flexGrow: 1 }} alignItems="stretch">
                                                        <Grid item xs={8}>
                                                            <Typography level="title-lg" align="left" >Service Details</Typography>
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                            <Button size="sm" color="danger" onClick={() => handleCancel(plan.id, planType)}>Delete Plan</Button>
                                                        </Grid>
                                                    </Grid>
                                                    <Divider></Divider>
                                                    <Typography level="body-md" align="left">Cost: ${plan.cost}</Typography>
                                                    {planType === ("lawn_plans") && (<Typography level="body-md" align="left">Frequency: {plan.frequency} per month</Typography>)}
                                                    {planType === ("interior_plans") && (<Typography level="body-md" align="left">Frequency: {plan.frequency} per month</Typography>)}
                                                    {planType === ("phone_plans") && (<><Typography level="body-md" align="left">Users: {plan.users} </Typography><Typography level="body-md" align="left">Plan Type: {plan.plan_type}</Typography></>) }
                                                    {planType === ("internet_plans") && (<><Typography level="body-md" align="left">Devices: {plan.users}</Typography><Typography level="body-md" align="left"><Typography level="body-md" align="left">Plan Speed: {plan.speed} mb/s</Typography></Typography></>)}
                                                    
                                                    {fetchType === ("pending") && (
                                                        <>
                                                            <Divider></Divider>
                                                            <Button color="success" size="sm" onClick={() => handleAccept(plan.id, planType)} >Accept</Button>
                                                            <Button color="danger" size="sm" onClick={() => handleDeny(plan.id, planType)}>Deny</Button>
                                                        </>
                                                    )}    
                                                    {((fetchType ===("all")) && (plan.handshake === false) && (addresses[plan.property])) && (
                                                        <>
                                                            <Divider></Divider>
                                                            <Button size="sm" onClick={() => handleAccept(plan.id, planType)}>Accept</Button>
                                                            <Button color="danger" size="sm" onClick={() => handleDeny(plan.id, planType)}>Deny</Button>
                                                        </>
                                                    )}
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

        </>
    )
}
export default BusinessDash;