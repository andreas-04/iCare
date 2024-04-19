// import {} from "react";
import api from '../api';
import PropTypes from 'prop-types';
import { Typography, Grid, Card, Divider, List, ListItem, ListItemDecorator, ListDivider, Button } from '@mui/joy';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import { useEffect, useState } from 'react';

const MatchList = ({matches, matchesUpdated, propertyId}) => {
    useEffect(() => {
    }, [matchesUpdated]);
    const [acceptedPlans, setAcceptedPlans] = useState([]);
    const acceptServicePlan = (planId, planType) => {
        const data = {
            property: propertyId
        };
        api.putPlan(planId, planType, data)
        .then(response => {
            console.log("Plan updated successfully:", response);
            setAcceptedPlans(prevPlans => [...prevPlans, planId]);
        })
        .catch(error => {
            console.error("Error updating plan:", error);
        });
    };
    const filteredMatches = Object.keys(matches).reduce((acc, category) => {
        acc[category] = matches[category].filter(match => !acceptedPlans.includes(match.service_plan.id));
        return acc;
    }, {});
    return(
        <>
            <Card
            size='sm'
            variant='outlined'>
                <AccordionGroup
                variant="plain"
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
                {Object.keys(filteredMatches).map((category) => (
                        filteredMatches[category].map((match, index) => (
                        <Accordion key={index}>
                            <AccordionSummary>
                            <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                                <Grid item xs={4.5}>
                                    <Typography>{match.service_plan.service_name}</Typography>
                                </Grid>
                                <Grid item xs={3.3}>
                                    <Typography>{category}</Typography>
                                </Grid>
                                <Grid item xs={3.25}>
                                    <Typography>{match.service_plan.business}</Typography>
                                </Grid>
                                <Grid item xs={.5}>
                                    <Typography>{match.score.toFixed(3)}</Typography>
                                </Grid>
                            </Grid>
                            </AccordionSummary>
                            <AccordionDetails variant="soft">
                                <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
                                    <Grid item xs={8}>
                                        <Card variant='outlined' size='sm' >
                                            <Typography level="title-md" align="left">Service Description </Typography>
                                            <Divider orientation="horizontal" flexitem="true" ></Divider>
                                            <Typography level="body-md" align="left">{match.service_plan.service_description}</Typography>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Card size='sm'>
                                            <List aria-labelledby="decorated-list-demo">
                                                <ListItem>
                                                <ListItemDecorator>💰</ListItemDecorator> <Typography align="right" level='body-md'>Cost: ${match.service_plan.cost}</Typography>
                                                </ListItem>
                                                <ListDivider inset="gutter" />
                                                {(category === 'Lawn' || category === 'Interior') && (
                                                    <>
                                                        <ListItem>
                                                            <ListItemDecorator>🗓️</ListItemDecorator><Typography align="right" level='body-md'>Frequency: {match.service_plan.frequency}x per month</Typography>
                                                        </ListItem>
                                                        <ListDivider inset="gutter" />
                                                    </>
                                                )}
                                                {(category === 'Phone' || category === 'Internet') && (
                                                    <>
                                                        <ListItem>
                                                            <ListItemDecorator>👥</ListItemDecorator><Typography align="right" level='body-md'>Users: {match.service_plan.users}</Typography>
                                                        </ListItem>
                                                        <ListDivider inset="gutter" />
                                                    </>
                                                )}
                                                {(category === 'Phone' ) && (
                                                    <>
                                                        <ListItem>
                                                            <ListItemDecorator>📶</ListItemDecorator><Typography align="right" level='body-md'>Plan Type: {match.service_plan.plan_type}</Typography>
                                                        </ListItem>
                                                        <ListDivider inset="gutter" />
                                                    </>
                                                )}
                                                {(category === 'Internet' ) && (
                                                    <>
                                                        <ListItem>
                                                            <ListItemDecorator>📶</ListItemDecorator><Typography align="right" level='body-md'>Plan Speed: {match.service_plan.speed} mb/s</Typography>
                                                        </ListItem>
                                                        <ListDivider inset="gutter" />
                                                    </>
                                                )}
                                            </List>

                                                <Button
                                                    color="success"
                                                    size='sm'
                                                    variant="soft"
                                                    onClick={() => acceptServicePlan(match.service_plan.id, category.toLowerCase())}
                                                    >Accept</Button>
                  
                                        </Card>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        ))
                    ))}  
                </AccordionGroup>
            </Card>
        </>
    )
}
export default MatchList;
MatchList.propTypes = {
    matches: PropTypes.object.isRequired,
    propertyId: PropTypes.number.isRequired,
    matchesUpdated: PropTypes.bool.isRequired, 

};
