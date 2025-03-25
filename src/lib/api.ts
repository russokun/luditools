import axios from 'axios';
import {
  NormalizedGame,
  NormalizedFacilitator,
  NormalizedSchedule,
  NormalizedTestimonial,
  ComputedPrice
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
  }
});

const getFullUrl = (path: string) =>
  path.startsWith('http') ? path : `${API_URL}${path}`;

export const calculatePrice = (price: number, discount?: number): ComputedPrice => {
  if (!discount) return { original: price, final: price, hasDiscount: false };
  const finalPrice = price - price * (discount / 100);
  return { original: price, final: finalPrice, hasDiscount: true, discountPercentage: discount };
};

interface ApiResponse<T> {
  data: T;
}

export const fetchGames = async (): Promise<NormalizedGame[]> => {
  try {
    const { data: response } = await api.get<ApiResponse<any[]>>('/api/games', {
      params: { populate: '*' }
    });
    if (!response?.data) return [];
    return response.data.map((raw: any) => ({
      id: raw.id || raw.documentId,
      title: raw.Name || 'Sin título',
      description: Array.isArray(raw.Description) ? raw.Description[0] : raw.Description || '',
      videoUrl: raw.HotmartURL || '',
      price: Number(raw.Price ?? 0),
      discount: raw.Discount != null ? Number(raw.Discount) : undefined,
      coverImage: raw.LogoImg
        ? {
            url: getFullUrl(raw.LogoImg.url),
            width: raw.LogoImg.width ?? 800,
            height: raw.LogoImg.height ?? 600,
            alternativeText: raw.LogoImg.alternativeText ?? raw.Name ?? ''
          }
        : null,
      features: Array.isArray(raw.Features) ?
        raw.Features.map((f: any) => {
          if (typeof f === 'object' && f !== null) {
            return {
              title: typeof f.title === 'string' ? f.title : '',
              description: typeof f.description === 'string' ? f.description : ''
            };
          }
          return { title: '', description: '' };
        }) : []
    }));
  } catch (error) {
    console.error('Failed to fetch games:', error);
    return [];
  }
};

export async function fetchGameById(id: string): Promise<NormalizedGame | null> {
  try {
    const { data: response } = await api.get<ApiResponse<any[]>>('/api/games', {
      params: {
        populate: '*',
        'filters[id]': id
      }
    });

    const raw = response.data?.[0];
    if (!raw) {
      console.warn(`fetchGameById: no game found for id=${id}`);
      return null;
    }

    const description = Array.isArray(raw.Description)
      ? raw.Description[0]
      : raw.Description || '';

    const coverImage = raw.LogoImg
      ? {
          url: getFullUrl(raw.LogoImg.url),
          width: raw.LogoImg.width ?? 800,
          height: raw.LogoImg.height ?? 600,
          alternativeText: raw.LogoImg.alternativeText ?? raw.Name ?? ''
        }
      : null;

    return {
      id: raw.id,
      title: raw.Name || 'Sin título',
      description,
      videoUrl: raw.HotmartURL || '',
      price: Number(raw.Price ?? 0),
      discount: raw.Discount != null ? Number(raw.Discount) : undefined,
      coverImage,
      features: Array.isArray(raw.Features) ?
        raw.Features.map((f: any) => {
          if (typeof f === 'object' && f !== null) {
            return {
              title: typeof f.title === 'string' ? f.title : '',
              description: typeof f.description === 'string' ? f.description : ''
            };
          }
          return { title: '', description: '' };
        }) : []
    };
  } catch (error: any) {
    console.error(`fetchGameById(${id}) error:`, error.response?.data || error.message);
    return null;
  }
}


export const fetchSchedule = async (): Promise<NormalizedSchedule[]> => {
  try {
    const { data: response } = await api.get<ApiResponse<any[]>>('/api/schedules');
    if (!response?.data) return [];
    return response.data.map(item => ({
      id: item.id,
      day: item.day || '',
      time: item.time || '',
      title: item.title || '',
      facilitator: undefined,
      image: null
    }));
  } catch (error) {
    console.error('Failed to fetch schedule:', error);
    return [];
  }
};

export const fetchTestimonials = async (): Promise<NormalizedTestimonial[]> => {
  try {
    const { data: response } = await api.get<ApiResponse<any[]>>('/api/testimonials');
    if (!response?.data) return [];
    return response.data.map(item => ({
      id: item.id,
      text: item.text || '',
      author: item.author || '',
      videoUrl: item.videoUrl || ''
    }));
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return [];
  }
};

export const fetchFacilitators = async (): Promise<NormalizedFacilitator[]> => {
  try {
    const { data: response } = await api.get<ApiResponse<any[]>>('/api/users-permissions/users', {
      params: { 'filters[type]': 'Facilitator' }
    });
    if (!response?.data) return [];
    return response.data
      .filter(user => user.type === 'Facilitator')
      .map(user => ({
        id: user.id,
        name: user.name || `${user.firstname ?? ''} ${user.lastname ?? ''}`.trim() || user.username || 'Facilitador',
        bio: user.bio || '',
        type: 'Facilitator',
        image: null,
        socialLinks: []
      }));
  } catch (error) {
    console.error('Failed to fetch facilitators:', error);
    return [];
  }
};
