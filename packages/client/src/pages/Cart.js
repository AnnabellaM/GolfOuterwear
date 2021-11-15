import {useEffect, useState} from "react";
import {agent} from "../agent";
import Box from "@mui/material/Box";
import CartItem from "../components/cart/CartItem";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
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
            console.log(res.body.items)
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

  // Card items
  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      {items.map((item) => {
        return (
          <Box key={item._id} sx={{padding: 1}}>
            <CartItem
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
  )
}

export default Cart;
