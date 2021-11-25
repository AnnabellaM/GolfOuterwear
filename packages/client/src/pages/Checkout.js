import * as React from "react";
import {useEffect, useState} from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import toPriceStr from "../utils/toPriceStr";
import {agent} from "../agent";
import CheckoutItem from "../components/checkout/CheckoutItem";
import {useHistory} from "react-router-dom";
import {useCartNumber} from "../providers/CartNumberProvider";
import {useAuth} from "../providers/AuthProvider";

const Checkout = () => {
  const history = useHistory();
  const {reloadCartNumber} = useCartNumber();
  const {profile, role} = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [cardNumber, setCardNumber] = useState('1111222233334444');
  const [expires, setExpires] = useState('01/23');
  const [cvv, setCvv] = useState('111');
  const [email, setEmail] = useState(profile.email);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [totalPrice, setTotalPrice] = useState(0);

  const PAYMENT_CREDIT_CARD = 'creditcard'
  const PAYMENT_PAYPAL = 'paypal'
  const PAYMENT_APPLE_PAY = 'applepay'
  const [payment, setPayment] = useState(PAYMENT_CREDIT_CARD);

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
            setTotalPrice(tps.reduce((p, c) => p + c, 0));
            return;
          case 400:
            alert(res.body.message);
            return;
        }
        alert('Unexpected error');
      });
  }

  const handleCreateOrder = () => {
    agent.createOrder({
      payment: {
        method: payment,
        detail: payment === PAYMENT_CREDIT_CARD
          ? {
            cardNumber: cardNumber,
            expires: expires,
            cvv: cvv,
          }
          : null,
      },
      shipment: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: address,
      }
    })
      .then((res) => {
        if (res.status === 201) {
          alert('Order created!');
          reloadCartNumber();
          history.replace('/');
          return;
        }
        alert(res.body.message);
      });
  }

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
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
        <Typography variant="h6">Ready To Checkout</Typography>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        {items.map((item) => {
          return (
            <Box key={item._id} sx={{padding: 1}}>
              <CheckoutItem
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
              />
            </Box>
          );
        })}
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', mt: 1}}>
        <Typography variant="h6">Payment</Typography>
        <Box sx={{padding: 1}}>
          <Card sx={{padding: 2}}>
            <Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="payment"
                    defaultValue="creditcard"
                    name="radio-buttons-group"
                    onChange={handlePaymentChange}
                  >
                    <FormControlLabel value={PAYMENT_CREDIT_CARD} control={<Radio/>} label="Credit Card"/>
                    {
                      payment === PAYMENT_CREDIT_CARD ?
                        <Box sx={{display: 'flex', flexDirection: 'column', mb: 1}}>
                          <TextField
                            label='Card Number'
                            placeholder='1111222233334444'
                            fullWidth
                            value={cardNumber}
                            onInput={e => setCardNumber(e.target.value)}
                          />
                          <Box sx={{display: 'flex', mt: 1}}>
                            <TextField
                              label='Expires'
                              placeholder='MM/YY'
                              fullWidth
                              value={expires}
                              onInput={e => setExpires(e.target.value)}
                            />
                            <TextField
                              label='CVV'
                              placeholder='000'
                              fullWidth
                              sx={{ml: 1}}
                              value={cvv}
                              onInput={e => setCvv(e.target.value)}
                            />
                          </Box>
                        </Box>
                        : <></>
                    }
                    <FormControlLabel value={PAYMENT_PAYPAL} control={<Radio/>} label="Paypal"/>
                    <FormControlLabel value={PAYMENT_APPLE_PAY} control={<Radio/>} label="Apple Pay"/>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', mt: 1}}>
        <Typography variant="h6">Shipment</Typography>
        <Box sx={{padding: 1}}>
          <Card sx={{padding: 2, display: 'flex', flexDirection: 'column'}}>
            <Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{display: 'flex'}}>
                  <TextField
                    label='First Name'
                    fullWidth
                    value={firstName}
                    onInput={e => setFirstName(e.target.value)}
                  />
                  <TextField
                    label='Last Name'
                    fullWidth
                    sx={{ml: 1}}
                    value={lastName}
                    onInput={e => setLastName(e.target.value)}
                  />
                </Box>
                <TextField
                  label='Email'
                  fullWidth
                  sx={{mt: 1}}
                  value={email}
                  onInput={e => setEmail(e.target.value)}
                />
                <TextField
                  label='Phone'
                  fullWidth
                  sx={{mt: 1}}
                  value={phone}
                  onInput={e => setPhone(e.target.value)}
                />
                <TextField
                  label='Address'
                  fullWidth
                  sx={{mt: 1}}
                  value={address}
                  onInput={e => setAddress(e.target.value)}
                />
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
      <Box sx={{textAlign: 'right', mt: 1}}>
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
                color='primary'
                disableElevation
                onClick={() => history.goBack()}
              >
                Cancel
              </Button>
              <Button
                variant='contained'
                sx={{ml: 1}}
                color='secondary'
                disableElevation
                onClick={() => handleCreateOrder()}
              >
                Order
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

export default Checkout;
