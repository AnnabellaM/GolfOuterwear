import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import toPriceStr from '../../utils/toPriceStr';
import classes from './OrderItem.module.css';
import * as React from "react";

const OrderItem = (props) => {

  return (
    <Box sx={{display: 'flex', height: 72}}>
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
        <Typography variant="body2" sx={{px: 1}}>
          {props.amount}
        </Typography>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Typography variant="body2">
          {props.currency}${toPriceStr(props.price * props.amount)}
        </Typography>
      </Box>
    </Box>
  )
}

export default OrderItem;
