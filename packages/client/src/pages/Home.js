import {useState} from 'react';

import ProductItem from "../components/home/ProductItem";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {agent} from "../agent";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState([]);

  agent.listProducts({keyword: '', limit: 20, offset: 0})
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setIsLoading(false);
      setLoadedProducts(data.data);
    })

  if (isLoading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <Container maxWidth="lg" sx={{py: 3}}>
        <Grid container spacing={2}>
          {loadedProducts.map((product) => {
            return (
              <ProductItem
                key={product.id}
                name={product.name}
                imageUrl={product.imageUrl}
                description={product.description}
                stock={product.stock}
                currency={product.currency}
                price={product.price}
                unit={product.unit}
              />
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
