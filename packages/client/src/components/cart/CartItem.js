import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import toPriceStr from '../../utils/toPriceStr';
import classes from './CartItem.module.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import {agent} from "../../agent";
import RemoveCartItemDialog from "./RemoveCartItemDialog";

const CartItem = (props) => {
  const [amount, setAmount] = useState(props.amount);

  const handleChangeAmount = (val) => {
    const newAmount = amount + val;
    agent.changeProductAmountInCart(props.productId, newAmount)
      .then((res) => {
        if (res.status === 200) {
          setAmount(newAmount);
          return;
        }
        alert(res.body.message);
      });
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
          <IconButton onClick={() => handleChangeAmount(-1)}>
            <RemoveIcon/>
          </IconButton>
          <Typography variant="body2" sx={{px: 1}}>
            {amount}
          </Typography>
          <IconButton onClick={() => handleChangeAmount(1)}>
            <AddIcon/>
          </IconButton>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Typography variant="body2">
            {props.currency}${toPriceStr(props.price * amount)}
          </Typography>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 72}}>
          <RemoveCartItemDialog
            id={props.productId}
            afterItemRemoved={props.afterItemRemoved}
          />
        </Box>
      </Box>
    </Card>
  )
}

export default CartItem;
