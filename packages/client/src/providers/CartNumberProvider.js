import React, {useContext, useState, useEffect} from "react";
import {agent} from "../agent";

const CartNumberContext = React.createContext(null);

const CartNumberProvider = ({children}) => {
  const [cartNumber, setCartNumber] = useState(0);

  useEffect(() => {
    reloadCartNumber();
  }, []);

  const reloadCartNumber = () => {
    agent.getNumberOfItemsInCart()
      .then((res) => {
        if (res.status === 200) {
          setCartNumber(res.body.value);
          return;
        }
        setCartNumber(0);
      });
  };

  return (
    <CartNumberContext.Provider
      value={{
        reloadCartNumber,
        cartNumber,
      }}
    >
      {children}
    </CartNumberContext.Provider>
  );
};

const useCartNumber = () => {
  const survey = useContext(CartNumberContext);
  if (survey == null) {
    throw new Error("useCartNumber() called outside of a CartNumberProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return survey;
};

export {CartNumberProvider, useCartNumber};
