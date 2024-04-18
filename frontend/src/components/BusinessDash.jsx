import { useState, useEffect } from "react";
import api from "../api";
import Cookies from 'js-cookie';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import { Typography, Grid, Card, Divider, Select, selectClasses, Option} from '@mui/joy';
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

    useEffect(() => {
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
        fetchActivePlans();
    },[userId])
    const handleSelectChange = (event, newValue) => {
        setFormType(newValue);
    }
    console.log(formType);
    return (
        <>
        <Typography level="h3" align="left">My Dashboard</Typography>
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
                    <Card >
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
                                            <Typography level="title-md">{addresses[plan.property] || '...'}</Typography>
                                        </Grid>
                                    </Grid>
                                    </AccordionSummary>
                                    <AccordionDetails variant="soft">
                                        <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                                            <Grid item xs={8}>
                                                <Card variant='outlined' size='sm' >
                                                    <Typography level="title-md" align="left">Service Description </Typography>
                                                    <Divider orientation="horizontal" flexitem="true" ></Divider>
                                                    <Typography level="body-md" align="left">{plan.service_description}</Typography>
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