import { Pagination } from './Pagination';
import * as React from 'react';
import { mount } from 'enzyme';

describe('<Pagination />', () => {
  test('renders Pagination component with navigation elements', () => {
    const setPage = jest.fn();
    const currentPage = 1;
    const pagesAvailable = 20;
    const size = 20;
    const query = 'hobs';
    const pagination = mount(<Pagination currentPage={currentPage} setPage={setPage} pagesAvailable={pagesAvailable} size={size} query={query} />);
    expect(pagination).toBeDefined();
    expect(pagination.find('ol')).toBeDefined();
    expect(pagination.find('li').length).toEqual(11);
    
    const newCurrentPage =3
    pagination.setProps({
      currentPage: newCurrentPage,
      setPage,
      pagesAvailable,
      size,
      query
    });
    
    pagination.find('li').forEach((node, index) => {
      const a = node.find('a');
      if (index + 1 === newCurrentPage) {
        expect(node.text()).toEqual("3");
      } else if (a.text() === "Next") {
        expect(a.getElement().props.href).toEqual(`/browse/${query}/${size}/${newCurrentPage+1}`);
      } else if (a.text() === "Previous") {
        expect(a.getElement().props.href).toEqual(`/browse/${query}/${size}/${newCurrentPage-1}`);
      } else if (index+1 === pagination.find('li').length) { 
        expect(a.getElement().props.href).toEqual(`/browse/${query}/${size}/${pagesAvailable}`);
      } else {
        expect(a.getElement().props.href).toEqual(`/browse/${query}/${size}/${index+1}`);
      }
    });
  });
});