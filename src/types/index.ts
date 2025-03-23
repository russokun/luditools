// Strapi common types
export type StrapiEntity<T> = {
  id: number;
  attributes: T;
};

export type StrapiCollection<T> = Array<StrapiEntity<T>>;

export type StrapiResponse<T> = {
  data: StrapiCollection<T>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiImage = {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string;
      width: number;
      height: number;
    };
  } | null;
};

export type StrapiSocialLink = {
  id: number;
  platform: string;
  url: string;
};

// Strapi response types
export type StrapiFacilitator = {
  name: string;
  bio: string;
  type: string;
  image: StrapiImage;
  socialLinks: {
    data: StrapiSocialLink[];
  };
};

export type StrapiSchedule = {
  day: string;
  time: string;
  title: string;
  facilitator: {
    data: StrapiEntity<StrapiFacilitator> | null;
  };
  image: StrapiImage;
};

export type StrapiTestimonial = {
  text: string;
  author: string;
  videoUrl: string;
};

export type StrapiGameFeature = {
  title: string;
  description: string;
};

export type StrapiGameReview = {
  text: string;
  rating: number;
  author: string;
};

export type StrapiGame = {
  title: string;
  description: string;
  videoUrl?: string;
  price: number;
  discount?: number;
  bestSeller: boolean;
  coverImage: StrapiImage;
  images: {
    data: Array<StrapiEntity<{
      url: string;
      alternativeText?: string;
      width: number;
      height: number;
    }>>;
  };
  features: {
    data: Array<StrapiEntity<StrapiGameFeature>>;
  };
  reviews: {
    data: Array<StrapiEntity<StrapiGameReview>>;
  };
  facilitator: {
    data: StrapiEntity<StrapiFacilitator> | null;
  };
};

// Normalized types for components
export type NormalizedImage = {
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
};

export type NormalizedFacilitator = {
  id: number;
  name: string;
  bio: string;
  type: string;
  image: NormalizedImage;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
};

export type NormalizedSchedule = {
  id: number;
  day: string;
  time: string;
  title: string;
  image: NormalizedImage | null;
  facilitator?: NormalizedFacilitator;
};

export type NormalizedTestimonial = {
  id: number;
  text: string;
  author: string;
  videoUrl: string;
};

export type NormalizedGame = {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  price: number;
  discount?: number;
  bestSeller: boolean;
  coverImage: NormalizedImage;
  images: NormalizedImage[];
  features: Array<{
    title: string;
    description: string;
  }>;
  reviews: Array<{
    text: string;
    rating: number;
    author: string;
  }>;
  facilitator?: NormalizedFacilitator;
};

// Helper type for price calculation
export type ComputedPrice = {
  original: number;
  final: number;
  hasDiscount: boolean;
  discountPercentage?: number;
};