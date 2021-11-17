import {useAuth} from "../providers/AuthProvider";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Grid from "@mui/material/Grid";

const Profile = () => {
  const {profile} = useAuth();

  return (
    <Box sx={{padding: 2}}>
      <Box sx={{display: 'flex'}}>
        <Typography variant="h6">My Profile</Typography>
      </Box>
      <Card sx={{padding: 2, m: 2}}>
        <Grid container>
          <Grid item xs={2} sx={{p: 1, textAlign: 'right'}}>
            <Typography variant='body1' fontWeight='bold'>Name</Typography>
          </Grid>
          <Grid item xs={10} sx={{p: 1}}>
            <Box sx={{display: 'flex'}}>
              <Typography variant='body1'>{profile.firstName}</Typography>
              <Typography variant='body1' sx={{ml: 1}}>{profile.lastName}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2} sx={{p: 1, textAlign: 'right'}}>
            <Typography variant='body1' fontWeight='bold'>Email</Typography>
          </Grid>
          <Grid item xs={10} sx={{p: 1}}>
            <Box sx={{display: 'flex'}}>
              <Typography variant='body1'>{profile.email}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2} sx={{p: 1, textAlign: 'right'}}>
            <Typography variant='body1' fontWeight='bold'>Phone</Typography>
          </Grid>
          <Grid item xs={10} sx={{p: 1}}>
            <Box sx={{display: 'flex'}}>
              <Typography variant='body1'>{profile.phone}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2} sx={{p: 1, textAlign: 'right'}}>
            <Typography variant='body1' fontWeight='bold'>Address</Typography>
          </Grid>
          <Grid item xs={10} sx={{p: 1}}>
            <Box sx={{display: 'flex'}}>
              <Typography variant='body1'>{profile.address}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}

export default Profile;
