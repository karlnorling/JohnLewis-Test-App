import React from 'react';
import styled from 'styled-components';
import { PaginationCalculator } from '../../util/PaginationCalculator';
const Navigation = styled.nav`
  padding: 20px;
  background: #f1f1f1;
  width: 100%;
  box-sizing: border-box;
`;

const NavItems = styled.ol`
  padding: 0;
  margin: 0 auto;
  width: max-content;
  list-style: none;
  display: flex;
  flex-direction: row;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 15px 0 0;
  padding: 0;
  font-size: 20px;

  a {
    text-decoration: none;
    color: #999;

    &:visited,
    &:active {
      color: #555;
    }

    &:hover: {
      background: pink;
      color: #333;
    }
  }
`;


export const Pagination = ({ currentPage, setPage, pagesAvailable, size, query }) => {
  const onClick = (ev) => {
    ev.preventDefault();
    const hrefParts = ev.target.href.split('/');
    const page = hrefParts[hrefParts.length - 1];
    setPage(Number(page));
  }

  const paginationCalculator = new PaginationCalculator(pagesAvailable, 3);
  const pages = paginationCalculator.getPages(currentPage);

  const navItems = pages.map((page: number|string) => {
    if (page === 'PREVIOUS_PAGE') {
      return <NavItem key={page}><a href={`/browse/${query}/${size}/${currentPage-1}`} onClick={onClick}>Previous</a></NavItem>;
    }
    if (page === 'NEXT_PAGE') {
      return <NavItem key={page}><a href={`/browse/${query}/${size}/${currentPage+1}`} onClick={onClick}>Next</a></NavItem>
    }
    if (page === currentPage) {
     return <NavItem key={page}>{page}</NavItem>
    }
    return <NavItem key={page}><a href={`/browse/${query}/${size}/${page}`} onClick={onClick}>{page}</a></NavItem>;
  });
  return (<Navigation><NavItems>{navItems}</NavItems></Navigation>);
};