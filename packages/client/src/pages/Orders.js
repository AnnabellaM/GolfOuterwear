import {useEffect, useState} from "react";
import {agent} from "../agent";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OrderItem from "../components/order/OrderItem";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // show loading page
    setIsLoading(true);

    // list products by calling api
    fetchData();
  }, []);

  const fetchData = () => {
    agent.listOrders({
      limit: 20,
      offset: 0,
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            setIsLoading(false);
            setOrders(() => res.body.data);
            console.log(res.body);
            return;
          case 400:
            alert(res.body.message);
            return;
        }
        alert('Unexpected error');
      });
  }

  if (isLoading) {
    return (
      <div>loading...</div>
    );
  }

  return (
    <Box sx={{padding: 2}}>
      <Box sx={{display: 'flex'}}>
        <Typography variant="h6">Order Histories</Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        {
          orders.map((order) => {
            return (
              <Box sx={{p: 1}}>
                <Card>
                  <Grid xs={12}>
                    {
                      order.items.map((item) => {
                        return (
                          <Box key={item._id} sx={{padding: 1}}>
                            <OrderItem
                              id={item._id}
                              amount={item.amount}
                              productId={item.product._id}
                              imageUrl={item.product.imageUrl}
                              name={item.product.name}
                              genre={item.product.genre}
                              price={item.product.price}
                              currency={item.product.currency}
                              inventory={item.product.inventory}
                              description={item.product.description}
                            />
                          </Box>
                        );
                      })
                    }
                    <Box sx={{p: 1}}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <Box sx={{display: 'inline-flex'}}>
                              <Typography variant='body1' fontWeight='bold'>Ordered At:</Typography>
                              <Typography variant='body1'
                                          sx={{ml: 1}}>{new Date(order.createdAt).toLocaleString()}</Typography>
                            </Box>
                            <Box sx={{display: 'inline-flex'}}>
                              <Typography variant='body1' fontWeight='bold'>Payment:</Typography>
                              <Typography variant='body1' sx={{ml: 1}}>{order.payment.method}</Typography>
                            </Box>
                            <Box sx={{display: 'inline-flex'}}>
                              <Typography variant='body1' fontWeight='bold'>Ship to:</Typography>
                              <Typography variant='body1' sx={{ml: 1}}>{order.shipment.address}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={6}/>
                        <Grid item xs={6}/>
                        <Grid item xs={6} sx={{textAlign: 'right'}}>
                          <Box sx={{display: 'inline-flex'}}>
                            <Typography variant='h5'>Total:</Typography>
                            <Typography variant='h6' color='secondary' sx={{ml: 1}}>${order.totalPrice}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Card>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}

export default Orders;
