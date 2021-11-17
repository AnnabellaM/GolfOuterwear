import * as React from "react";

import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import {useHistory} from "react-router-dom";
import {useAuth} from "../../providers/AuthProvider";

const ActionButton = () => {
  const history = useHistory();
  const {signOut} = useAuth();

  const [isOpen, setIsOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const PAGE_PROFILE = 'profile';
  const PAGE_ORDERS = 'orders';
  const PAGE_LOGOUT = 'logout';

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const goToPage = (page) => {
    handleClose();
    switch (page) {
      case PAGE_PROFILE:
        return history.push('/profile');
      case PAGE_ORDERS:
        return history.push('/orders');
      case PAGE_LOGOUT:
        return signOut();
    }
  }

  return (
    <div>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
      >
        <MoreVertIcon sx={{color: 'white'}}/>
      </IconButton>
      <Popper
        open={isOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={isOpen}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  sx={{zIndex: 999}}
                >
                  <MenuItem onClick={() => goToPage(PAGE_PROFILE)}>
                    <PersonIcon sx={{mr: 1}}/>Profile
                  </MenuItem>
                  <MenuItem onClick={() => goToPage(PAGE_ORDERS)}>
                    <AssignmentIcon sx={{mr: 1}}/>Orders
                  </MenuItem>
                  <MenuItem onClick={() => goToPage(PAGE_LOGOUT)}>
                    <LogoutIcon sx={{mr: 1}}/>Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default ActionButton;
