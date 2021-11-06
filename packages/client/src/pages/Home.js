import {useLocation, useHistory} from "react-router-dom";

import AppBar from "../components/layout/AppBar";
import ProductList from "../components/home/ProductList";

function Home() {
  const history = useHistory();
  const location = useLocation();

  const onSearchByKeyword = (k) => {
    const params = new URLSearchParams({keyword: k, page: '1'});
    history.push({pathname: location.pathname, search: params.toString()});
  }

  return (
    <div>
      {/*app bar*/}
      <AppBar searchProducts={onSearchByKeyword}/>

      {/*product list*/}
      <ProductList />
    </div>
  );
}

export default Home;
