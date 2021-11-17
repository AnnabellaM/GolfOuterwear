class Agent {
  baseUrl = 'http://localhost:3001/api';

  // format image url
  formatImageUrl(imageUrl) {
    return `${this.baseUrl}/files${imageUrl}`;
  }

  getToken() {
    return `Bearer ${localStorage.getItem('token')}`;
  }

  // upload image
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `${this.baseUrl}/files/upload`,
      {
        method: 'POST',
        headers: {
          'Authorization': this.getToken(),
        },
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
          'Content-Type': 'application/json',
          'Authorization': this.getToken(),
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
          'Content-Type': 'application/json',
          'Authorization': this.getToken(),
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
          'Content-Type': 'application/json',
          'Authorization': this.getToken(),
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
          'Content-Type': 'application/json',
          'Authorization': this.getToken(),
        },
      }
    );
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }

  // get number of items in cart
  async getNumberOfItemsInCart() {
    const response = await fetch(
      `${this.baseUrl}/cart/items/number`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken(),
        },
      }
    );
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }

  // get cart
  async getCart() {
    const response = await fetch(
      `${this.baseUrl}/cart`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken(),
        }
      }
    )
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }

  // change product amount in cart
  async changeProductAmountInCart(productId, amount) {
    const response = await fetch(
      `${this.baseUrl}/cart/products/${productId}/amount`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken(),
        },
        body: JSON.stringify({amount})
      }
    )
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }

  // change product amount in cart
  async removeProductFromCart(productId) {
    const response = await fetch(
      `${this.baseUrl}/cart/products/${productId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken(),
        },
      }
    )
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }

  // create order
  async createOrder(data) {
    const response = await fetch(
      `${this.baseUrl}/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken(),
        },
        body: JSON.stringify(data),
      }
    );
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }

  // list orders
  async listOrders({limit, offset}) {
    const query = {
      limit: limit || 20,
      offset: offset || 0,
    }
    const response = await fetch(
      `${this.baseUrl}/orders?${new URLSearchParams(query)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken(),
        }
      }
    )
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
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
      }
    );
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }

  // customer sign in
  async customerSignIn(email, password) {
    const response = await fetch(
      `${this.baseUrl}/customers/sign-in`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  // get customer info
  async getCustomerInfo() {
    const response = await fetch(
      `${this.baseUrl}/customers/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken(),
        }
      }
    );
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }

  // admin sign in
  async adminSignIn(email, password) {
    const response = await fetch(
      `${this.baseUrl}/admins/sign-in`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  // get admin info
  async getAdminInfo() {
    const response = await fetch(
      `${this.baseUrl}/admins/me`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getToken(),
        }
      }
    );
    return {
      status: response.status,
      body: response.status === 400 ? {message: await response.text()} : await response.json(),
    }
  }
}

export const agent = new Agent();
