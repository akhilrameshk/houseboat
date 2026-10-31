export interface ImageDTO {
  url: string;
  publicId: string;
  width: number;
  height: number;
  alt:string;
}

export interface BoatDTO {
  _id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  capacity: string;
  duration: string;
  price: number | null;
  routeFrom: string;
  routeTo: string;
  routeStops: string;
  routeImage: ImageDTO | null;
  images: ImageDTO[];
  featured: boolean;
  active: boolean;
  showInHomeGallery: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface BoatTypeDTO {
  _id: string;
  name: string;
  slug: string;
}

export interface GalleryItemDTO {
  _id: string;
  url: string;
  publicId: string;
  width: number;
  height: number;
  caption: string;
  boat: string | null;
  showOnHome: boolean;
  createdAt: string;
  sortOrder: number;
  updatedAt: string;
}

export interface SettingsDTO {
  siteName: string;
  whatsappNumber: string;
  callNumber: string;
  email: string;
  address: string;
  googleReviewUrl: string;
  googleMapsUrl: string;
  footerText: string;
  heroImage: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  tripadvisorUrl: string;
  latitude: string;
  longitude: string;
  googleVerification: string;
  extraKeywords: string;
}

export interface FaqItem {
  q: string;
  a: string;
}
