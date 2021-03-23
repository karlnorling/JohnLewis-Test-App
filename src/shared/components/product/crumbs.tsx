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
  title: string;
}

const NavWrapper = styled.nav`
  padding: 20px;
  background: #f1f1f1;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
`;

const NavItems = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
`;

const NavItem = styled.li`
  margin: 0 15px 0 0;
  padding: 0;
  font-size: 22px;

  a {
    text-decoration: none;
    color: #555;

    &:visited,
    &:active {
      color: #555;
    }

    &:hover: {
      background: pink;
      color: #333;
    }
  }

  &:after {
    border: solid #555;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 6px;
    margin-top: -1px;
    transform: rotate(-45deg);
    content: ' ';
    position: relative;
    top: -1px;
    left: 3px;
  }
  &:last-child:after {
    display: none;
  }
`

export const Crumbs = ({ items, size, title }: CrumbsProps) => {
  const navigationItems = items.map((item: Item, index: number) => {
    return <NavItem key={index}><Link to={`/browse/${item.displayName.toLowerCase()}/${size}`}>{item.displayName}</Link></NavItem>;
  });
  const current = <NavItem>{title}</NavItem>
  return <NavWrapper><NavItems>{navigationItems}{current}</NavItems></NavWrapper>
}