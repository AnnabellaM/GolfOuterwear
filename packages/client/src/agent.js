class Agent {
  baseUrl = 'http://localhost:3000/api';

  // list products
  listProducts({keyword, limit, offset}) {
    const query = {
      keyword: keyword || '',
      limit: limit || 20,
      offset: offset || 0,
    }
    return fetch(
      `${this.baseUrl}/products?${new URLSearchParams(query)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  // delete product
  deleteProduct(id) {
    return fetch(
      `${this.baseUrl}/products/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  createCustomer(info) {
    return fetch(
      `${this.baseUrl}/customers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: info
      }
    )
  }

  fetchCustomer(email, pass) {
    return fetch(
      `${this.baseUrl}/customers?email=${email}&password=${pass}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

}

export const agent = new Agent();
