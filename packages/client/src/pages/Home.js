import ProductItem from "../components/home/ProductItem";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const DUMMY_DATA = {
  data: [
    {
      "id": "6171c61b6586b8e2487b40b9",
      "__v": "0",
      "createdAt": "21/10/2021 19:57:17.468",
      "currency": "USD",
      "description": "",
      "imageUrl": "https://img.rasset.ie/001639a1-1600.jpg",
      "isActive": "false",
      "name": "Golf cap (Red)",
      "price": "60",
      "stock": "20",
      "unit": "piece",
      "updatedAt": "21/10/2021 21:34:42.225"
    },
    {
      "id": "6171d0bedd5c12e112215a1d",
      "__v": "0",
      "createdAt": "21/10/2021 20:42:42.621",
      "currency": "USD",
      "description": "123",
      "imageUrl": "https://img.rasset.ie/001639a1-1600.jpg",
      "isActive": "false",
      "name": "Golf cap (Red)",
      "price": "60",
      "stock": "20",
      "unit": "piece",
      "updatedAt": "21/10/2021 21:34:50.914"
    },
    {
      "id": "6171d0c9992e2c4e9072d02e",
      "__v": "0",
      "createdAt": "21/10/2021 20:42:52.189",
      "currency": "USD",
      "description": "123",
      "imageUrl": "https://img.rasset.ie/001639a1-1600.jpg",
      "isActive": "true",
      "name": "Golf cap (Red)",
      "price": "60",
      "stock": "20",
      "unit": "piece",
      "updatedAt": "21/10/2021 20:42:52.189"
    },
    {
      "id": "6171d10025f2f6c9364762b1",
      "__v": "0",
      "createdAt": "21/10/2021 20:43:49.379",
      "currency": "USD",
      "description": "123",
      "imageUrl": "https://img.rasset.ie/001639a1-1600.jpg",
      "isActive": "true",
      "name": "Golf cap (Red)",
      "price": "60",
      "stock": "20",
      "unit": "piece",
      "updatedAt": "21/10/2021 20:43:49.379"
    },
    {
      "id": "6171d1786041f67480cb9af9",
      "__v": "0",
      "createdAt": "21/10/2021 20:45:44.859",
      "currency": "USD",
      "description": "fewqfewqfewqfewqfewqfewqfefewqfewqfewqfewqfwqwqfewqfewqfewqfewqfewqfewqfewqfewqfewqfewqfewqfewqfewqfewqfewqfewqfewq",
      "imageUrl": "https://img.rasset.ie/001639a1-1600.jpg",
      "isActive": "true",
      "name": "Golf cap (Red)",
      "price": "60",
      "stock": "20",
      "unit": "piece",
      "updatedAt": "21/10/2021 20:45:44.859"
    },
    {
      "id": "6171d1876041f67480cb9afb",
      "__v": "0",
      "createdAt": "21/10/2021 20:45:59.573",
      "currency": "USD",
      "description": "fewqfewq",
      "imageUrl": "https://img.rasset.ie/001639a1-1600.jpg",
      "isActive": "true",
      "name": "Golf cap (Red)",
      "price": "60",
      "stock": "20",
      "unit": "piece",
      "updatedAt": "21/10/2021 20:45:59.573"
    },
    {
      "id": "6171d1886041f67480cb9afd",
      "__v": "0",
      "createdAt": "21/10/2021 20:46:00.288",
      "currency": "USD",
      "description": "fewqfewq",
      "imageUrl": "https://img.rasset.ie/001639a1-1600.jpg",
      "isActive": "true",
      "name": "Golf (Red)",
      "price": "60",
      "stock": "20",
      "unit": "piece",
      "updatedAt": "21/10/2021 20:46:00.288"
    },
    {
      "id": "6171d18c6041f67480cb9aff",
      "__v": "0",
      "createdAt": "21/10/2021 20:46:04.313",
      "currency": "USD",
      "description": "",
      "imageUrl": "https://img.rasset.ie/001639a1-1600.jpg",
      "isActive": "true",
      "name": "Golf cap (Red)",
      "price": "60",
      "stock": "20",
      "unit": "piece",
      "updatedAt": "21/10/2021 20:46:04.313"
    },
    {
      "id": "6171da0a32aceba1c2bd2d80",
      "__v": "0",
      "createdAt": "21/10/2021 21:22:18.83",
      "currency": "USD",
      "description": "fewqfewq",
      "imageUrl": "https://img.rasset.ie/001639a1-1600.jpg",
      "isActive": "true",
      "name": "Golf cap (Red)",
      "price": "60",
      "stock": "20",
      "unit": "piece",
      "updatedAt": "21/10/2021 21:22:18.83"
    },
    {
      "id": "6171da9fba349075e8a04898",
      "__v": "0",
      "createdAt": "21/10/2021 21:24:47.292",
      "currency": "RMB",
      "description": "White",
      "imageUrl": "https://golf-shirt-white.jpeg",
      "isActive": "false",
      "name": "Golf shirt (White)",
      "price": "128",
      "stock": "11",
      "unit": "piece",
      "updatedAt": "21/10/2021 21:34:32.133"
    },
  ],
  pagination: {
    total: 0,
  }
}

function Home() {
  return (
    <div>
      <Container maxWidth="lg" sx={{py: 3}}>
        <Grid container spacing={2}>
          {DUMMY_DATA.data.map((product) => {
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
