import * as React from 'react';
import {agent} from "../../agent";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";

const AddProductToCartButton = (props) => {

  const handleSubmit = async () => {
    agent.addProductToCart(props.id)
      .then((res) => {
        switch (res.status) {
          case 200:
            if (!!props.afterProductAdded) {
              props.afterProductAdded();
            }
            return;
          case 400:
            alert(res.body.message);
            return;
        }
        alert('Unexpected error');
      });
  }

  return (
    <IconButton onClick={handleSubmit}>
      <AddShoppingCartIcon/>
    </IconButton>
  );
}

export default AddProductToCartButton;
