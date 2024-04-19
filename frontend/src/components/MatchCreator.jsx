import { Typography, Grid, Card, Divider, List, ListItem, Checkbox, Button, Select, Option } from '@mui/joy';
import { useState, useEffect } from 'react';
import api from '../api';
import Cookies from 'js-cookie';
import MatchList from './MatchList';

const MatchCreator = () => {
    const userId = Cookies.get('user_id'); 
    const [property, setProperty] = useState(null);
    const [propertyList, setPropertyList] = useState([]);
    const [interestedIn, setInterestedIn] = useState({
        user: userId,
        interestedInLawn: false,
        interestedInInterior: false,
        interestedInPhone: false,
        interestedInInternet: false,
    })
    const [matches, setMatches] = useState({});
    const [matchesUpdated, setMatchesUpdated] = useState(false);
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setInterestedIn(prevState => ({
            ...prevState,
            [name]: checked
        }));

    };
    const genenerateMatchez = () => {
        const categories = ['Lawn', 'Interior', 'Phone', 'Internet'];
        categories.forEach(category => {
            if(interestedIn[`interestedIn${category}`]){
                api[`get${category}Matches`](property)
                .then(response => {
                    setMatches(prevMatches => ({
                        ...prevMatches,
                        [category]: response.data 
                    }));
                }).catch(error => {
                    console.error(`Error fetching ${category} matches:`, error);
                });
            }
        });
        setMatchesUpdated(true); 
    };
    const handleSelectChange = (event, newValue) => {
        setProperty(newValue);

    }
    useEffect(() => {
        const fetchProperties = async () => {
            try{
                const properties = await api.getProperties(userId);
                setPropertyList(properties.data);
            }catch(error){
                console.log("error getting properties",error);
            }
        }
        fetchProperties();
    }, [userId]);
    console.log(propertyList);
    return(
        <>
        <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
            <Grid item xs={9}><Typography textAlign="left" level='h2' >Match Maker</Typography></Grid>
            <Grid item xs={3}>
                <Select onChange={handleSelectChange} placeholder="Select a Property">
                    {propertyList.map((property, index) => (
                        <Option key={index} value={property.id}>
                            {property.address}
                        </Option>
                    ))}
                </Select>
            </Grid>
            <Grid item xs={2.5}>
                <Card size='sm'>
                    <Typography level="h4" align="left">Interested In:</Typography>
                    <Divider></Divider>
                    <List size="sm">
                        <ListItem>
                            <Checkbox                            
                                name='interestedInLawn'
                                checked={interestedIn.interestedInLawn}  
                                label="Lawn Services"
                                onChange={handleCheckboxChange}
                            />
                        </ListItem>
                        <ListItem>
                            <Checkbox
                                name='interestedInInterior'
                                checked={interestedIn.interestedInInterior}  
                                label="Interior Services"
                                onChange={handleCheckboxChange}
                            />
                        </ListItem>
                        <ListItem>
                            <Checkbox 
                                name='interestedInPhone'
                                checked={interestedIn.interestedInPhone}  
                                label="Phone Services" 
                                onChange={handleCheckboxChange}
                            />
                        </ListItem>
                        <ListItem>
                            <Checkbox                            
                                name='interestedInInternet'
                                checked={interestedIn.interestedInInternet}  
                                label="Internet Services"
                                onChange={handleCheckboxChange}
                            />
                        </ListItem>

                    </List>
                    <Divider></Divider>
                    <Button size='sm' onClick={genenerateMatchez}>Generate Matches</Button>
                </Card>
            </Grid>
            <Grid item xs={9.5}>
                <MatchList matches={matches}  matchesUpdated={matchesUpdated} propertyId={property}/>
            </Grid>
            </Grid> 
        </>
    )
}
export default MatchCreator;
