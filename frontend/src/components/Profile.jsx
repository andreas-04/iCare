import { Typography, Card, Input, Button, Grid, Divider,Tooltip  } from "@mui/joy";
const Profile = () => {
    return(
        <>
        <Typography level="h3" align="left">My Properties</Typography>
        <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems="stretch">
            <Grid item xs={4}>
                <Card size="sm">
                    <Grid container spacing={2} sx={{flexGrow:1 }} alignItems="stretch">
                        <Grid item xs={9}>
                            <Typography paddingTop="6px" align="left" level="title-lg">123 Lakeside Ave</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Button>Edit</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Card size="sm">
                                <Typography align="left" level="title-lg">Lawn</Typography>
                            
                            
                                <Grid container sx={{ flexGrow: 1 }} alignItems="stretch">
                                    <Grid xs={6} item><Typography align="left">Lawn Size:</Typography></Grid>
                                    <Grid xs ={6} item>
                                            
                                    </Grid>
                                    <Grid xs={6} item><Typography align="left">Required Services:</Typography></Grid>
                                    <Grid xs ={6} item>

                                    </Grid>

                                    <Grid xs={6} item><Typography align="left">Budget:</Typography></Grid>
                                    <Grid xs={6} item>

                                    </Grid>
                                    
                                </Grid>
                                <Divider></Divider>
                                <Typography align="left" level="title-lg">Phones</Typography>

                                <Grid container sx={{ flexGrow: 1 }} alignItems="stretch">
                                    <Grid xs={6} item><Typography align="left"> Users:</Typography></Grid>
                                    <Grid xs ={6} item><Typography align="right" >5</Typography></Grid>
                                    <Grid xs ={6} item><Typography align="left" >Prefered Plan Type:</Typography></Grid>
                                    <Grid xs ={6} item><Typography align="right" >Unlimited</Typography></Grid>
                
                                </Grid>
                                <Divider></Divider>
                                <Typography align="left" level="title-lg">Internet</Typography>

                                <Grid container sx={{ flexGrow: 1 }} alignItems="stretch">
                                    <Grid xs={6} item><Typography align="left"> Devices:</Typography></Grid>
                                    <Grid xs ={6} item><Typography align="right" >15</Typography></Grid>
                                    <Grid xs ={6} item><Typography align="left" >Prefered Speed:</Typography></Grid>
                                    <Grid xs ={6} item><Typography align="right" >Unlimited</Typography></Grid>
                                </Grid>
                                <Divider></Divider>
                                <Typography align="left" level="title-lg">Internet</Typography>

                                <Grid container sx={{ flexGrow: 1 }} alignItems="stretch">
                                    <Grid xs={6} item><Typography align="left"> Devices:</Typography></Grid>
                                    <Grid xs ={6} item><Typography align="right" >15</Typography></Grid>
                                    <Grid xs ={6} item><Typography align="left" >Prefered Speed:</Typography></Grid>
                                    <Grid xs ={6} item><Typography align="right" >Unlimited</Typography></Grid>
                                </Grid>


                            </Card>
                        </Grid>

                    </Grid>

                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    
                </Card>
            </Grid>

        </Grid>
        </>
    )
}
export default Profile;