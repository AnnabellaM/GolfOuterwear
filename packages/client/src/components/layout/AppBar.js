import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Link from '@mui/material/Link';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const BootstrapInput = styled(InputBase)(({theme}) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    fontSize: 16,
    color: 'white',
    padding: '7px 26px 7px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default (props) => {
  const [genre, setGenre] = React.useState('All');

  const onSearchBoxFocus = (e) => {
    // add 'Enter' listener when user focusing on the text field
    e.target.addEventListener('keypress', (keyEvent) => {
      if (keyEvent.keyCode === 13) {
        // search products by keyword after pressing 'Enter' key
        props.searchProducts(e.target.value || '');
      }
    })
  }

  const onSearchBoxBlur = (e) => {
    // remove the event
    e.target.removeEventListener('keypress', () => {});
  }

  const handleGenreChange = (e) => {
    let val = e.target.value;
    setGenre(val);
    if (!!props.filterProducts) {
      val = val === 'All' ? '' : val;
      props.filterProducts(val || '');
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Golf <Typography variant="h6" color="secondary" display="inline">Outerwear</Typography>
          </Typography>
          <FormControl variant="standard" sx={{minWidth: 80}}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre"
              value={genre}
              onChange={handleGenreChange}
              label="genre"
              input={<BootstrapInput/>}
              fullWidth={false}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Jacket">Jacket</MenuItem>
              <MenuItem value="Vest">Vest</MenuItem>
            </Select>
          </FormControl>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="ex: cap"
              inputProps={{ 'aria-label': 'search' }}
              onFocus={onSearchBoxFocus}
              onBlur={onSearchBoxBlur}
            />
          </Search>
          <Link href="./sign-in" variant="body2" color="secondary">
                  Hello! Sign in
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
