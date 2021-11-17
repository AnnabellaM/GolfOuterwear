import * as React from "react";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {agent} from "../agent";
import CartItem from "../components/cart/CartItem";
import toPriceStr from "../utils/toPriceStr";
import {useCartNumber} from "../providers/CartNumberProvider";
import {useAuth} from "../providers/AuthProvider";

const Cart = () => {
  const history = useHistory();
  const {reloadCartNumber} = useCartNumber();
  const {role} = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [totalPrices, setTotalPrices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // admin can not view this page
    if (role === 'admin') {
      return history.replace('/');
    }

    // show loading page
    setIsLoading(true);

    // get cart by calling api
    fetchData();
  }, []);

  const fetchData = () => {
    agent.getCart()
      .then((res) => {
        switch (res.status) {
          case 200:
            setIsLoading(false);
            setItems(res.body.items);
            const tps = res.body.items.map(i => i.amount * i.product.price);
            setTotalPrices(tps);
            setTotalPrice(tps.reduce((p, c) => p + c, 0));
            return;
          case 400:
            alert(res.body.message);
            return;
        }
        alert('Unexpected error');
      });
  }

  const handleItemTotalPriceUpdated = (index, tp) => {
    totalPrices[index] = tp;
    computeTotalPrice();
  }

  const computeTotalPrice = () => {
    setTotalPrice(totalPrices.reduce((p, c) => p + c));
  }

  if (isLoading) {
    return (
      <div>loading...</div>
    );
  }

  // Card items
  return (
    <Box sx={{padding: 2}}>
      <Box sx={{display: 'flex'}}>
        <Typography variant="h6">My Shopping Cart</Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        {items.map((item, index) => {
          return (
            <Box key={item._id} sx={{padding: 1}}>
              <CartItem
                index={index}
                id={item._id}
                amount={item.amount}
                productId={item.product.id}
                imageUrl={item.product.imageUrl}
                name={item.product.name}
                genre={item.product.genre}
                price={item.product.price}
                currency={item.product.currency}
                inventory={item.product.inventory}
                description={item.product.description}
                afterRemoved={() => {
                  fetchData();
                  reloadCartNumber();
                }}
                afterTotalPriceUpdated={handleItemTotalPriceUpdated}
              />
            </Box>
          );
        })}
      </Box>
      <Box sx={{textAlign: 'right'}}>
        <Box sx={{padding: 1}}>
          <Card sx={{display: 'inline-flex'}}>
            <Box sx={{display: 'inline-flex', alignItems: 'center', padding: 2}}>
              <Typography variant="h6">Total price:</Typography>
              <Typography variant="h4" color='secondary' sx={{ml: 1}}>
                ${toPriceStr(totalPrice)}
              </Typography>
              <Button
                variant='contained'
                sx={{ml: 3}}
                color='secondary'
                disableElevation
                onClick={() => history.push('/checkout')}
              >
                Check out
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default Cart;
