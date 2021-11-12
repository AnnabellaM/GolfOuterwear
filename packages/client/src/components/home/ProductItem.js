import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Chip from "@mui/material/Chip";

import StoreIcon from '@mui/icons-material/Store';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import classes from './ProductItem.module.css'
import DeleteProductDialog from "./DeleteProductDialog";
import UpdateProductDialog from "./UpdateProductDialog";
import ProductDetailDialog from "./ProductDetailDialog";

const ProductItem = (props) => {

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

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <img src={props.imageUrl} alt={props.name} className={classes['product-item-image']}/>
        <CardContent>
          <Typography variant="h6" component="div" className={classes['product-item-name']}>
            {props.name}
          </Typography>
          <Typography variant="body1" sx={{mt: 1}} className={classes['product-item-description']}>
            {props.description}
          </Typography>
          <Box sx={{mt: 2, textAlign: 'right'}}>
            <Chip label={props.genre} color="secondary"/>
          </Box>
          <Box sx={{mt: 2, display: 'flex', flexDirection: 'row'}}>
            <Box sx={{flexGrow: 1, textAlign: 'left'}}>
              <Tooltip title="Remaining inventory">
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <StoreIcon/>
                  <Typography variant="body2" sx={{ml: 1}}>
                    {props.inventory}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
            <Typography variant="body1" sx={{flexGrow: 1, textAlign: 'right', fontWeight: 'bold'}}>
              {props.currency}${toPriceStr(props.price)}
            </Typography>
          </Box>
        </CardContent>
        <Divider/>
        <CardActions>
          <Box sx={{display: 'flex', flexDirection: 'row', width: '100%'}}>

            {/*update product*/}
            <UpdateProductDialog
              id={props.id}
              imageUrl={props.imageUrl}
              name={props.name}
              genre={props.genre}
              price={props.price}
              currency={props.currency}
              inventory={props.inventory}
              description={props.description}
              afterProductUpdated={props.afterProductUpdated}
            />

            {/*delete product*/}
            <DeleteProductDialog
              id={props.id}
              afterProductDeleted={props.afterProductDeleted}
            />

            {/*view product detail*/}
            <ProductDetailDialog
              imageUrl={props.imageUrl}
              name={props.name}
              genre={props.genre}
              price={props.price}
              currency={props.currency}
              inventory={props.inventory}
              description={props.description}
            />

            {/*spacer*/}
            <Box sx={{flexGrow: 1}}/>

            {/*add to cart*/}
            <IconButton>
              <AddShoppingCartIcon/>
            </IconButton>

          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductItem;
