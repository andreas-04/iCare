import { Typography, Table, Grid, Card, Divider, List, ListItem, ListItemDecorator, ListDivider, Chip } from '@mui/joy';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';


const Notifications = () => {
    return(
        <>
            <Typography textAlign="left" level='h3' paddingLeft={"1%"}>My Notifications</Typography>
            <Table aria-label="basic table" size='md'>
                <thead>
                    <tr>
                    <th style={{ width: '35%' }}>Service Name</th>
                    <th style={{ width: '25%' }}>Service Type</th>
                    <th style={{ width: '24%' }}>Business Name</th>
                    <th>Date</th>

                    </tr>
                </thead>
            </Table>
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
                                        <Card variant='outlined'>
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
            
        </>

    )
}
export default Notifications;