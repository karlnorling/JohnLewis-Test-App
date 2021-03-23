import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Item {
  clickable: boolean;
  displayName: string;
  item: string;
  type: string;
}

interface CrumbsProps {
  items: Item[];
  size: number;
}

const NavWrapper = styled.nav`
  padding: 20px;
  background: #f1f1f1;
`;

const NavItems = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const NavItem = styled.li`
  margin: 0;
  padding: 0;
`

export const Crumbs = ({ items, size }: CrumbsProps) => {
  const navigationItems = items.map((item: Item, index: number) => {
    return <NavItem key={index}><Link to={`/browse/${item.displayName.toLowerCase()}/${size}`}>{item.displayName}</Link></NavItem>;
  });
  return <NavWrapper><NavItems>{navigationItems}</NavItems></NavWrapper>
}