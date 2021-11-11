import ProductItem from "./ProductItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {agent} from "../../agent";

const ProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loadedTotalPage, setTotalPage] = useState(1);
  const history = useHistory();
  const location = useLocation();

  const ITEM_PER_PAGE = 5;

  let keyword = new URLSearchParams(location.search).get('keyword') || '';
  let page = +(new URLSearchParams(location.search).get('page')) || 1;

  useEffect(() => {
    // show loading page
    setIsLoading(true);

    // list products by calling api
    fetchData();
  }, [keyword, page]);

  const fetchData = () => {
    agent.listProducts({keyword: keyword, limit: ITEM_PER_PAGE, offset: (page - 1) * ITEM_PER_PAGE})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedProducts(() => data.data);
        setTotalPage(Math.ceil(data.pagination.total / ITEM_PER_PAGE));
      });
  }

  const onPageChange = (e, p) => {
    const params = new URLSearchParams({keyword, page: p});
    history.push({pathname: location.pathname, search: params.toString()});
  }

  if (isLoading) {
    return (
      <div>loading...</div>
    );
  }

  return (
    <Container maxWidth="lg" sx={{py: 3}}>

      {/*product list*/}
      <Grid container spacing={2}>
        {loadedProducts.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              description={product.description}
              stock={product.stock}
              currency={product.currency}
              price={product.price}
              unit={product.unit}
              afterProductDeleted={fetchData}
            />
          );
        })}
      </Grid>

      {/*pagination*/}
      <Box sx={{p: 3}}>
        <Pagination
          page={page}
          count={loadedTotalPage}
          sx={{display: 'flex', justifyContent: 'center'}}
          onChange={onPageChange}
        />
      </Box>
    </Container>
  )
};

export default ProductList;
