import {useState, useEffect} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import ProductItem from "../components/home/ProductItem";
import AppBar from "../components/layout/AppBar";
import {agent} from "../agent";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loadedTotalPage, setTotalPage] = useState(1);
  const history = useHistory();
  const location = useLocation();

  const ITEM_PER_PAGE = 5;

  let keyword = new URLSearchParams(location.search).get('keyword') || '';
  let page = +(new URLSearchParams(location.search).get('page')) || 1;

  useEffect(() => {
    setIsLoading(true);
    agent.listProducts({keyword: keyword, limit: ITEM_PER_PAGE, offset: (page - 1) * ITEM_PER_PAGE})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedProducts(() => data.data);
        setTotalPage(Math.ceil(data.pagination.total / ITEM_PER_PAGE));
      });
  }, [keyword, page])

  const onPageChange = (e, p) => {
    const params = new URLSearchParams({keyword, page: p});
    history.push({pathname: location.pathname, search: params.toString()});
  }

  if (isLoading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div>
      <Container maxWidth="lg" sx={{py: 3}}>
        {/*product list*/}
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
    </div>
  );
}

export default Home;
