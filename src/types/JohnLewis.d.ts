import { Attributes } from "react";

export namespace JohnLewis {
  interface Product {
    productId: number;
    type: string;
    title: string;
    code?: number;
    details?: Details;
    averageRating?: number;
    reviews?: number;
    price: Price;
    image: string;
    media?: Media;
    additionalServices?: string[];
    displaySpecialOffer?: string;
    promoMessages?: PromoMessages;
    nonPromoMessage?: string;
    defaultSkuId?: number;
    colorSwatches?: string[];
    colorSwatchSelected?: number;
    colorWheelMessage?: string;
    outOfStock?: boolean;
    emailMeWhenAvailable?: boolean;
    availabilityMessage?: string;
    compare?: boolean;
    fabric?: string;
    swatchAvailable?: boolean;
    categoryQuickViewEnabled?: boolean;
    swatchCategoryType?: string;
    brand?: string;
    ageRestriction?: number;
    isInStoreOnly?: boolean;
    isMadeToMeasure?: boolean;
    isBundle?: boolean;
    isProductSet?: boolean;
    promotionalFeatures?: PromotionalFeatures[];
    features?: string[];
    quickAddToBasket?: QuickAddToBasket;
    dynamicAttributes?: DynamicAttributes;
    directorate?: string;
    releaseDateTimestamp?: number;
  }

  interface SearchResult {
    products: Product[];
    facets?: Facet[];
    results: number;
    pagesAvailable?: number;
    crumbs?: Crumbs[];
    dynamicBannerId?: string;
    seoBannerId?: string;
    triggeredRules?: any;
    redirectUrl?: string;
    staticLinks?: StaticLinks[];
    selectedDept?: string;
    multiCatSelected?: boolean;
    endecaCanonical?: string;
  }

  interface Now {
    from: string;
    to: string;
  }

  interface Price {
    was?: string;
    then1?: string;
    then2?: string;
    now: string | Now;
    uom?: string;
    currency: string;
  }
  
  interface PromoMessages {
    priceMatched?: string;
    offer?: string;
    customPromotionalMessage?: string;
    bundleHeadline?: string;
    customSpecialOffer?: any;
  }
  
  interface PromotionalFeatures {
    title?: string;
    iconUrl?: string;
    linkUrl?: string;
    description?: string;
    longDescription?: string;
  }
  
  interface DynamicAttributes {
    [title: string]: {description: string};
  }
  
  interface QuickAddToBasket {
    simpleAddToBasket?: boolean;
  }
  
  interface FacetDetails {
    facetId: string;
    label?: string;
    qty?: string;
    color?: string;
    colorSwatchUrl?: string;
    isSelected?: string;
    seoUrlParts?: string;
  }
  
  interface Facet {
    dimensionName: string;
    name?: string;
    type?: string;
    tooltip?: string;
    details?: FacetDetails[];
  }
  
  interface Crumbs {
    type?: string;
    displayName?: string;
    clickable?: string;
  }
  
  interface StaticLinks {
    link?: string;
  }

  interface Images {
    altText: string;
    urls: string[];
  }

  interface ThreeSixtyimages {
    swfUrl: string;
    urls: string[];
  }

  interface Media {
    images: Images
    '360images': ThreeSixtyimages;
    videos: any;
  }

  interface Details {
    returns: string;
    returnsHeadline: string;
    termsAndConditions: string,
    productInformation: string;
    features: Feature[];
  }

  interface Feature {
    groupName: string;
    attributes: Attribute[];
  }

  interface Attribute {
    id: string;
    name: string;
    toolTip: string;
    uom: string;
    value: string;
  }
}