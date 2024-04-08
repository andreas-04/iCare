import  { useEffect, useState } from 'react';
import { Button,Typography, Card, Input, Grid, Divider, Select, Option, selectClasses } from "@mui/joy";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from 'prop-types';
import api from '../api';

const PropertyForm = ({ property }) => {
    const [details, setDetails] = useState({
        lawn:{
            lawnSize: '',
            lawnBudget: '',
            lawnBudgetTolerance: '',
            lawnBudgetWeight: '',
            lawnFrequency: '',
            lawnFrequencyWeight: '',
        },

        phone:{
            phoneUsers: '',
            phoneUsersWeight: '',
            phonePreferredPlanType: '',
            phonePlanWeight: '',
            phoneBudget: '',
            phoneBudgetTolerance: '',
            phoneBudgetWeight: '',
    
        },
        internet:{
            internetUsers: '',
            internetUsersWeight: '',
            internetSpeed: '',
            internetSpeedTolerance: '',
            internetSpeedWeight: '',
            internetBudget: '',
            internetBudgetTolerance: '',
            internetBudgetWeight: '',
        },
        interior:{
            interiorNumRooms: '',
            interiorSize: '',
            interiorBudget: '',
            interiorBudgetTolerance: '',
            interiorBudgetWeight: '',
            interiorFrequency: '',
            interiorFrequencyWeight: '',
        }
    });

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const lawnData = await api.getLawn(property.lawn);
                const internetData = await api.getInternet(property.internet);
                const interiorData = await api.getInterior(property.interior);
                const phoneData = await api.getPhone(property.phone);
                setDetails(prevDetails => ({
                    ...prevDetails,
                    lawn: {
                        ...prevDetails.lawn,
                        lawnSize: lawnData.data.lawn_size || prevDetails.lawn.lawnSize,
                        lawnBudget: lawnData.data.budget || prevDetails.lawn.lawnBudget,
                        lawnBudgetTolerance: lawnData.data.budget_tolerance || prevDetails.lawn.lawnBudgetTolerance,
                        lawnBudgetWeight: lawnData.data.budget_weight || prevDetails.lawn.lawnBudgetWeight,
                        lawnFrequency: lawnData.data.frequency || prevDetails.lawn.lawnFrequency,
                        lawnFrequencyWeight: lawnData.data.frequency_weight || prevDetails.lawn.lawnFrequencyWeight,
                    },
                    internet: {
                        ...prevDetails.internet,
                        internetSpeed: internetData.internetSpeed || prevDetails.internet.internetSpeed,
                        internetUsers: internetData.internetUsers || prevDetails.internet.internetUsers,
                        internetUsersWeight: internetData.internetUsersWeight || prevDetails.internet.internetUsersWeight,
                        internetSpeedTolerance: internetData.internetSpeedTolerance || prevDetails.internet.internetSpeedTolerance,
                        internetSpeedWeight: internetData.internetSpeedWeight || prevDetails.internet.internetSpeedWeight,
                        internetBudget: internetData.internetBudget || prevDetails.internet.internetBudget,
                        internetBudgetTolerance: internetData.internetBudgetTolerance || prevDetails.internet.internetBudgetTolerance,
                        internetBudgetWeight: internetData.internetBudgetWeight || prevDetails.internet.internetBudgetWeight,
                    },
                    interior: {
                        ...prevDetails.interior,
                        interiorSize: interiorData.interiorSize || prevDetails.interior.interiorSize,
                        interiorNumRooms: interiorData.interiorNumRooms || prevDetails.interior.interiorNumRooms,
                        interiorBudget: interiorData.interiorBudget || prevDetails.interior.interiorBudget,
                        interiorBudgetTolerance: interiorData.interiorBudgetTolerance || prevDetails.interior.interiorBudgetTolerance,
                        interiorBudgetWeight: interiorData.interiorBudgetWeight || prevDetails.interior.interiorBudgetWeight,
                        interiorFrequency: interiorData.interiorFrequency || prevDetails.interior.interiorFrequency,
                        interiorFrequencyWeight: interiorData.interiorFrequencyWeight || prevDetails.interior.interiorFrequencyWeight,
                    },
                    phone: {
                        ...prevDetails.phone,
                        phoneUsers: phoneData.phoneUsers || prevDetails.phone.phoneUsers,
                        phoneUsersWeight: phoneData.phoneUsersWeight || prevDetails.phone.phoneUsersWeight,
                        phonePreferredPlanType: phoneData.phonePreferredPlanType || prevDetails.phone.phonePreferredPlanType,
                        phonePlanWeight: phoneData.phonePlanWeight || prevDetails.phone.phonePlanWeight,
                        phoneBudget: phoneData.phoneBudget || prevDetails.phone.phoneBudget,
                        phoneBudgetTolerance: phoneData.phoneBudgetTolerance || prevDetails.phone.phoneBudgetTolerance,
                        phoneBudgetWeight: phoneData.phoneBudgetWeight || prevDetails.phone.phoneBudgetWeight,
                    },
                }));
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchPropertyDetails();
    }, [property]); // Depend on the property object to refetch if it changes

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(`Input name: ${name}, value: ${value}`);
    
        // Split the name into parts to determine the nested structure
        const parts = name.split('.');
        const key = parts[0]; // The first part is the key of the nested object
        const subKey = parts[1]; // The second part is the key of the property within the nested object
    
    
        // Update the nested structure
        setDetails(prevDetails => {
            const updatedDetails = {
                ...prevDetails,
                [key]: {
                    ...prevDetails[key],
                    [subKey]: value
                }
            };
            return updatedDetails;
        });
    };
    // Function to persist the changes
    const persistChanges = async () => {
        // Example: Update the lawn size
        try {
            await api.putLawn(property.lawnId, { lawn_size: details.lawnSize });
            console.log('Lawn size updated successfully');
            // Repeat for other fields as needed
        } catch (error) {
            console.error('Error updating property details:', error);
        }
    };
    // if (!details.lawnSize || !details.internetSpeed || !details.interiorSize || !details.phoneUsers) {
    //     return <div>Loading...</div>; // Or any loading indicator you prefer
    // }
    console.log(details);
    return(
    <Card size="sm">
        <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
            <Grid item xs={9}>
                <Typography paddingTop="6px" align="left" level="title-lg">Property ID: {property.id}</Typography>
            </Grid>
            
            <Grid item xs={12}>
                <Card size="sm">
                    <Typography align="left" level="title-lg">Lawn</Typography>
                
                        <Input
                            onChange={handleInputChange}
                            variant="outlined"
                            size='md'
                            placeholder='Lawn Size'
                            name='lawn.lawnSize'
                            value={details.lawn.lawnSize}
                            endDecorator={
                                <Typography variant="body2">ft<sup>2</sup></Typography>
                            }
                        />
                        <Input
                            onChange={handleInputChange}
                            variant="outlined"
                            size='md'
                            placeholder='Budget'
                            name='lawnBudget'
                            value={details.lawn.lawnBudget}
                            endDecorator={
                                <Typography variant="body2">$</Typography>
                            }
                        />
                        <Input
                            onChange={handleInputChange}
                            variant="outlined"
                            placeholder='Budget Tolerance'
                            name='lawnBudgetTolerance'
                            value={details.lawn.lawnBudgetTolerance}
                            size='md'                                        
                            endDecorator={
                                <Typography variant="body2">%</Typography>
                            }
                        />
                        <Input
                            onChange={handleInputChange}
                            variant="outlined"
                            placeholder='Budget Weight'
                            name='lawnBudgetWeight'
                            // defaultValue={lawnDetails.data.budget_weight}
                            value={details.lawn.lawnBudgetWeight}
                            size='md'                                         
                            endDecorator={
                                <Typography variant="body2">%</Typography>
                            }
                        />
                        <Input
                            onChange={handleInputChange}
                            value={details.lawn.lawnFrequency}
                            variant="outlined"
                            placeholder='Frequency'
                            name='lawnFrequency'
                            //defaultValue={lawnDetails.data.frequency}
                            size='md'                                       
                            endDecorator={
                                <Typography variant="body2">per month</Typography>
                            }
                        />
                        <Input
                            onChange={handleInputChange}
                            value={details.lawn.lawnFrequencyWeight}
                            variant="outlined"
                            placeholder='Frequency Weight'
                            name='lawnFrequencyWeight'
                            //defaultValue={lawnDetails.data.frequency_weight}
                            size='md'                                          
                            endDecorator={
                                <Typography variant="body2">%</Typography>
                            }
                        />

                    <Divider></Divider>
                    <Typography align="left" level="title-lg">Phones</Typography>
                    <Input
                    onChange={handleInputChange}
                        variant='outlined'
                        placeholder='Users'
                        name='phoneUsers'
                        value={details.phone.phoneUsers}
                        //defaultValue={phoneDetails.data.users}
                        size='md'
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.phone.phoneUsersWeight} 
                        variant='outlined'
                        placeholder='User Weight'
                        name='phoneUsersWeight'
                        //defaultValue={phoneDetails.data.users_weight}
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
                        onChange={handleInputChange}
                        value={details.phone.phonePlanWeight}
                        variant="outlined"
                        size='md'
                        placeholder='Plan Weight'
                        name='phonePlanWeight'
                        //defaultValue={phoneDetails.data.plan_weight}
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.phone.phoneBudget}
                        placeholder='Budget'
                        name='phoneBudget'
                        //defaultValue={phoneDetails.data.budget}
                        variant="outlined"
                        size='md'
                        endDecorator={
                            <Typography variant="body2">$</Typography>
                        }
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.phone.phoneBudgetTolerance}
                        variant="outlined"
                        size='md'
                        placeholder='Budget Tolerance'
                        name='phoneBudgetTolerance'
                        //defaultValue={phoneDetails.data.budget_tolerance}
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.phone.phoneBudgetWeight}
                        variant="outlined"
                        size='md'
                        placeholder='Budget Weight'
                        name='phoneBudgetWeight'
                        //defaultValue={phoneDetails.data.budget_weight}
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    <Divider></Divider>
                    <Typography align="left" level="title-lg">Internet</Typography>
                    <Input
                        onChange={handleInputChange}
                        value={details.internet.internetUsers}
                        variant='outlined'
                        size='md'
                        placeholder='Devices'
                        name='internetUsers'
                        //defaultValue={internetDetails.data.users}
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.internet.internetUsersWeight}
                        variant='outlined'
                        size='md'
                        placeholder='Device Weight'
                        name='internetUsersWeight'
                        //defaultValue={internetDetails.data.users_weight}
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.internet.internetSpeed}
                        variant="outlined"
                        size='md'
                        placeholder='Preferred Speed:'
                        name='internetSpeed'
                        //defaultValue={internetDetails.data.speed_requirements}
                        endDecorator={
                            <Typography variant="body2">mb/s</Typography>
                        }
                    />     
                    <Input
                        onChange={handleInputChange}
                        value={details.internet.internetSpeedTolerance}
                        variant='outlined'
                        size='md'
                        placeholder='Speed Tolerance'
                        name='internetSpeedTolerance'
                        //defaultValue={internetDetails.data.speed_tolerance}
                    />    
                    <Input
                        onChange={handleInputChange}
                        value={details.internet.internetSpeedWeight}
                        variant='outlined'
                        size='md'
                        placeholder='Speed Weight'
                        name='internetSpeedWeight'
                        //defaultValue={internetDetails.data.speed_weight}
                    />                       
                    <Input
                        onChange={handleInputChange}
                        value={details.internet.internetBudget}
                        variant="outlined"
                        size='md'
                        placeholder='Budget'
                        name='internetBudget'
                        //defaultValue={internetDetails.data.budget}
                        endDecorator={
                            <Typography variant="body2">$</Typography>
                        }
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.internet.internetBudgetTolerance}
                        variant="outlined"
                        size='md'
                        placeholder='Budget Tolerance'
                        name='internetBudgetTolerance'
                        //defaultValue={internetDetails.data.budget_tolerance}
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.internet.internetBudgetWeight}
                        variant="outlined"
                        size='md'
                        placeholder='Budget Weight'
                        name='internetBudgetWeight'
                        //defaultValue={internetDetails.data.budget_weight}
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />

                    <Divider></Divider>
                    <Typography align="left" level="title-lg">Interior</Typography>
                    <Input
                        onChange={handleInputChange}
                        value={details.interior.interiorSize}
                        variant="outlined"
                        size='md'
                        placeholder='Size'
                        name='interiorSize'
                        //defaultValue={interiorDetails.data.floor_space}
                        endDecorator={
                            <Typography variant="body2">ft<sup>2</sup></Typography>
                        }
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.interior.interiorNumRooms}
                        variant="outlined"
                        size='md'
                        placeholder='Number of Rooms'
                        name='interiorNumRooms'
                        //defaultValue={interiorDetails.data.number_of_rooms}
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.interior.interiorBudget}
                        variant="outlined"
                        size='md'
                        placeholder='Budget'
                        name='interiorBudget'
                        //defaultValue={interiorDetails.data.budget}
                        endDecorator={
                            <Typography variant="body2">$</Typography>
                        }
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.interior.interiorBudgetTolerance}
                        variant="outlined"
                        placeholder='Budget Tolerance'
                        name='interiorBudgetTolerance'
                        //defaultValue={interiorDetails.data.budget_tolerance}
                        size='md'                                           
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.interior.interiorBudgetWeight}
                        variant="outlined"
                        placeholder='Budget Weight'
                        name='interiorBudgetWeight'
                        //defaultValue={interiorDetails.data.budget_weight}
                        size='md'                                          
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.interior.interiorFrequency}
                        variant="outlined"
                        placeholder='Frequency'
                        size='md'
                        name='interiorFrequency'
                        //defaultValue={interiorDetails.data.frequency}
                        endDecorator={
                            <Typography variant="body2">per month</Typography>
                        }
                    />
                    <Input
                        onChange={handleInputChange}
                        value={details.interior.interiorFrequencyWeight}
                        variant="outlined"
                        placeholder='Frequency Weight'
                        name='interiorFrequencyWeight'
                        //defaultValue={interiorDetails.data.frequency_weight}
                        size='md'
                                                                
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                    />
                                <Button onClick={persistChanges}>Save Changes</Button>
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