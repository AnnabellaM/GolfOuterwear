import {useLocation, useHistory} from "react-router-dom";

import AppBar from "../components/layout/AppBar";
import ProductList from "../components/home/ProductList";
import {useState} from "react";

function Home() {
  const history = useHistory();
  const location = useLocation();

  const [keyword, setKeyword] = useState('');
  const [genre, setGenre] = useState('');

  const onSearchByKeyword = (k) => {
    setKeyword(k);
    const params = new URLSearchParams({keyword: k, genre: genre, page: '1'});
    history.push({pathname: location.pathname, search: params.toString()});
  }

  const onFilterByGenre = (g) => {
    setGenre(g);
    const params = new URLSearchParams({keyword: keyword, genre: g, page: '1'});
    history.push({pathname: location.pathname, search: params.toString()});
  }

  return (
    <div>
      {/*app bar*/}
      <AppBar
        searchProducts={onSearchByKeyword}
        filterProducts={onFilterByGenre}
      />

      {/*product list*/}
      <ProductList />
    </div>
  );
}

export default Home;
