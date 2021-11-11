import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {agent} from '../agent';
import {useHistory} from "react-router-dom";

const theme = createTheme();

function SignUp() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const history = useHistory();

  const handleSubmit = () => {
    const info = {
      email,
      password,
      address,
      firstName,
      lastName,
      phone,
    }

    agent.signUp(info)
      .then((res) => {
        if (res.status === 200) {
          alert('Sign up successfully');
          history.replace('./sign-in');
        }

        else if (res.status === 400) {
          alert(res.body.message);
        }

        else {
          alert('Unexpected error');
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link href="./">
            <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
              <SportsGolfIcon/>
            </Avatar>
          </Link>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onInput={e => setFirstName(e.target.value)}
                  // onChange={handleFnameChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onInput={e => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onInput={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onInput={e => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="phone"
                  id="phone"
                  autoComplete="phone number"
                  value={phone}
                  onInput={e => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  type="address"
                  id="address"
                  autoComplete="home address"
                  value={address}
                  onInput={e => setAddress(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
