import { useState } from 'react';
import React from 'react';
import ReactDOM from 'react';
import { Container, Card, Grid, Typography, Button, CardContent } from "@mui/material";

const Homepage = () => {
    
    return (
        <Container maxWidth="lg">
            {/* Hero Section */}
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h2" gutterBottom>
                        Welcome to iCare
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper eget ipsum id dapibus.
                    </Typography>
                    <Button variant="contained" color="primary">
                        Get Started
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* You can add an image or illustration here */}
                    <img src="https://via.placeholder.com/400x300" alt="placeholder" style={{ width: '100%', borderRadius: '8px' }} />
                </Grid>
            </Grid>

            {/* Features Section */}
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ padding: '40px 0' }}>
                <Grid item xs={12}>
                    <Typography variant="h3" align="center" gutterBottom>
                        Features
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Feature 1
                            </Typography>
                            <Typography variant="body1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Feature 2
                            </Typography>
                            <Typography variant="body1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Feature 3
                            </Typography>
                            <Typography variant="body1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* CTA Section */}
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ backgroundColor: '#f0f0f0', padding: '80px 0' }}>
                <Grid item xs={12}>
                    <Typography variant="h3" align="center" gutterBottom>
                        Ready to Get Started?
                    </Typography>
                    <Typography variant="body1" align="center" paragraph>
                        Sign up now to experience the benefits of iCare!
                    </Typography>
                    <Button variant="contained" color="primary">
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};
export default Homepage;
