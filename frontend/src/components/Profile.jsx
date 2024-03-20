import { Typography, Card, Input, Button, Grid, Divider, Select, Option, selectClasses } from "@mui/joy";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

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
                        
                        <Grid item xs={12}>
                            <Card size="sm">
                                <Typography align="left" level="title-lg">Lawn</Typography>
                            
                            
                                <Grid container sx={{ flexGrow: 1 }} alignItems="stretch" spacing={1}>
                                    <Grid xs={8} item><Typography align="left">Lawn Size:</Typography></Grid>
                                    <Grid xs ={4} item>
                                    <Input
                                        variant="outlined"
                                        size='sm'
                                        defaultValue={0}
                                        endDecorator={
                                            <Typography variant="body2">ft<sup>2</sup></Typography>
                                          }
     
                                    />
                                    </Grid>


                                    <Grid xs={8} item><Typography align="left">Budget:</Typography></Grid>
                                    <Grid xs={4} item>
                                        <Input
                                            variant="outlined"
                                            size='sm'
                                            slotProps={{
                                                input:{
                                                    min: 0,

                                                }
                                            }}
                                            defaultValue={0}
                                            endDecorator={
                                                <Typography variant="body2">$</Typography>
                                            }
                                        />
                                    </Grid>
                                    
                                    <Grid xs={8} item><Typography align="left">Tolerance:</Typography></Grid>
                                    <Grid xs={4} item>
                                        <Input
                                            variant="outlined"
                                            size='sm'
                                            slotProps={{
                                                input:{
                                                    min: 0,
                                                    max: 100,
                                                    
                                                }
                                            }}
                                            defaultValue={10}
                                            
                                            endDecorator={
                                                <Typography variant="body2">%</Typography>
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Divider></Divider>
                                <Typography align="left" level="title-lg">Phones</Typography>

                                <Grid container sx={{ flexGrow: 1 }} alignItems="stretch" spacing={1}>
                                    <Grid xs={8} item><Typography align="left"> Users:</Typography></Grid>
                                    <Grid xs ={4} item>
                                    <Input
                                        variant='outlined'
                                        size='sm'
                                        defaultValue={1}
                                        slotProps={{
                                            input:{
                                                min: 1,
                                            }
                                        }}
  
                                    />
                                    </Grid>
                                    <Grid xs ={7} item><Typography align="left" >Prefered Plan Type:</Typography></Grid>
                                    <Grid xs ={5} item>
                                        <Select
                                        placeholder="Select"
                                        indicator={<KeyboardArrowDown />}
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
                                    </Grid>
                                    <Grid xs={8} item><Typography align="left">Budget:</Typography></Grid>
                                    <Grid xs={4} item>
                                        <Input
                                            variant="outlined"
                                            size='sm'
                                            slotProps={{
                                                input:{
                                                    min: 0,

                                                }
                                            }}
                                            defaultValue={0}
                                            endDecorator={
                                                <Typography variant="body2">$</Typography>
                                            }
                                        />
                                    </Grid>
                                    
                                    <Grid xs={8} item><Typography align="left">Tolerance:</Typography></Grid>
                                    <Grid xs={4} item>
                                        <Input
                                            variant="outlined"
                                            size='sm'
                                            slotProps={{
                                                input:{
                                                    min: 0,
                                                    max: 100,
                                                    
                                                }
                                            }}
                                            defaultValue={10}
                                            
                                            endDecorator={
                                                <Typography variant="body2">%</Typography>
                                            }
                                        />
                                    </Grid>
                
                                </Grid>
                                <Divider></Divider>
                                <Typography align="left" level="title-lg">Internet</Typography>

                                <Grid container sx={{ flexGrow: 1 }} alignItems="stretch" spacing={1}>
                                    <Grid xs={8} item><Typography align="left"> Devices:</Typography></Grid>
                                        <Grid xs ={4} item>
                                        <Input
                                            variant='outlined'
                                            size='sm'
                                            defaultValue={1}
                                            slotProps={{
                                                input:{
                                                    min: 1,
                                                }
                                            }}
    
                                        />
                                    </Grid>
                                    <Grid xs ={8} item><Typography align="left" >Prefered Speed:</Typography></Grid>
                                    <Grid xs ={4} item>
                                        <Input
                                            variant="outlined"
                                            size='sm'
                                            defaultValue={1}

                                            endDecorator={
                                                <Typography variant="body2">mb/s</Typography>
                                            }
        
                                        />
                                        
                                    </Grid>
                                    <Grid xs={8} item><Typography align="left">Budget:</Typography></Grid>
                                    <Grid xs={4} item>
                                        <Input
                                            variant="outlined"
                                            size='sm'
                                            slotProps={{
                                                input:{
                                                    min: 0,

                                                }
                                            }}
                                            defaultValue={0}
                                            endDecorator={
                                                <Typography variant="body2">$</Typography>
                                            }
                                        />
                                    </Grid>
                                    <Grid xs ={8} item><Typography align="left" >Tolerance:</Typography></Grid>
                                    <Grid xs ={4} item>
                                        <Input
                                            variant="outlined"
                                            size='sm'
                                            defaultValue={1}

                                            endDecorator={
                                                <Typography variant="body2">%</Typography>
                                            }
        
                                        />
                                        
                                    </Grid>
                                </Grid>
                                <Divider></Divider>
                                <Typography align="left" level="title-lg">Miscellaneous</Typography>

                                <Grid container sx={{ flexGrow: 1 }} alignItems="stretch" spacing={1}>
                                <Grid xs={8} item><Typography align="left">Budget:</Typography></Grid>
                                    <Grid xs={4} item>
                                        <Input
                                            variant="outlined"
                                            size='sm'
                                            slotProps={{
                                                input:{
                                                    min: 0,

                                                }
                                            }}
                                            defaultValue={0}
                                            endDecorator={
                                                <Typography variant="body2">$</Typography>
                                            }
                                        />
                                    </Grid>
                                    <Grid xs ={8} item><Typography align="left" >Tolerance:</Typography></Grid>
                                    <Grid xs ={4} item>
                                        <Input
                                            variant="outlined"
                                            size='sm'
                                            defaultValue={1}

                                            endDecorator={
                                                <Typography variant="body2">%</Typography>
                                            }
        
                                        />
                                        
                                    </Grid>

                                </Grid>


                            </Card>
                        </Grid>

                    </Grid>

                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{height: "95%"}}>
                    <Button sx={{marginTop:"80%",}}>+</Button>
                    <Typography level="body-md">
                        New Property
                    </Typography>
                </Card>
            </Grid>

        </Grid>
        </>
    )
}
export default Profile;