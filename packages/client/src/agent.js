class Agent {
  baseUrl = 'http://localhost:3000/api';

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
}

export const agent = new Agent();
