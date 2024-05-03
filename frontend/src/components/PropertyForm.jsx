import  { useEffect, useState, useCallback } from 'react';
import { Typography, Card, Input, Grid, Select, Option, selectClasses, Button } from "@mui/joy";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import PropTypes from 'prop-types';
import api from '../api';
import Cookies from 'js-cookie';

const PropertyForm = ({ property, onDelete }) => {


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
        preferred_plan_type: "",
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
        floor_space: null,
        budget: null,
        budget_tolerance: null,
        budget_weight: null,
        frequency: null,
        frequency_weight: null,
    });
    const [propName, setPropName] = useState({
        address:"",
    }) 

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const lawnData = await api.getLawn(property.lawn);
                const internetData = await api.getInternet(property.internet);
                const interiorData = await api.getInterior(property.interior);
                const phoneData = await api.getPhone(property.phone);
                const propData = await api.getProperty(property.id);
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
                setPropName(
                    {
                        ...propData.data
                    } 
                );
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };
        fetchPropertyDetails();
    }, [property]); // Depend on the property object to refetch if it changes


    const persistChanges = async (apiMethod, propertyDetails, details) => {
        console.log(apiMethod);
        try {
            await api[apiMethod](propertyDetails, {
                ...details
            });
        } catch (error) {
            console.error('Error updating property details:', error);
        }
    };
    const handleInputChange = useCallback((event, setDetails) => {
        const { name, value } = event.target;
        setDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }, []);    
    const handleInputBlur = (event, propertyDetails, details, apiMethod) => {
        if (JSON.stringify(propertyDetails) !== JSON.stringify(details)) {
            persistChanges(apiMethod, propertyDetails, details);
        }
    };
    const handleDeleteProperty = () => {
        onDelete(property.id);
    };


    const handleNameUpdate = async (event, propertyId) => {
        try{
            const daAddy = propName.address;
            const userId = Cookies.get('user_id');

            await api.putProperty(propertyId, {
                address: daAddy,
                user: userId,


            });
        }catch (error) {
            console.error('Error updating property name:', error);
        }
       
    };


    return(
    

    
    <Card size="sm" variant='soft'  sx={{
        border: '2px solid',
        borderColor: 'divider',
        borderRadius: '5px', 
     }}>
        <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
            <Grid item xs={10.75}>
                <Input
                    onChange={(event) => handleInputChange(event, setPropName)}
                    onBlur={(event) => handleNameUpdate(event, property.id) }
                    variant='outlined'
                    name="address"
                    placeholder='Address'
                    value={propName.address}
                    size='lg'
                    
                />
            </Grid>
            <Grid item xs={1.25}>
                <Button variant="solid" color="danger" size='sm' onClick={handleDeleteProperty} >Delete</Button>
            </Grid>
            
            <Grid item xs={6}>
                <Card size="sm">
                    <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
                        <Grid item xs={9}>
                            <Typography align="left" level="title-lg">Lawn</Typography>
                        </Grid>
                        
                    </Grid>
                        <Input
                            onChange={(event) => handleInputChange(event, setLawnDetails)}
                            onBlur={(event) => handleInputBlur(event,  property.lawn, lawnDetails, 'putLawn')}
                            variant="soft"
                            size='sm'
                            placeholder='0.0'
                            name='lawn_size'
                            value={lawnDetails.lawn_size}
                            endDecorator={
                                <Typography variant="body2">ft<sup>2</sup></Typography>
                            }
                            startDecorator={
                                <Typography level="body-sm">Lawn Size:</Typography>
                            }
                        />
                        <Input
                            onChange={(event) => handleInputChange(event, setLawnDetails)}
                            onBlur={(event) => handleInputBlur(event,   property.lawn, lawnDetails, 'putLawn')}                             variant="soft"
                            size='sm'
                            placeholder='0.0'
                            name='budget'
                            value={lawnDetails.budget}
                            endDecorator={
                                <Typography variant="body2">$</Typography>
                            }
                            startDecorator={
                                <Typography level="body-sm">Budget:</Typography>
                            }
                        />
                        <Input
                            onChange={(event) => handleInputChange(event, setLawnDetails)}
                            onBlur={(event) => handleInputBlur(event,   property.lawn, lawnDetails, 'putLawn')}                             variant="soft"
                            placeholder='0.0'
                            name='budget_tolerance'
                            value={lawnDetails.budget_tolerance}
                            size='sm'                                        
                            endDecorator={
                                <Typography variant="body2">%</Typography>
                            }
                            startDecorator={
                                <Typography level="body-sm">Budget Tolerance:</Typography>
                            }
                        />
                        <Input
                            onChange={(event) => handleInputChange(event, setLawnDetails)}
                            onBlur={(event) => handleInputBlur(event,   property.lawn, lawnDetails, 'putLawn')}                             variant="soft"
                            placeholder='0.0'
                            name='budget_weight'
                            value={lawnDetails.budget_weight}
                            size='sm'                                         
                            endDecorator={
                                <Typography variant="body2">%</Typography>
                            }
                            startDecorator={
                                <Typography level="body-sm">Budget Weight:</Typography>
                            }
                        />
                        <Input
                            onChange={(event) => handleInputChange(event, setLawnDetails)}
                             onBlur={(event) => handleInputBlur(event,   property.lawn, lawnDetails, 'putLawn')}                            value={lawnDetails.frequency}
                             variant="soft"
                            placeholder='0'
                            name='frequency'
                            size='sm'                                       
                            endDecorator={
                                <Typography variant="body2">per month</Typography>
                            }
                            startDecorator={
                                <Typography level="body-sm">Frequency:</Typography>
                            }
                        />
                        <Input
                            onChange={(event) => handleInputChange(event, setLawnDetails)}
                            value={lawnDetails.frequency_weight}
                             onBlur={(event) => handleInputBlur(event,   property.lawn, lawnDetails, 'putLawn')}                             variant="soft"
                            placeholder='0.0'
                            name='frequency_weight'
                            size='sm'                                          
                            endDecorator={
                                <Typography variant="body2">%</Typography>
                            }
                            startDecorator={
                                <Typography level="body-sm">Frequency Weight:</Typography>
                            }
                        />
                </Card>
            </Grid>
            <Grid item xs={6}>
            <Card size="sm">
                    <Typography align="left" level="title-lg">Interior</Typography>                        
                    <Input
                        onChange={(event) => handleInputChange(event, setInteriorDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.interior, interiorDetails, 'putInterior')}
                        value={interiorDetails.floor_space}
                         variant="soft"
                        size='sm'
                        placeholder='0.0'
                        name='floor_space'
                        endDecorator={
                            <Typography variant="body2">ft<sup>2</sup></Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Interior Size:</Typography>
                        }
                    />

                    <Input
                        onChange={(event) => handleInputChange(event, setInteriorDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.interior, interiorDetails, 'putInterior')}
                        value={interiorDetails.budget}
                         variant="soft"
                        size='sm'
                        placeholder='0.0'
                        name='budget'
                        endDecorator={
                            <Typography variant="body2">$</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Budget:</Typography>
                        }
                    />
                    <Input
                        onChange={(event) => handleInputChange(event, setInteriorDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.interior, interiorDetails, 'putInterior')}
                        value={interiorDetails.budget_tolerance}
                         variant="soft"
                        placeholder='0.0'
                        name='budget_tolerance'
                        size='sm'                                           
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Budget Tolerance:</Typography>
                        }
                    />
                    <Input
                        onChange={(event) => handleInputChange(event, setInteriorDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.interior, interiorDetails, 'putInterior')}
                        value={interiorDetails.budget_weight}
                         variant="soft"
                        placeholder='0.0'
                        name='budget_weight'
                        size='sm'                                          
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Budget Weight:</Typography>
                        }
                    />
                    <Input
                        onChange={(event) => handleInputChange(event, setInteriorDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.interior, interiorDetails, 'putInterior')}
                        value={interiorDetails.frequency}
                         variant="soft"
                        placeholder='0'
                        size='sm'
                        name='frequency'
                        endDecorator={
                            <Typography variant="body2">per month</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Frequency:</Typography>
                        }
                    />
                    <Input
                        onChange={(event) => handleInputChange(event, setInteriorDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.interior, interiorDetails, 'putInterior')}
                        value={interiorDetails.frequency_weight}
                         variant="soft"
                        placeholder='0.0'
                        name='frequency_weight'
                        size='sm'
                                                                
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Frequency Weight</Typography>
                        }
                    />
        
                </Card>
            </Grid>
            

            <Grid item xs={6}>
                <Card size="sm" variant="outlined">
                    <Typography align="left" level="title-lg">Internet</Typography>     
                    <Input
                        onChange={(event) => handleInputChange(event, setInternetDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.internet, internetDetails, 'putInternet')}                        value={internetDetails.users}
                         variant="soft"
                        size='sm'
                        placeholder='0'
                        name='users'
                        startDecorator={
                            <Typography level="body-sm">Devices:</Typography>
                        }
                    />
                    <Input
                        onChange={(event) => handleInputChange(event, setInternetDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.internet, internetDetails, 'putInternet')}                        value={internetDetails.users_weight}
                         variant="soft"
                        size='sm'
                        placeholder='0.0'
                        name='users_weight'
                        startDecorator={
                            <Typography level="body-sm">Device Weight:</Typography>
                        }
                        
                    />
                    <Input
                        onChange={(event) => handleInputChange(event, setInternetDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.internet, internetDetails, 'putInternet')}                        value={internetDetails.speed_requirements}
                         variant="soft"
                        size='sm'
                        placeholder='0'
                        name='speed_requirements'
                        endDecorator={
                            <Typography variant="body2">mb/s</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Preferred Speed:</Typography>
                        }
                    />     
                    <Input
                        onChange={(event) => handleInputChange(event, setInternetDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.internet, internetDetails, 'putInternet')}                        value={internetDetails.speed_tolerance}
                         variant="soft"
                        size='sm'
                        placeholder='0.0'
                        name='speed_tolerance'
                        startDecorator={
                            <Typography level="body-sm">Speed Tolerance:</Typography>
                        }
                    />    
                    <Input
                        onChange={(event) => handleInputChange(event, setInternetDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.internet, internetDetails, 'putInternet')}                        value={internetDetails.speed_weight}
                         variant="soft"
                        size='sm'
                        placeholder='0.0'
                        name='speed_weight'
                        startDecorator={
                            <Typography level="body-sm">Speed Weight:</Typography>
                        }
                    />                       
                    <Input
                        onChange={(event) => handleInputChange(event, setInternetDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.internet, internetDetails, 'putInternet')}                        value={internetDetails.budget}
                         variant="soft"
                        size='sm'
                        placeholder='0.0'
                        name='budget'
                        endDecorator={
                            <Typography variant="body2">$</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Budget:</Typography>
                        }
                    />
                    <Input
                        onChange={(event) => handleInputChange(event, setInternetDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.internet, internetDetails, 'putInternet')}                        value={internetDetails.budget_tolerance}
                         variant="soft"
                        size='sm'
                        placeholder='0.0'
                        name='budget_tolerance'
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Budget Tolerance:</Typography>
                        }
                    />
                    <Input
                        onChange={(event) => handleInputChange(event, setInternetDetails)}
                         onBlur={(event) => handleInputBlur(event,   property.internet, internetDetails, 'putInternet')}                        value={internetDetails.budget_weight}
                         variant="soft"
                        size='sm'
                        placeholder='0.0'
                        startDecorator={
                            <Typography level="body-sm">Budget Weight:</Typography>
                        }
                        name='budget_weight'
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                        
                    />
            </Card>
            </Grid>
            <Grid item xs={6}>
                <Card size="sm">
                    <Typography align="left" level="title-lg">Phones</Typography>
                    <Input
                        onChange={(event) => handleInputChange(event, setPhoneDetails)}
                        onBlur={(event) => handleInputBlur(event,   property.phone, phoneDetails, 'putPhone')}
                        value={phoneDetails.users}
                        variant="soft"
                        placeholder='0'
                        name='users'
                        size='sm'
                        startDecorator={
                            <Typography level="body-sm">Users:</Typography>
                        }
                    />
                    <Input
                        onChange={(event) => handleInputChange(event, setPhoneDetails)}
                        onBlur={(event) => handleInputBlur(event,   property.phone, phoneDetails, 'putPhone')}
                        value={phoneDetails.users_weight} 
                         variant="soft"
                        placeholder='0.0'
                        name='users_weight'
                        size='sm'
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Users Weight:</Typography>
                        }
                    />
                    <Select
                    
                        placeholder="Preferred Plan Type"
                        indicator={<KeyboardArrowDown />}
                        name='phonePreferredPlanType'
                        variant='soft'
                        size='sm'
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
                        onChange={(event) => handleInputChange(event, setPhoneDetails)}
                     
                        onBlur={(event) => handleInputBlur(event,   property.phone, phoneDetails, 'putPhone')}                        value={phoneDetails.plan_weight}
                         variant="soft"
                        size='sm'
                        placeholder='0.0'
                        name='plan_weight'
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Plan Weight:</Typography>
                        }
                    />
                    <Input
                        onChange={(event) => handleInputChange(event, setPhoneDetails)}
                     
                        onBlur={(event) => handleInputBlur(event,   property.phone, phoneDetails, 'putPhone')}                        value={phoneDetails.budget}
                        placeholder='0.0'
                        name='budget'
                         variant="soft"
                        size='sm'
                        endDecorator={
                            <Typography variant="body2">$</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Budget:</Typography>
                        }
                    />
                    <Input
                        onChange={(event) => handleInputChange(event, setPhoneDetails)}
                     
                        onBlur={(event) => handleInputBlur(event,   property.phone, phoneDetails, 'putPhone')}                        value={phoneDetails.budget_tolerance}
                         variant="soft"
                        size='sm'
                        placeholder='0.0'
                        name='budget_tolerance'
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Budget Tolerance:</Typography>
                        }
                    />
                    <Input
                        onChange={(event) => handleInputChange(event, setPhoneDetails)}
                     
                        onBlur={(event) => handleInputBlur(event,   property.phone, phoneDetails, 'putPhone')}                        
                        value={phoneDetails.budget_weight}
                        variant="soft"
                        size='sm'
                        placeholder='Budget Weight'
                        name='budget_weight'
                        endDecorator={
                            <Typography variant="body2">%</Typography>
                        }
                        startDecorator={
                            <Typography level="body-sm">Budget Weight:</Typography>
                        }
                    />
                </Card>
            </Grid> 
        
        </Grid>
    </Card>
    );
};
export default PropertyForm;
PropertyForm.propTypes = {
    property: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,

};