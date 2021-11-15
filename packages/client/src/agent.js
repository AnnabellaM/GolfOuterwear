class Agent {
  baseUrl = 'http://localhost:3001/api';

  // format image url
  formatImageUrl(imageUrl) {
    return `${this.baseUrl}/files${imageUrl}`
  }

  // upload image
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `${this.baseUrl}/files/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }

  // list products
  async listProducts({keyword, genre, limit, offset}) {
    const query = {
      keyword: keyword || '',
      genre: genre || '',
      limit: limit || 20,
      offset: offset || 0,
    }
    const response = await fetch(
      `${this.baseUrl}/products?${new URLSearchParams(query)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
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

  // create product
  async createProduct(id, data) {
    const response = await fetch(
      `${this.baseUrl}/products`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }

  // update product
  async updateProduct(id, data) {
    const response = await fetch(
      `${this.baseUrl}/products/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }

  // add product to cart
  async addProductToCart(id) {
    const response = await fetch(
      `${this.baseUrl}/cart/products/${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    );
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
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
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
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
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }
}

export const agent = new Agent();
