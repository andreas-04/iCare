import  { useState } from 'react';
import { Card, Divider, Grid, Typography, Chip, Button, Modal, Box, Textarea, CircularProgress, Stack, List, ListItem, Checkbox  } from "@mui/joy";

const Dashboard = () => {
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
                <Typography level="h4" align="left">Contact Provider</Typography>
                <Typography level="body-md" align="left">
                    Please fill out the form below to contact the provider.
                </Typography>
                <Textarea minRows={5} />
                <Button onClick={handleClose}>Contact</Button>
            </Card>
        </Box>

        </>
    );
    return(
        <>
        <Typography level="h3" align="left">My Dashboard</Typography>
        <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
            <Grid item xs={8}>
                <Card>
                    <Typography level="title-lg" align="left">Active Plans</Typography>
                    <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
                        <Grid item xs={6}>
                            <Card size='sm'>
                            <Typography level="body-lg" align="left">
                                Lawn Mowing and Hedge Trimming
                            </Typography>
                            <Divider></Divider>
                            <Typography align="left" level="body-md">🏡 Property: 123 Lakeshore Ave</Typography>
                            <Typography align="left" level="body-md">📥 Provider: Quik-E&apos;s Lawn Care</Typography>
                            <Typography align="left" level="body-md">📆 Next Billing Date: 12 April, 2024 </Typography>
                            <Typography align="left" level="body-md">💰 Cost: $23.99 </Typography>
                            <Divider></Divider>
                            <Grid container spacing={1} sx={{flexGrow:1 }} alignItems="stretch">
                                <Grid item xs={3}>
                                    <Chip color="danger" size="md">Cancel</Chip>
                                </Grid>
                                <Grid item xs={3}>
                                    <Chip color="primary" size="md" onClick={handleOpen}>Contact Provider</Chip>
                                </Grid>
                            </Grid>
                            
                            </Card>
                        </Grid>

                        <Grid item xs={6}>
                            <Card size='sm'>
                                <Typography level="body-lg" align="left">
                                    Unlimited Data, Talk and Text
                                </Typography>
                                <Divider></Divider>
                                <Typography align="left" level="body-md">🏡 Property: 123 Lakeshore Ave</Typography>
                                <Typography align="left" level="body-md">📥 Provider: Dave&apos;s Phones</Typography>
                                <Typography align="left" level="body-md">📱 Devices: 5</Typography>
                                <Typography align="left" level="body-md">🔗 Plan Type: Unlimited</Typography>


                                <Typography align="left" level="body-md">📆 Next Billing Date: 1 April, 2024 </Typography>
                                <Typography align="left" level="body-md">💰 Cost: $69.99 </Typography>
                                <Divider></Divider>
                                <Grid container spacing={1} sx={{flexGrow:1 }} alignItems="stretch">
                                    <Grid item xs={3}>
                                        <Chip color="danger" size="md">Cancel</Chip>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Chip color="primary" size="md" onClick={handleOpen}>Contact Provider</Chip>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card size='sm'>
                            <Typography level="body-lg" align="left">
                                Pool Cleaning
                            </Typography>
                            <Divider></Divider>
                            <Typography align="left" level="body-md">🏡 Property: 123 Lakeshore Ave</Typography>
                            <Typography align="left" level="body-md">📥 Provider: Aqua Lovers inc.</Typography>
                            <Typography align="left" level="body-md">📆 Next Billing Date: 5 May, 2024 </Typography>
                            <Typography align="left" level="body-md">💰 Cost: $203.99 </Typography>
                            <Divider></Divider>
                            <Grid container spacing={1} sx={{flexGrow:1 }} alignItems="stretch">
                                <Grid item xs={3}>
                                    <Chip color="danger" size="md">Cancel</Chip>
                                </Grid>
                                <Grid item xs={3}>
                                    <Chip color="primary" size="md" onClick={handleOpen}>Contact Provider</Chip>
                                </Grid>
                            </Grid>
                            
                            </Card>
                        </Grid>

                        <Grid item xs={6}>
                            <Card size='sm'>
                                <Typography level="body-lg" align="left">
                                    WiFi
                                </Typography>
                                <Divider></Divider>
                                <Typography align="left" level="body-md">🏡 Property: 123 Lakeshore Ave</Typography>
                                <Typography align="left" level="body-md">📥 Provider: Primal Internet Company</Typography>
                                <Typography align="left" level="body-md">📱 Devices: 5</Typography>
                                <Typography align="left" level="body-md">🔗 Plan Type: 256gb up/down</Typography>


                                <Typography align="left" level="body-md">📆 Next Billing Date: 1 April, 2024 </Typography>
                                <Typography align="left" level="body-md">💰 Cost: $89.99 </Typography>
                                <Divider></Divider>
                                <Grid container spacing={1} sx={{flexGrow:1 }} alignItems="stretch">
                                    <Grid item xs={3}>
                                        <Chip color="danger" size="md">Cancel</Chip>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Chip color="primary" size="md" onClick={handleOpen}>Contact Provider</Chip>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Stack spacing={2}>
                    <Stack item>
                        <Card>
                            <Typography level="title-lg" align="left">My Budget</Typography>
                            <Divider></Divider>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%', // This makes the Box take up the full height of the Card
                                }}
                            >
                                <CircularProgress
                                    determinate value={45}
                                    variant='solid'
                                    sx={{
                                        "--CircularProgress-size": "275px",
                                        "--CircularProgress-trackThickness": "40px",
                                        "--CircularProgress-progressThickness": "35px",
                                    }}
                                >
                                    <Typography level='h3'>$183.97/$400</Typography>
                                </CircularProgress>
                            </Box>
                        </Card>
                    </Stack>
                </Stack>
            </Grid>

        </Grid>
        <Modal  open={open} onClose={handleClose}>
                {modalContent}
        </Modal>
        </>
    )
}
export default Dashboard;