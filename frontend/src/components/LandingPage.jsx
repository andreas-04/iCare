{/*

import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/joy';

const LandingPage = () => {
    return (
        <Container>
            <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h2" align="center" gutterBottom>
                        iCare
                    </Typography>
                    <Typography variant="subtitle1" align="center" paragraph>
                        Where homeowners and business owners interact.
                    </Typography>
                    <Grid container justifyContent="center">
                        <Button variant="contained" color="primary">
                            Get Started
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default LandingPage;
*/}

import React, { useState } from 'react';
import { Container, Grid, Typography, Button } from '@mui/joy';
import Authentication from './Authentication.jsx';

const LandingPage = ({ onAuthenticated }) => {
  const [showAuthentication, setShowAuthentication] = useState(false);

  const handleGetStarted = () => {
    setShowAuthentication(true);
  };

  return (
    <Container>
      <Grid container spacing={2} alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h1" align="center" gutterBottom style={{ fontSize: '4rem', marginTop: '100px' }}>
            iCare
          </Typography>
          <Typography variant="subtitle1" align="center" paragraph>
            Where homeowners and business owners interact.
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={handleGetStarted}>
            Get Started
          </Button>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" align="right" color="primary" style={{ position: 'fixed', bottom: '8px', right: '8px' }}>
        © {new Date().getFullYear()}
      </Typography>

      {showAuthentication && <Authentication onAuthenticated={onAuthenticated} />}
    </Container>
  );
}

export default LandingPage;

