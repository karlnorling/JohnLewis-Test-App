import fetch, { Response } from 'node-fetch';
import { JohnLewis } from '../../types/JohnLewis';

export class JohnLewisApi {
  private API_URI: string;
  private API_KEY: string;
  constructor(BASE_URI: string, VERSION: string, API_KEY: string) {
    this.API_URI = `${BASE_URI}${VERSION}`;
    this.API_KEY = API_KEY;
  }

  private api<T>(url: string): Promise<T> {
    return fetch(url)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json().then((data) => data as T);
      });       
  }

  public productSearch(query: string, pageSize: string): Promise<JohnLewis.SearchResult> {
    const url = `${this.API_URI}/products/search?q=${query}&pageSize=${pageSize}&key=${this.API_KEY}`;
    return this.api<JohnLewis.SearchResult>(url);
  }

  public productDetail(id: number): Promise<JohnLewis.Product> {
    const url = `${this.API_URI}/products/${id}?key=${this.API_KEY}`;
    return this.api<JohnLewis.Product>(url);
  }
}
