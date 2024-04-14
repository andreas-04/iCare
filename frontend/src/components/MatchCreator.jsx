import { Typography, Table, Grid, Card, Divider, List, ListItem, ListItemDecorator, ListDivider, Chip, Checkbox, Button } from '@mui/joy';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import { useState, useEffect } from 'react';
import api from '../api';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const MatchCreator = ({propertyId}) => {
    propertyId = 26;
    const userId = Cookies.get('user_id'); // Assuming 'userId' is the name of the cookie
    const[interestedIn, setInterestedIn] = useState({
        user: userId,
        interestedInLawn: false,
        interestedInInterior: false,
        interestedInPhone: false,
        interestedInInternet: false,
    })
    const [matches, setMatches] = useState({});
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setInterestedIn(prevState => ({
            ...prevState,
            [name]: checked
        }));
        
        api.putProperty(propertyId, interestedIn)
        .then(response => {
            console.log("Property updated successfully:", response);
        })
        .catch(error => {
            console.error("Error updating property:", error);
        });
    };
    const handleCheckboxBlur = () =>  {
        api.putProperty(propertyId, interestedIn)
        .then(response => {
            console.log("Property updated successfully:", response);
        })
        .catch(error => {
            console.error("Error updating property:", error);
        });

    }
    const genenerateMatchez = () => {
        if(interestedIn.interestedInLawn){
            api.getLawnMatches(propertyId)
            .then(response => {
                setMatches(prevMatches => ({...prevMatches, ...response.data}));
            }).catch(error => {
                console.error('Error fetching properties:', error);
            });
        }
        if(interestedIn.interestedInInterior){
            console.log("here");
            api.getInteriorMatches(propertyId)
            .then(response => {
                setMatches(prevMatches => ({...prevMatches, ...response.data}));
            }).catch(error => {
                console.error('Error fetching properties:', error);
            });
   
        }
        if(interestedIn.interestedInPhone){
            api.getPhoneMatches(propertyId)
            .then(response => {
                setMatches(prevMatches => ({...prevMatches, ...response.data}));
            }).catch(error => {
                console.error('Error fetching properties:', error);
            });

        }
        if(interestedIn.interestedInInternet){
            api.getInternetMatches(propertyId)
            .then(response => {
                setMatches(prevMatches => ({...prevMatches, ...response.data}));
            }).catch(error => {
                console.error('Error fetching properties:', error);
            });
        }

    }
    console.log(matches);
    useEffect(() => {
        //set interested in
        const fetchInterestedIn = async () =>{
            try{
                const propertyData = await api.getProperty(propertyId);
                // console.log(propertyData.data);
                setInterestedIn({
                    ...propertyData.data
                });
            }catch(error){
                console.log("error fetching property", error);
            }
        }
        fetchInterestedIn();
    }, [propertyId]);
    
    return(
        <>
            <Typography textAlign="left" level='h3' >Match Maker</Typography>
            <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                <Grid item xs={2.5}>
                    <Card size='sm'>
                        <Typography level="title-lg" align="left">Interested In:</Typography>
                        <Divider></Divider>
                        <List size="sm">
                            <ListItem>
                                <Checkbox                            
                                    name='interestedInLawn'
                                    checked={interestedIn.interestedInLawn}  
                                    label="Lawn Services"
                                    onChange={handleCheckboxChange}
                                    onBlur={handleCheckboxBlur}

                                />
                            </ListItem>
                            <ListItem>
                                <Checkbox
                                    name='interestedInInterior'
                                    checked={interestedIn.interestedInInterior}  
                                    label="Interior Services"
                                    onChange={handleCheckboxChange}
                                    onBlur={handleCheckboxBlur}
                                />

                            </ListItem>
                            <ListItem>
                                <Checkbox 
                                    name='interestedInPhone'
                                    checked={interestedIn.interestedInPhone}  
                                    label="Phone Services" 
                                    onChange={handleCheckboxChange}
                                    onBlur={handleCheckboxBlur}
                                />
                            </ListItem>
                            <ListItem>
                                <Checkbox                            
                                    name='interestedInInternet'
                                    checked={interestedIn.interestedInInternet}  
                                    label="Internet Services"
                                    onChange={handleCheckboxChange}
                                    onBlur={handleCheckboxBlur}/>
                            </ListItem>

                        </List>
                        <Divider></Divider>
                        <Button size='sm' onClick={genenerateMatchez}>Generate Matches</Button>
                    </Card>
                </Grid>
                <Grid item xs={9.5}>
                    <Card >
                        {/* <Table aria-label="basic table" size='md'>
                            <thead>
                                <tr>
                                <th style={{ width: '35%' }}>Service Name</th>
                                <th style={{ width: '25%' }}>Service Type</th>
                                <th style={{ width: '24%' }}>Business Name</th>
                                <th>Date</th>
                                </tr>
                            </thead>
                        </Table> */}
                        <AccordionGroup
                        variant="plain"
                        transition="0.2s"
                        sx={{
                            // maxWidth: 400,
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
                            <Accordion>
                                <AccordionSummary>
                                <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                                    <Grid item xs={4.5}>
                                        <Typography>Lawn mowing and hedge trimming</Typography>
                                    </Grid>
                                    <Grid item xs={3.3}>
                                        <Typography>Lawn Care</Typography>
                                    </Grid>
                                    <Grid item xs={3.25}>
                                        <Typography>Mikeys Odd Jobs</Typography>
                                    </Grid>
                                    <Grid item xs={.5}>
                                        <Typography>3/2/24</Typography>
                                    </Grid>
                                </Grid>
                                </AccordionSummary>
                                <AccordionDetails variant="soft">
                                    <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                                        <Grid item xs={9}>
                                            <Card variant='outlined' >
                                                <Typography level="title-md" align="left">Service Description </Typography>
                                                <Divider orientation="horizontal" flexitem="true" ></Divider>
                                                <Typography level="body-md" align="left">Transform your outdoor space with our expert lawn mowing and hedge trimming services, tailored to enhance the beauty and health of your property. Our skilled team provides meticulous lawn mowing, ensuring a uniform and well-manicured appearance that instantly boosts curb appeal. Additionally, our hedge trimming service shapes and maintains your hedges with precision, creating clean lines and defined borders that elevate the overall aesthetic of your landscape. With our attention to detail and commitment to quality, you can trust us to keep your outdoor space looking its best year-round.</Typography>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Card>
                                                <List aria-labelledby="decorated-list-demo">
                                                    <ListItem>
                                                    <ListItemDecorator>💰</ListItemDecorator> <Typography align="right"> $37.99</Typography>
                                                    </ListItem>
                                                    <ListDivider inset="gutter" />
                                                    <ListItem>
                                                    <ListItemDecorator>🗓️</ListItemDecorator> Bi-Monthly Billing
                                                    </ListItem>
                                                </List>
                                                <Grid container >
                                                    <Grid item xs={6}>
                                                    <Chip
                                                        color="success"
                                                        variant="soft"
                                                    >Accept</Chip>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Chip
                                                            color="danger"
                                                            variant="soft"
                                                        >Decline</Chip>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        <Accordion>
                            <AccordionSummary>
                                <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                                    <Grid item xs={4.5}>
                                        <Typography>1gb Internet Plan</Typography>
                                    </Grid>
                                    <Grid item xs={3.3}>
                                        <Typography>Internet</Typography>
                                    </Grid>
                                    <Grid item xs={3.25}>
                                        <Typography>Comcast</Typography>
                                    </Grid>
                                    <Grid item xs={.5}>
                                        <Typography>3/1/24</Typography>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails variant="soft">
                                <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                                    <Grid item xs={9}>
                                        <Card variant='outlined'>
                                            <Typography level="title-md" align="left">Service Description </Typography>
                                            <Divider orientation="horizontal" flexitem="true" ></Divider>
                                            <Typography level="body-md" align="left">Experience lightning-fast internet speeds with our 1GB internet service, designed to elevate your online experience to new heights. With blazing-fast connectivity, you can seamlessly stream high-definition videos, video conference with crystal-clear clarity, and download large files in seconds. Our reliable service ensures minimal downtime, keeping you connected when it matters most. Say goodbye to buffering and slow loading times – upgrade to our 1GB internet service today and unlock the full potential of your online activities.</Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Card>
                                            <List aria-labelledby="decorated-list-demo">
                                                <ListItem>
                                                <ListItemDecorator>💰</ListItemDecorator> <Typography align="right"> $149.99</Typography>
                                                </ListItem>
                                                <ListDivider inset="gutter" />
                                                <ListItem>
                                                <ListItemDecorator>🗓️</ListItemDecorator> Monthly Billing
                                                </ListItem>
                                            </List>
                                            <Grid container >
                                                <Grid item xs={6}>
                                                <Chip
                                                    color="success"
                                                    variant="soft"
                                                >Accept</Chip>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Chip
                                                        color="danger"
                                                        variant="soft"
                                                    >Decline</Chip>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary>
                                <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                                    <Grid item xs={4.5}>
                                        <Typography>Gutter Cleaning</Typography>
                                    </Grid>
                                    <Grid item xs={3.3}>
                                        <Typography>Home Services</Typography>
                                    </Grid>
                                    <Grid item xs={3.25}>
                                        <Typography>JJ&apos;s Gutter Specialists</Typography>
                                    </Grid>
                                    <Grid item xs={.5}>
                                        <Typography>1/23/24</Typography>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails variant="soft">
                                <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                                    <Grid item xs={9}>
                                        <Card variant='outlined'>
                                            <Typography level="title-md" align="left">Service Description </Typography>
                                            <Divider orientation="horizontal" flexitem="true" ></Divider>
                                            <Typography level="body-md" align="left">Every six months, our comprehensive gutter cleaning service ensures your gutters are free from debris and dirt buildup. With thorough debris removal and power washing, we safeguard your home from potential water damage while maintaining its pristine appearance.</Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Card>
                                            <List aria-labelledby="decorated-list-demo">
                                                <ListItem>
                                                <ListItemDecorator>💰</ListItemDecorator> <Typography align="right"> $349.99</Typography>
                                                </ListItem>
                                                <ListDivider inset="gutter" />
                                                <ListItem>
                                                <ListItemDecorator>🗓️</ListItemDecorator> Bi-Yearly Billing
                                                </ListItem>
                                            </List>
                                            <Grid container >
                                                <Grid item xs={6}>
                                                <Chip
                                                    color="success"
                                                    variant="soft"
                                                >Accept</Chip>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Chip
                                                        color="danger"
                                                        variant="soft"
                                                    >Decline</Chip>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        </AccordionGroup>
                    </Card>
                </Grid>
            </Grid>
            
            
          
            
        </>
    )
}
export default MatchCreator;
MatchCreator.propTypes = {
    propertyId: PropTypes.number.isRequired,
};