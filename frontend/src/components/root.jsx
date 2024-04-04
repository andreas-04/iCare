import { Card, Sheet, Grid, Typography, Divider } from "@mui/joy";
import { Route, Routes } from 'react-router-dom';

import Navbar from "./navbar";
import Profile from "./Profile"
import Notifications from "./Notifications";
import Dashboard  from "./Dashboard";
import Service_Plan_Form from "./service_form_temp";
import Homepage from "./matttest";

const Root = () => {
    return(
    <>
      <Grid 
      container 
      spacing={2}
      sx={{ flexGrow: 1 }}
       alignItems="stretch"
      >
        <Grid item xs={1} sx={{padding: "25px"}}>
            <Navbar/>
        </Grid>
        <Grid item xs={11} sx={{padding: "25px"}}>
            <Sheet
            variant='outlined'
            sx={{ borderRadius: '10px', padding: '20px',}}>
                <Typography align="left" level="h1">iCare</Typography>
                <Divider orientation="horizontal" flexitem="true" sx={{ width: '50%' }} />
                <Card sx={{margin: "25px"}}>
                    <Routes>
                        {/* <Route path="/" element={<Dashboard/>}/> */}
                        <Route path = "/" element={<Homepage/>}/>
                        <Route path = "/profile" element={<Profile/>}/>
                        <Route path = "/notifications" element={<Notifications/>}/>
                        <Route path = "/test" element={<Service_Plan_Form/>}/>
                        {/* <Route path = "/homepage_test" element={<Homepage/>}/> */}
                    </Routes>
                </Card>


            </Sheet>
        </Grid>
      </Grid>
    </>

    )
}
export default Root;