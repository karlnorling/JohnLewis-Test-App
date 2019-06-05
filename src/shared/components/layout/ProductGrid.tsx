import React from 'react';
import fetch, { Response } from 'node-fetch';
import { JohnLewis } from '../../../types/JohnLewis';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Loading } from '../util/Loading';

interface MatchParams {
  query: string;
  size: number;
}

interface Match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

interface RouteComponentProps<P> {
  match: Match<P>;
  location: Location;
  history: History;
  staticContext?: any;
}

interface Props extends RouteComponentProps<MatchParams> {}

interface State {
  query: string;
  searchResult?: JohnLewis.SearchResult;
  hasResults: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

const Products = styled.ol`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  font-size: 14px;

  a {
    text-decoration: none;
    color: #333;
  }
`;

const Product = styled.li`
  background: #fff;
  width: 25%;
  padding: 20px;
  margin: 0;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
  list-style: none;
  &:nth-of-type(4n) {
    border-right: none;
  }
`;

const ProductImage = styled.img`
  max-height: 250px;
  margin: 0 auto;
  display: block;
`;

const PageTitle = styled.h1`
  font-weight: 100;
  width: 100%;
  margin: 0;
  padding: 20px 0;
  text-align: center;
  text-transform: capitalize;
  color: #999;
  font-size: 20px;
`;

const Title = styled.h2`
  font-weight: 400;
  font-size: 14px;
  margin: 10px 0 3px 0;
`;

const Price = styled.p`
  font-weight: 800;
  margin: 0;
  padding: 0;
`;

const Strike = styled.span`
  text-decoration: line-through;
`;

export class ProductGrid extends React.Component<Props, State> {
  state: State = {
    query: '',
    hasResults: false,
    isLoading: true,
    hasError: false,
    errorMessage: ''
  };

  private fetchProducts = async (query: string, size: number) => {
    const response = await fetch(`/api/category/${query}/size/${size}`)
      .then(async (response: Response) => {
      if (!response.ok) {
        console.error(response.statusText);
        this.setState({
          query,
          isLoading: false,
          hasError: true,
          errorMessage: response.statusText
        });
      }
      return response.json().then((data) => data as JohnLewis.SearchResult);
    });
    this.setState({
      query,
      hasResults: true,
      searchResult: response,
      isLoading: false
    });
  }

  private generateProductList = (searchResult: JohnLewis.SearchResult) => {
    if (searchResult && searchResult.products) {
      return searchResult.products.map((product: JohnLewis.Product) => {
        const price = this.renderPrice(product.price);
        return (
          <Product key={product.productId}>
            <Link to={`/product/${product.productId}`}>
              <ProductImage src={product.image} />
              <Title>{product.brand} {product.title}</Title>
              {price}
            </Link>
          </Product>
        );
      });
    }
    return (<div>No results</div>);
  }

  private getPrice = (price: JohnLewis.Price, symbol: string): JSX.Element => {
    if (typeof price.now === 'string') {
      return (<Price>{symbol}{price.now}</Price>);
    }
    return (<Price>Was: {symbol}<Strike>{price.now.from}</Strike> now: {symbol}{price.now.to}</Price>);
  }

  private renderPrice = (price: JohnLewis.Price): JSX.Element => {
    switch (price.currency) {
      case 'GBP':
        return this.getPrice(price, '£');
      default:
        return this.getPrice(price, '');
    }
  }

  public componentDidMount() {
    const { params } = this.props.match;
    this.fetchProducts(params.query , params.size);
  }

  public render() {
    const { match: { params } } = this.props;

    if (this.state.hasError) {
      return (<div>{this.state.errorMessage}</div>);
    }

    if (this.state.isLoading) {
      return (<Loading>Loading Product</Loading>);
    }

    if (this.state.hasResults && this.state.searchResult) {
      const list = this.generateProductList(this.state.searchResult);
      const title = `${params.query}s (${this.state.searchResult.results})`;
      return (
        <section>
          <PageTitle>{title}</PageTitle>
          <Products>{list}</Products>
        </section>
      );
    }

    return (<div>Something went wrong</div>);
  }
}