import  { useEffect, useState, useCallback } from 'react';
import { Button,Typography, Card, Input, Grid, Divider, Select, Option, selectClasses } from "@mui/joy";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from 'prop-types';
import api from '../api';

const PropertyForm = ({ property }) => {
    const [isLawnEditMode, setLawnEditMode] = useState(false);
    const [isInteriorEditMode, setInteriorEditMode] = useState(false);
    const [isPhoneEditMode, setPhoneEditMode] = useState(false);
    const [isInternetEditMode, setInternetEditMode] = useState(false);

    const [lawnDetails, setLawnDetails] = useState({
        lawn_size: null,
        budget: null,
        budget_tolerance: null,
        budget_weight: null,
        frequency: null,
        frequency_weight: null,
    });
    const [phoneDetails, setPhoneDetails] = useState({
        users: null,
        users_weight: null,
        preferred_plan_type: "unlimited",
        plan_weight: null,
        budget: null,
        budget_tolerance: null,
        budget_weight: null,
    });
    const [internetDetails, setInternetDetails] = useState({
        users: null,
        users_weight: null,
        speed_requirements: null,
        speed_tolerance: null,
        speed_weight: null,
        budget: null,
        budget_tolerance: null,
        budget_weight: null,
    });
    const [interiorDetails, setInteriorDetails] = useState({
        number_of_rooms: null,
        floor_space: null,
        budget: null,
        budget_tolerance: null,
        budget_weight: null,
        frequency: null,
        frequency_weight: null,
    });


    useEffect(() => {
        //populate form
        const fetchPropertyDetails = async () => {
            try {
                const lawnData = await api.getLawn(property.lawn);
                const internetData = await api.getInternet(property.internet);
                const interiorData = await api.getInterior(property.interior);
                const phoneData = await api.getPhone(property.phone);
                setLawnDetails({
                  ...lawnData.data
                });
                setInteriorDetails({
                  ...interiorData.data
                });
                setInternetDetails({
                  ...internetData.data
                });
                setPhoneDetails({
                  ...phoneData.data
                });
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchPropertyDetails();
    }, [property]); // Depend on the property object to refetch if it changes


    // Functions to persist the lawn, interior, phone, internet changes
    const persistLawnChanges = async () => {
        try {
            await api.putLawn(property.lawn, { 
                ...lawnDetails
            });
        } catch (error) {
            console.error('Error updating lawn changes:', error);
        }
    };

    const persistInteriorChanges = async () => {
        try{
            await api.putInterior(property.interior, 
            {
               ...interiorDetails
            });
        }catch (error) {
            console.error('Error updating property details:', error);
        }
    };

    const persistPhoneChanges = async () => {
        try{
            await api.putPhone(property.phone, {
                ...phoneDetails
            });
        }catch (error) {
            console.error('Error updating property details:', error);
        }
    };

    const persistInternetChanges = async () =>
    {
        try{
            await api.putInternet(property.internet, {
                ...internetDetails
            });
        }catch (error) {
            console.error('Error updating property details:', error);
        }
    };
    const handleLawnInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setLawnDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }, []); 

    const handleInteriorInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setInteriorDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }, []);
    const handlePhoneInputChange = useCallback((event) =>{
        const { name, value } = event.target;
        setPhoneDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }, []);
    const handleInternetInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setInternetDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }, []);
    const handleInputFocus = (event, sectionType) => {
        const { name, value } = event.target;
        setInitialValues(prevValues => ({
            ...prevValues,
            [sectionType]: {
                ...prevValues[sectionType],
                [name]: value
            }
        }));
        //   fix function to set the edit mode for each section
        setEditMode(sectionType, true);

    const handleInputBlur = (event, sectionType) => {
        const { name, value } = event.target;
        if (value === initialValues[sectionType][name]) {
            setEditMode(sectionType, false);
        }
    };
    return(
    

    
    <Card size="sm">
        <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
            <Grid item xs={9}>
                <Typography paddingTop="6px" align="left" level="title-lg">Property ID: {property.id}</Typography>
            </Grid>
            
            <Grid item xs={12}>
                <Card size="sm">
                    <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
                        <Grid item xs={9}>
                            <Typography align="left" level="title-lg">Lawn</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Button onClick={() => setLawnEditMode(prevMode => !prevMode)}>Edit</Button>
                        </Grid>
                    </Grid>
                        <Input
                            onChange={handleLawnInputChange}
                            onFocus={() => setLawnEditMode(true)}
                            variant="soft"
                            size='md'
                            placeholder='Lawn Size'
                            name='lawn_size'
                            value={lawnDetails.lawn_size}
                            endDecorator={
                                <Typography variant="body2">ft<sup>2</sup></Typography>
                            }
                        />
                        <Input
                            onChange={handleLawnInputChange}
                            onFocus={() => setLawnEditMode(true)}
                            variant="outlined"
                            size='md'
                            placeholder='Budget'
                            name='budget'
                            value={lawnDetails.budget}
                            endDecorator={
                                <Typography variant="body2">$</Typography>
                            }
                        />
                        <Input
                            onChange={handleLawnInputChange}
                            onFocus={() => setLawnEditMode(true)}
                            variant="outlined"
                            placeholder='Budget Tolerance'
                            name='budget_tolerance'
                            value={lawnDetails.budget_tolerance}
                            size='md'                                        
                            endDecorator={
                                <Typography variant="body2">%</Typography>
                            }
                        />
                        <Input
                            onChange={handleLawnInputChange}
                            onFocus={() => setLawnEditMode(true)}
                            variant="outlined"
                            placeholder='Budget Weight'
                            name='budget_weight'
                            value={lawnDetails.budget_weight}
                            size='md'                                         
                            endDecorator={
                                <Typography variant="body2">%</Typography>
                            }
                        />
                        <Input
                            onChange={handleLawnInputChange}
                            onFocus={() => setLawnEditMode(true)}
                            value={lawnDetails.frequency}
                            variant="outlined"
                            placeholder='Frequency'
                            name='frequency'
                            size='md'                                       
                            endDecorator={
                                <Typography variant="body2">per month</Typography>
                            }
                        />
                        <Input
                            onChange={handleLawnInputChange}
                            value={lawnDetails.frequency_weight}
                            onFocus={() => setLawnEditMode(true)}
                            variant="outlined"
                            placeholder='Frequency Weight'
                            name='frequency_weight'
                            size='md'                                          
                            endDecorator={
                                <Typography variant="body2">%</Typography>
                            }
                        />
                    {isLawnEditMode ? <Button onClick={persistLawnChanges}> Save</Button> : <></>}
                    <Divider></Divider>
                    <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
                        <Grid item xs={9}>
                            <Typography align="left" level="title-lg">Phones</Typography>
                        </Grid>
                        <Grid item xs={3}>
                        <Button onClick={() => setPhoneEditMode(prevMode => !prevMode)}>Edit</Button>

                        </Grid>
                    </Grid>                    
                    <Input
                        onChange={handlePhoneInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        variant='outlined'
                        placeholder='Users'
                        name='Users'
                        value={phoneDetails.users}
                        size='md'
                    />
                    <Input
                        onChange={handlePhoneInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={phoneDetails.users_weight} 
                        variant='outlined'
                        placeholder='User Weight'
                        name='users_weight'
                        size='md'
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    <Select
                    
                        placeholder="Preferred Plan Type"
                        indicator={<KeyboardArrowDown />}
                        name='phonePreferredPlanType'
                        //defaultValue={phoneDetails.data.preferred_plan_type}
                        sx={{
                            [`& .${selectClasses.indicator}`]: {
                            transition: '0.2s',
                            [`&.${selectClasses.expanded}`]: {
                                transform: 'rotate(-180deg)',
                            },
                            },
                        }}
                    >
                        <Option value="prepaid">Prepaid</Option>
                        <Option value="postpaid">Postpaid</Option>
                        <Option value="unlimited">Unlimited</Option>
                    </Select>
                    <Input
                        onChange={handlePhoneInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={phoneDetails.plan_weight}
                        variant="outlined"
                        size='md'
                        placeholder='Plan Weight'
                        name='plan_weight'
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    <Input
                        onChange={handlePhoneInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={phoneDetails.budget}
                        placeholder='Budget'
                        name='budget'
                        variant="outlined"
                        size='md'
                        endDecorator={
                            <Typography variant="body2">$</Typography>
                        }
                    />
                    <Input
                        onChange={handlePhoneInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={phoneDetails.budget_tolerance}
                        variant="outlined"
                        size='md'
                        placeholder='Budget Tolerance'
                        name='budget_tolerance'
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    <Input
                        onChange={handlePhoneInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={phoneDetails.budget_weight}
                        variant="outlined"
                        size='md'
                        placeholder='Budget Weight'
                        name='budget_weight'
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    {isPhoneEditMode ? <Button onClick={persistPhoneChanges}> Save</Button> : <></>}

                    <Divider></Divider>

                    <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
                        <Grid item xs={9}>
                            <Typography align="left" level="title-lg">Internet</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Button onClick={() => setInternetEditMode(prevMode => !prevMode)}>Edit</Button>
                        </Grid>
                    </Grid>       
                    <Input
                        onChange={handleInternetInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={internetDetails.users}
                        variant='outlined'
                        size='md'
                        placeholder='Devices'
                        name='users'
                    />
                    <Input
                        onChange={handleInternetInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={internetDetails.users_weight}
                        variant='outlined'
                        size='md'
                        placeholder='Device Weight'
                        name='users_weight'
                    />
                    <Input
                        onChange={handleInternetInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={internetDetails.speed_requirements}
                        variant="outlined"
                        size='md'
                        placeholder='Preferred Speed:'
                        name='speed_requirements'
                        endDecorator={
                            <Typography variant="body2">mb/s</Typography>
                        }
                    />     
                    <Input
                        onChange={handleInternetInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={internetDetails.speed_tolerance}
                        variant='outlined'
                        size='md'
                        placeholder='Speed Tolerance'
                        name='speed_tolerance'
                    />    
                    <Input
                        onChange={handleInternetInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={internetDetails.speed_weight}
                        variant='outlined'
                        size='md'
                        placeholder='Speed Weight'
                        name='speed_weight'
                    />                       
                    <Input
                        onChange={handleInternetInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={internetDetails.budget}
                        variant="outlined"
                        size='md'
                        placeholder='Budget'
                        name='budget'
                        endDecorator={
                            <Typography variant="body2">$</Typography>
                        }
                    />
                    <Input
                        onChange={handleInternetInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={internetDetails.budget_tolerance}
                        variant="outlined"
                        size='md'
                        placeholder='Budget Tolerance'
                        name='budget_tolerance'
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    <Input
                        onChange={handleInternetInputChange}
                        onFocus={() => setLawnEditMode(true)}
                        value={internetDetails.budget_weight}
                        variant="outlined"
                        size='md'
                        placeholder='Budget Weight'
                        name='budget_weight'
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    {isInternetEditMode ? <Button onClick={persistInternetChanges}> Save</Button> : <></>}

                    <Divider></Divider>
                    <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
                        <Grid item xs={9}>
                            <Typography align="left" level="title-lg">Interior</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Button onClick={() => setInteriorEditMode(prevMode => !prevMode)}>Edit</Button>
                        </Grid>
                    </Grid>                         
                    <Input
                        onChange={handleInteriorInputChange}
                        value={interiorDetails.floor_space}
                        variant="outlined"
                        size='md'
                        placeholder='Size'
                        name='floor_space'
                        endDecorator={
                            <Typography variant="body2">ft<sup>2</sup></Typography>
                        }
                    />
                    <Input
                        onChange={handleInteriorInputChange}
                        value={interiorDetails.number_of_rooms}
                        variant="outlined"
                        size='md'
                        placeholder='Number of Rooms'
                        name='number_of_rooms'
                    />
                    <Input
                        onChange={handleInteriorInputChange}
                        value={interiorDetails.budget}
                        variant="outlined"
                        size='md'
                        placeholder='Budget'
                        name='budget'
                        endDecorator={
                            <Typography variant="body2">$</Typography>
                        }
                    />
                    <Input
                        onChange={handleInteriorInputChange}
                        value={interiorDetails.budget_tolerance}
                        variant="outlined"
                        placeholder='Budget Tolerance'
                        name='budget_tolerance'
                        size='md'                                           
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    <Input
                        onChange={handleInteriorInputChange}
                        value={interiorDetails.budget_weight}
                        variant="outlined"
                        placeholder='Budget Weight'
                        name='budget_weight'
                        size='md'                                          
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    <Input
                        onChange={handleInteriorInputChange}
                        value={interiorDetails.frequency}
                        variant="outlined"
                        placeholder='Frequency'
                        size='md'
                        name='frequency'
                        endDecorator={
                            <Typography variant="body2">per month</Typography>
                        }
                    />
                    <Input
                        onChange={handleInteriorInputChange}
                        value={interiorDetails.frequency_weight}
                        variant="outlined"
                        placeholder='Frequency Weight'
                        name='frequency_weight'
                        size='md'
                                                                
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    {isInteriorEditMode ? <Button onClick={persistInteriorChanges}> Save</Button> : <></>}

                </Card>
            </Grid>
        </Grid>
    </Card>
    );
};
export default PropertyForm;
PropertyForm.propTypes = {
    property: PropTypes.object.isRequired
};