import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import toPriceStr from '../../utils/toPriceStr';
import classes from './CartItem.module.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

const CartItem = (props) => {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState(0);

  const handleIncreaseAmount = () => {

  }

  const handleDecreaseAmount = () => {

  }

  return (
    <Card>
      <Box sx={{display: 'flex', height: 180}}>
        <Box>
          <img src={props.imageUrl} alt={props.name} className={classes['product-item-image']}/>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Typography variant="body2">
            {props.name}
          </Typography>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Chip label={props.genre} color="secondary"/>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Typography variant="body2">
            {props.currency}${toPriceStr(props.price)}
          </Typography>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <IconButton>
            <RemoveIcon/>
          </IconButton>
          <Typography variant="body2" sx={{ px: 1 }}>
            {props.amount}
          </Typography>
          <IconButton>
            <AddIcon/>
          </IconButton>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 72}}>
          <IconButton>
            <DeleteOutlineIcon/>
          </IconButton>
        </Box>
      </Box>
    </Card>
  )
}

export default CartItem;
