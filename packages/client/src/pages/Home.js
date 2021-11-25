import {useLocation, useHistory, Switch, Route, useRouteMatch} from "react-router-dom";

import AppBar from "../components/layout/AppBar";
import ProductList from "../components/home/ProductList";
import {useState} from "react";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Profile from "./Profile";
import Orders from "./Orders";

function Home() {
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [keyword, setKeyword] = useState('');
  const [genre, setGenre] = useState('');

  const onSearchByKeyword = (k) => {
    setKeyword(k);
    const params = new URLSearchParams({keyword: k, genre: genre, page: '1'});
    history.push({pathname: '/', search: params.toString()});
  }

  const onFilterByGenre = (g) => {
    setGenre(g);
    const params = new URLSearchParams({keyword: keyword, genre: g, page: '1'});
    history.push({pathname: '/', search: params.toString()});
  }

  return (
    <div>
      {/*app bar*/}
      <AppBar
        searchProducts={onSearchByKeyword}
        filterProducts={onFilterByGenre}
      />

      <Switch>
        <Route path={`${match.path}cart`}>
          <Cart />
        </Route>
        <Route path={`${match.path}checkout`}>
          <Checkout />
        </Route>
        <Route path={`${match.path}profile`}>
          <Profile />
        </Route>
        <Route path={`${match.path}orders`}>
          <Orders />
        </Route>
        <Route path={match.path}>
          <ProductList />
        </Route>
      </Switch>

    </div>
  );
}

export default Home;
