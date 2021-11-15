import ProductList from "../components/home/ProductList";
import {useEffect, useState} from "react";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // show loading page
    setIsLoading(true);

    // list products by calling api
    fetchData();
  }, []);

  const fetchData = () => {

  }

  if (isLoading) {
    return (
      <div>loading...</div>
    );
  }

  // Card items
  return (
    <div>

    </div>
  )
}

export default ProductList;
