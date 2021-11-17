import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import ImageUploader from "../layout/ImageUploader";
import {agent} from "../../agent";

const CreateProductDialog = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [id, setId] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [name, setName] = React.useState('');
  const [genre, setGenre] = React.useState('Jacket');
  const [price, setPrice] = React.useState(0);
  const [currency, setCurrency] = React.useState('USD');
  const [inventory, setInventory] = React.useState(0);
  const [description, setDescription] = React.useState('');

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setId('');
    setImageUrl('');
    setName('');
    setGenre('Jacket');
    setPrice(0);
    setCurrency('USD');
    setInventory(0);
    setDescription('');
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    const data = {
      imageUrl: imageUrl || null,
      name: name,
      genre: genre,
      price: price,
      currency: currency,
      inventory: inventory,
      description: description,
    }

    agent.createProduct(id, data)
      .then((res) => {
        switch (res.status) {
          case 201:
            if (!!props.afterProductCreated) {
              props.afterProductCreated();
            }
            handleClose();
            return;
          case 400:
            alert(res.body.message);
            return;
        }
        alert('Unexpected error');
      });
  }

  return (
    <div>
      <Button color="secondary" variant="contained" onClick={handleClickOpen}>
        New Product
      </Button>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Create New</DialogTitle>
        <DialogContent>
          <ImageUploader imageUrl={imageUrl} afterImageUploaded={url => setImageUrl(url)}/>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onInput={e => setName(e.target.value)}
          />
          <FormControl variant="standard" fullWidth sx={{mt: 1}}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre"
              value={genre}
              onChange={e => setGenre(e.target.value)}
              label="genre"
              fullWidth
            >
              <MenuItem value="Jacket">Jacket</MenuItem>
              <MenuItem value="Vest">Vest</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            value={price}
            onInput={e => setPrice(e.target.value)}
          />
          <FormControl variant="standard" fullWidth sx={{mt: 1}}>
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              id="currency"
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              label="currency"
              fullWidth
            >
              <MenuItem value="USD">USD</MenuItem>
              {/*<MenuItem value="RMB">RMB</MenuItem>*/}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Inventory"
            type="number"
            fullWidth
            variant="standard"
            value={inventory}
            onInput={e => setInventory(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            multiline
            fullWidth
            variant="standard"
            value={description}
            onInput={e => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateProductDialog;
