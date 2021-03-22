import fetch, { Response } from 'node-fetch';
import { JohnLewis } from '../../types/JohnLewis';

class NetworkError extends Error {
  status: string;
  statusText: string;
  url: string;
  constructor(message: string, statusText: string, status: string, url: string) {
    super(message);
    this.statusText = statusText;
    this.status = status;
    this.url = url;
  }
};

export class JohnLewisApi {
  private API_URI: string;
  private API_KEY: string;
  constructor(BASE_URI: string, API_KEY: string) {
    this.API_URI = `${BASE_URI}`;
    this.API_KEY = API_KEY;
  }

  private api<T>(url: string): Promise<T> {
    return fetch(url)
      .then((response: Response) => {
        if (!response.ok) {
          throw new NetworkError('', response.statusText, response.status.toString(), response.url);
        }
        return response.json().then((data) => data as T);
      });       
  }

  public productSearch(query: string, pageSize: string): Promise<JohnLewis.SearchResult> {
    const url = `${this.API_URI}/search/api/rest/v2/catalog/products/search/keyword?q=${query}&pageSize=${pageSize}&key=${this.API_KEY}`;
    return this.api<JohnLewis.SearchResult>(url);
  }

  public productDetail(id: number): Promise<JohnLewis.Product> {
    const url = `${this.API_URI}/mobile-apps/api/v1/products/${id}?key=${this.API_KEY}`;
    return this.api<JohnLewis.Product>(url);
  }
}
