import React from 'react';
import { JohnLewis } from '../../../types/JohnLewis';
import styled from 'styled-components';
import { Loading } from '../util/Loading';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query'

const ProductWrapper = styled.section`
  margin: 0;
  padding: 0;
  background: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const PageTitle = styled.h1`
  font-weight: 100;
  width: 100%;
  margin: 0;
  padding: 20px 0;
  text-align: center;
  text-transform: capitalize;
  color: #999;
  font-size: 26px;
  background: #f9f9f9;
  border-bottom: 1px solid #ccc;
  flex: 0 0 100%;
`;

const BackArrow = styled(Link)`
  color: #999;
  float: left;
  position: relative;
  left: 150px;
  top: 10px;
  font-weight: 100;
  text-decoration: none;
  border-top: 2px solid #777;
  border-left: 2px solid #777;
  width: 20px;
  height: 20px;
  transform: rotate(-45deg);
`;

const SlideImage = styled.img`
  padding: 0 0 40px 0;
  background: #fff;
`;

const CarouselWrapper = styled(Carousel)`
  flex: 0 0 40%;
`;

const ProductInformation = styled.ul`
  list-style: none;
  padding 0;
  margin: 0;
  flex: 0 0 60%;
`;

const ProductDescription = styled.div`
  height: 7em;
  white-space: wrap;
  overflow: hidden;
  p {
    color: #777;
    font-size: 20px;
    font-weight: 400;
    margin: 2px 0;

    strong {
      font-weight: 800;
    }
  }
`;

const Code = styled.p`
  margin: 2px 0;
  padding: 0;
  color: #777;
  font-size: 20px;
  font-weight: 400;
`;

const ProductInformationItem = styled.li`
  list-style: none;
  margin: 10px 20px;
`;

const ProductInformationTitle = styled.h3`
  font-size: 32px;
  font-weight: 100;
  color: #999;
  margin: 0 0 20px 0;
  padding: 0;
`;

const Features = styled.ol`
  margin: 0;
  padding 0;
  list-style: none;
`;

const Feature = styled.li`
  margin: 0;
  padding 0;
  list-style: none;
`;

const Attribute = styled.dl`
  margin: 0;
  padding 0;
  list-style: none;
  color: #999;
  font-size: 18px;
  display: flex;
  line-height: 25px;
`;

const AttributeTitle = styled.dt`
  float: left;
  width: 50%;
  margin: 0;
  padding 20px 0 20px 10px;
  border-top: 1px solid #ccc;
  font-weight: 400;
  border-box: box-sizing;
`;

const AttributeDesc = styled.dd`
  float: right;
  width: 50%;
  margin: 0;
  padding: 20px 10px;
  border-top: 1px solid #ccc;
  text-align: right;
  box-sizing: border-box;
  font-weight: 100;
`;

const carouselSettings = {
  showThumbs: false,
  infiniteLoop: false,
  showStatus: false,
  showIndicators: false,
  showArrows: true
};

const getSlides = (product: JohnLewis.Product): JSX.Element[] | void => {
  if (product && product.media && product.media.images && product.media.images.urls) {
    const altText = product.media.images.altText;
    return product.media.images.urls.map((url: string, index: number) => {
      return (<SlideImage key={index} src={`https:${url})`} alt={altText} />);
    });
  }
}

const getProductSpecifications = (details: JohnLewis.Details | void): JSX.Element[] | JSX.Element => {
  if (details && details.features) {
    return details.features.map((feature: JohnLewis.Feature, i: number) => {
      const attributes = feature.attributes.map((attribute: JohnLewis.Attribute, j: number) => {
        return (<Attribute key={j}>
            <AttributeTitle>{attribute.name}</AttributeTitle>
            <AttributeDesc>{attribute.value}</AttributeDesc>
          </Attribute>);
      });
      const featureElement = (feature.groupName && feature.groupName !== '') ? (<Feature><h4>feature.groupName</h4><Attribute>{attributes}</Attribute></Feature>) : (<Feature>{attributes}</Feature>);
      return (<Features key={i}>{featureElement}</Features>);
    });
  }
  return (<Features>No features</Features>);
}

const fetchProductData = async (id: number) => {
  const result = await fetch(`/api/product/${id}`);
  return result.json();
}

export const Product = ({ match }) => {
  const { params: { id } } = match;
  const { isLoading, error, data: product } = useQuery(['productData', id], () => fetchProductData(id));

  if (error) {
    return (<div>{error}</div>);
  }

  if (isLoading) {
    return (<Loading />);
  }

  if (product) {
    const { details, code, title, defaultCategory } = product;
    const { productInformation } = details;
    const slides = getSlides(product);
    const specifications = getProductSpecifications(details);
    const carousel = slides ? <CarouselWrapper {...carouselSettings}>{slides}</CarouselWrapper> : null;
    return(
      <ProductWrapper>
        <PageTitle>
          <BackArrow to={`/browse/${defaultCategory.name.toLowerCase()}/20`}>{' '}</BackArrow>
          {title}
        </PageTitle>
        {carousel}
        <ProductInformation>
          <ProductInformationItem>
            <ProductInformationTitle>Product information</ProductInformationTitle>
            <Code>Product code: {code}</Code>
            <ProductDescription dangerouslySetInnerHTML={{__html: productInformation}} />
          </ProductInformationItem>
          <ProductInformationItem>
            <ProductInformationTitle>Product Specification</ProductInformationTitle>
            {specifications}
          </ProductInformationItem>
        </ProductInformation>
      </ProductWrapper>);
  }

  return null;
}
