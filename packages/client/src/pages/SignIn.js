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

function SignIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useHistory();

  const handleSubmit = () => {
    agent.signIn(email, password)
      .then((res) => {
        if (res.status === 200) {
          history.replace('/');
        }

        else if (res.status === 400) {
          alert(res.body.message);
        }

        else {
          alert('Unexpected error');
        }
      })
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onInput={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onInput={e => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="./sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
