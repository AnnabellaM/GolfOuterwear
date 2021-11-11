import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {agent} from "../../agent";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Typography from "@mui/material/Typography";

const DeleteProductDialog = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [id, setId] = React.useState('');

  const handleClickOpen = () => {
    setId(props.id);
    setIsOpen(true);
  };

  const handleClose = () => {
    setId('');
    setIsOpen(false);
  };

  const handleAgree = async () => {
    agent.deleteProduct(id)
      .then(() => {
        handleClose();
        if (!!props.afterProductDeleted) {
          props.afterProductDeleted();
        }
      })
      .catch(() => {
        alert('Error when deleting product')
      });
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteOutlineIcon/>
      </IconButton>
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>
          {"Info"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {`Sure you want to delete the product`}
          </Typography>
          <Typography variant="body1" fontWeight="bold" color="secondary" display="inline">
            {props.name}
          </Typography>
          <Typography variant="body1" display="inline">
            {` ?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteProductDialog;
