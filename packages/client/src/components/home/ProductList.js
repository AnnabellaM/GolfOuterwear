import ProductItem from "./ProductItem";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {agent} from "../../agent";
import CreateProductDialog from "./CreateProductDialog";
import {useAuth} from "../../providers/AuthProvider";

const ProductList = () => {
  const history = useHistory();
  const location = useLocation();
  const {role} = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loadedTotalPage, setTotalPage] = useState(1);

  const ITEM_PER_PAGE = 5;

  let keyword = new URLSearchParams(location.search).get('keyword') || '';
  let genre = new URLSearchParams(location.search).get('genre') || '';
  let page = +(new URLSearchParams(location.search).get('page')) || 1;

  useEffect(() => {
    // show loading page
    setIsLoading(true);

    // list products by calling api
    fetchData();
  }, [keyword, genre, page]);

  const fetchData = () => {
    agent.listProducts({
      keyword: keyword,
      genre: genre,
      limit: ITEM_PER_PAGE,
      offset: (page - 1) * ITEM_PER_PAGE
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            setIsLoading(false);
            setLoadedProducts(() => res.body.data);
            setTotalPage(Math.ceil(res.body.pagination.total / ITEM_PER_PAGE));
            return;
          case 400:
            alert(res.body.message);
            return;
        }
        alert('Unexpected error');
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
      {/*create product*/}
      {
        role === 'admin' ?
          (
            <Box sx={{mb: 2, textAlign: 'right'}}>
              <CreateProductDialog afterProductCreated={fetchData}/>
            </Box>
          ) :
          (
            <></>
          )
      }


      {/*product list*/}
      <Grid container spacing={2}>
        {loadedProducts.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              genre={product.genre}
              price={product.price}
              currency={product.currency}
              inventory={product.inventory}
              description={product.description}
              afterProductUpdated={fetchData}
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
