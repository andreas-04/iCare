import { Card, Sheet, Grid, Typography, Divider } from "@mui/joy";
import { Route, Routes } from 'react-router-dom';

import Navbar from "./navbar";
import Profile from "./Profile"
import Dashboard  from "./Dashboard";
import MatchCreator from "./MatchCreator";
import BusinessDash from "./BusinessDash";
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
                <Card sx={{marginTop: "25px"}}>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path = "/profile" element={<Profile/>}/>
                        <Route path = "/notifications" element={<MatchCreator/>}/>
                        <Route path = "/test" element={<BusinessDash/>}/>
                    </Routes>
                </Card>


            </Sheet>
        </Grid>
      </Grid>
    </>

    )
}
export default Root;