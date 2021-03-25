import React, { useState, Fragment } from 'react';
import fetch from 'node-fetch';
import { JohnLewis } from '../../../types/JohnLewis';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Loading } from '../util/Loading';
import { Pagination } from '../util/Pagination';

import { useQuery } from 'react-query'

const Products = styled.ol`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-size: 14px;
  a {
    text-decoration: none;
    color: #333;
  }
  margin: 0;
  padding: 0;
`;

const Product = styled.li`
  background: #fff;
  width: 100%;
  padding: 20px;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
  border-right: none;
  box-sizing: border-box;
  list-style: none;
  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    border-top: 1px solid #ccc;
  }
  &:nth-child(4n) {
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
  border-bottom: 1px solid #ccc;
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

const getPrice = (price: JohnLewis.Price, symbol: string): JSX.Element => {
  if (typeof price.now === 'string') {
    return (<Price>{symbol}{price.now}</Price>);
  }
  return (<Price>Was: {symbol}<Strike>{price.now.from}</Strike> now: {symbol}{price.now.to}</Price>);
}

const renderPrice = (price: JohnLewis.Price): JSX.Element => {
  switch (price.currency) {
    case 'GBP':
      return getPrice(price, '£');
    default:
      return getPrice(price, '');
  }
}

const generateProductList = (searchResult: JohnLewis.SearchResult) => {
  if (searchResult && searchResult.products) {
    return searchResult.products.map((product: JohnLewis.Product) => {
      const price = renderPrice(product.price);
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

const fetchProducts = async (query: string, size: number, page: number) => {
  const result = await fetch(`/api/category/${query}/size/${size}/page/${page}`)
  return result.json()
}

export const ProductGrid = ({ match }) => {
  const [page, setPage] = useState(1);
  const { params } = match;
  const { query, size } = params;

  const { isLoading, error, data, isFetching } = useQuery(['productGridData', { query, size, page }], () => fetchProducts(query, size, page), { keepPreviousData : true });

  if (error) {
    return (<div>{error}</div>);
  }

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (data) {
    const list = generateProductList(data);
    const title = `${query} (${data.results})`;
    return (
      <Fragment>
        <PageTitle>{title}</PageTitle>
        <Pagination
          currentPage={page}
          setPage={setPage}
          pagesAvailable={data.pagesAvailable}
          query={query}
          size={size} />
        <Products>{list}</Products>
        <Pagination
          currentPage={page}
          setPage={setPage}
          pagesAvailable={data.pagesAvailable}
          query={query}
          size={size} />
      </Fragment>
    );
  }

  return null;
}
