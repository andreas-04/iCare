import { Card, Grid, Typography } from "@mui/joy";
import { Route, Routes } from 'react-router-dom';
import Navbar from "./navbar";
import Profile from "./Profile"
import Dashboard  from "./Dashboard";
import MatchCreator from "./MatchCreator";
import BusinessDash from "./BusinessDash";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'; 
import api
 from "../api";
const Root = () => {
    const [userType, setUserType] = useState("")
    useEffect(()=>{
        const getUserType = async() =>{
            try{
                const userId = Cookies.get('user_id');
                const userData = await api.getUserT(userId);
                setUserType(userData.data.user_t);
            }catch(error){
                console.log(error);
            }
        }
        getUserType();
    },[userType])
    return(
    <>
        {userType === "homeowner" ?
        <>
        <Card variant='outlined' size="lg" sx={{marginTop:"20px"}}>
            <Grid container spacing={2}sx={{ flexGrow: 1 }} alignItems="stretch">
                <Grid item xs={10.2}><Typography align="left" level="h1" color="primary">iCare</Typography></Grid>
                <Grid item xs={1.8}><Navbar userType={userType}/></Grid>
            </Grid>

            <Card size="md">
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path = "/profile" element={<Profile/>}/>
                    <Route path = "/matches" element={<MatchCreator/>}/>
                </Routes>
            </Card>
        </Card>
        </>
        :
        <>
        <Card variant='outlined' size="lg" sx={{marginTop:"20px"}}>
            <Grid container spacing={2}sx={{ flexGrow: 1 }} alignItems="stretch">
                <Grid item xs={11}><Typography align="left" level="h1" color="primary">iCare</Typography></Grid>
                <Grid item xs={1}><Navbar userType={userType}/></Grid>
            </Grid>

            <Card size="lg">
                <Routes>
                    <Route path = "/" element={<BusinessDash/>}/>
                </Routes>
            </Card>
        </Card>
        </>}
            
    </>

    )
}
export default Root;