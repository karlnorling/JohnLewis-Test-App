import React from 'react';
import { JohnLewis } from '../../../types/JohnLewis';
import styled from 'styled-components';
import { Loading } from '../util/Loading';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

interface MatchParams {
  id: string;
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
  id: string;
  product?: JohnLewis.Product;
  hasProduct: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

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

const carouselSettings = {
  showThumbs: false,
  infiniteLoop: false,
  showStatus: false,
  showIndicators: false,
  showArrows: true
};

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

export class Product extends React.Component<Props, State> {
  state: State = {
    id: '',
    hasProduct: false,
    isLoading: true,
    hasError: false,
    errorMessage: ''
  };
  
  private fetchProduct = async (id: string) => {
    const response = await fetch(`/api/product/${id}`)
      .then(async (response: Response) => {
      if (!response.ok) {
        console.error(response.statusText);
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage: response.statusText
        });
      }
      return response.json().then((data) => data as JohnLewis.Product);
    });
    console.log(response);
    this.setState({
      id,
      product: response,
      hasProduct: true,
      isLoading: false,
      hasError: false
    });
  }

  private getSlides = (product: JohnLewis.Product): JSX.Element[] | void => {
    if (product && product.media && product.media.images && product.media.images.urls) {
      const altText = product.media.images.altText;
      return product.media.images.urls.map((url: string) => {
        return (<SlideImage key={url} src={`https:${url})`} alt={altText} />);
      });
    }
  }

  private getProductSpecifications = (details: JohnLewis.Details | void): JSX.Element[] | JSX.Element => {
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

  public componentDidMount() {
    const { params } = this.props.match;
    this.fetchProduct(params.id);
  }

  public render() {
    if (this.state.hasError) {
      return (<div>{this.state.errorMessage}</div>);
    }

    if (this.state.isLoading) {
      return (<Loading>Loading Product</Loading>);
    }

    if (this.state.hasProduct && this.state.product) {
      const { product } = this.state;
      const slides = this.getSlides(product);
      const details = product.details ? product.details.productInformation : '';
      const specifications = this.getProductSpecifications(product.details);
      const carousel = slides ? <CarouselWrapper {...carouselSettings}>{slides}</CarouselWrapper> : null;
      return(
        <ProductWrapper>
          <PageTitle><BackArrow to={`/browse/${product.defaultCategory.name.toLowerCase()}/20`}>&nbsp;</BackArrow>{product.title}</PageTitle>
          {carousel}
          <ProductInformation>
            <ProductInformationItem>
              <ProductInformationTitle>Product information</ProductInformationTitle>
              <Code>Product code: {product.code}</Code>
              <ProductDescription dangerouslySetInnerHTML={{__html: details}} />
            </ProductInformationItem>
            <ProductInformationItem>
              <ProductInformationTitle>Product Specification</ProductInformationTitle>
              {specifications}
            </ProductInformationItem>
          </ProductInformation>
        </ProductWrapper>);
    }

    return (<div>Something went wrong</div>);
  }
}