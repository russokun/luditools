export type NormalizedImage = {
  url: string;
  width: number;
  height: number;
  alternativeText: string;
};

export type StrapiImage = {
  data: {
    attributes: {
      url: string;
      width: number;
      height: number;
      alternativeText?: string;
    }
  }
};

export type NormalizedGame = {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  price: number;
  discount?: number;
  coverImage: NormalizedImage | null;
  features: Array<{
    title: string;
    description: string;
  }>;
};

export type StrapiGameFeature = {
  title: string;
  description: string;
};

export type StrapiFacilitator = {
  username: string;
  firstname?: string;
  lastname?: string;
  name?: string;
  bio?: string;
  type: string;
  image?: StrapiImage;
  socialLinks?: { data: StrapiSocialLink[] };
};

export type StrapiSocialLink = {
  platform: string;
  url: string;
};

export type NormalizedFacilitator = {
  id: number;
  name: string;
  bio: string;
  type: string;
  image: NormalizedImage | null;
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
  facilitator?: NormalizedFacilitator;
  image: NormalizedImage | null;
};

export type StrapiSchedule = {
  day: string;
  time: string;
  title: string;
  facilitator?: {
    data: StrapiEntity<StrapiFacilitator>;
  };
  image?: StrapiImage;
};

export type NormalizedTestimonial = {
  id: number;
  text: string;
  author: string;
  videoUrl?: string;
};

export type StrapiTestimonial = {
  text: string;
  author: string;
  videoUrl?: string;
};

export type StrapiEntity<T> = {
  id: number;
  attributes: T;
};

export type ComputedPrice = {
  original: number;
  final: number;
  hasDiscount: boolean;
  discountPercentage?: number;
};