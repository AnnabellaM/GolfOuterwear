import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from '@mui/icons-material/Visibility';

import StoreIcon from '@mui/icons-material/Store';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import classes from './ProductDetailDialog.module.css'

const ProductInfoDialog = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');
  const [name, setName] = React.useState('');
  const [genre, setGenre] = React.useState('Jacket');
  const [price, setPrice] = React.useState(0);
  const [currency, setCurrency] = React.useState('USD');
  const [inventory, setInventory] = React.useState(0);
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setImageUrl(props.imageUrl);
    setName(props.name);
    setGenre(props.genre);
    setPrice(props.price);
    setCurrency(props.currency);
    setInventory(props.inventory);
    setDescription(props.description);
  }, []);

  // convert digit to price string
  const toPriceStr = (price) => {
    const recur = (price) => {
      if (price >= 1000) {
        recur(Math.floor(price / 1000));
      }
      const n = price % 1000
      if (n !== (n | 0)) {
        priceStrArr.push(`${(n).toFixed(2)}`);
      } else {
        priceStrArr.push(`${n}`);
      }
    }
    let priceStrArr = [];
    recur(price)
    return priceStrArr.join(',')
  }

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <VisibilityIcon/>
      </IconButton>
      <Dialog open={isOpen} onClose={handleClose}>
        <img src={imageUrl} className={classes['product-detail-dialog__img']} alt={name}/>
        <DialogTitle>{name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{display: 'flex', alignItems: 'center', mb: 1, fontWeight: 'bold'}}>
            <StoreIcon sx={{mr: 1}}/>{inventory}
          </Typography>
          <Typography variant="body1" sx={{display: 'flex', alignItems: 'center', mb: 1, fontWeight: 'bold'}}>
            <AttachMoneyIcon sx={{mr: 1}}/>{currency}${toPriceStr(price)}
          </Typography>
          <Typography variant="body1" sx={{mt: 2}}>
            {description}
          </Typography>
          <Box sx={{mt: 2, textAlign: 'right'}}>
            <Chip label={genre} color="secondary"/>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductInfoDialog;
