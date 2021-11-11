class Agent {
  baseUrl = 'http://localhost:3001/api';

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

  // sign up
  async signUp(info) {
    const response = await fetch(
      `${this.baseUrl}/customers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
      }
    );
    return {
      status: response.status,
      body: response.status === 400 ? { message: await response.text() } : await response.json(),
    }
  }

  // sign in
  async signIn(email, password) {
    const response = await fetch(
      `${this.baseUrl}/customers/sign-in`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      }
    );
    return {
      status: response.status,
      body: response.status === 400 ? { message: await response.text() } : await response.json(),
    }
  }
}

export const agent = new Agent();
