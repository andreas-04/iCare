import { Card, Grid, Typography } from "@mui/joy";
import { Route, Routes } from 'react-router-dom';

import Navbar from "./navbar";
import Profile from "./Profile"
import Dashboard  from "./Dashboard";
import MatchCreator from "./MatchCreator";
import BusinessDash from "./BusinessDash";
const Root = () => {
    return(
    <>
            <Card variant='outlined' size="lg" sx={{marginTop:"20px"}}>
                <Grid container spacing={2}sx={{ flexGrow: 1 }} alignItems="stretch">
                    <Grid item xs={10.5}><Typography align="left" level="h1">iCare</Typography></Grid>
                    <Grid item xs={1.5}><Navbar/></Grid>
                </Grid>

                <Card size="md">
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path = "/profile" element={<Profile/>}/>
                        <Route path = "/notifications" element={<MatchCreator/>}/>
                        <Route path = "/test" element={<BusinessDash/>}/>
                    </Routes>
                </Card>


            </Card>
    </>

    )
}
export default Root;