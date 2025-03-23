import axios from 'axios';
import {
  StrapiCollection,
  StrapiFacilitator,
  StrapiSchedule,
  StrapiTestimonial,
  StrapiGame,
  NormalizedGame,
  NormalizedFacilitator,
  NormalizedSchedule,
  NormalizedTestimonial,
  NormalizedImage,
  StrapiEntity,
  ComputedPrice,
  StrapiImage
} from '@/types';

type ApiError = {
  response?: {
    data?: {
      error?: {
        message?: string;
      };
    };
  };
  message?: string;
};

interface StrapiApiResponse<T> {
  data: StrapiCollection<T>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Normalize a single image from Strapi format
const normalizeImage = (strapiImage: StrapiImage): NormalizedImage | null => {
  if (!strapiImage?.data?.attributes) {
    console.warn('Invalid image data structure:', strapiImage);
    return null;
  }

  const { attributes } = strapiImage.data;

  if (!attributes.url) {
    console.warn('Image URL is missing:', attributes);
    return null;
  }

  // Ensure URL is absolute
  const url = attributes.url.startsWith('http')
    ? attributes.url
    : `${API_URL}${attributes.url}`;

  return {
    url,
    alternativeText: attributes.alternativeText || '',
    width: attributes.width || 0,
    height: attributes.height || 0,
  };
};

// Normalize a facilitator from Strapi format
const normalizeFacilitator = (data: StrapiEntity<StrapiFacilitator>): NormalizedFacilitator => {
  if (!data?.attributes) {
    throw new Error('Invalid facilitator data structure');
  }

  const { attributes } = data;

  if (!attributes.name || !attributes.bio) {
    throw new Error('Missing required facilitator fields');
  }

  const image = normalizeImage(attributes.image);
  if (!image) {
    throw new Error('Invalid or missing facilitator image');
  }

  return {
    id: data.id,
    name: attributes.name,
    bio: attributes.bio,
    type: attributes.type || 'Facilitator',
    image,
    socialLinks: attributes.socialLinks?.data?.map(link => ({
      platform: link.platform,
      url: link.url,
    })) || [],
  };
};

// Normalize a game from Strapi format
const normalizeGame = (data: StrapiEntity<StrapiGame>): NormalizedGame => {
  if (!data?.attributes) {
    throw new Error('Invalid game data structure');
  }

  const { attributes } = data;

  const coverImage = normalizeImage(attributes.coverImage);
  if (!coverImage) {
    console.warn('Game is missing cover image:', data.id);
  }

  return {
    id: data.id,
    title: attributes.title || 'Untitled Game',
    description: attributes.description || '',
    videoUrl: attributes.videoUrl,
    price: attributes.price || 0,
    discount: attributes.discount,
    bestSeller: attributes.bestSeller || false,
    coverImage: coverImage!,
    images: (attributes.images?.data?.map(img => normalizeImage({ data: img }))?.filter((img): img is NormalizedImage => img !== null) || []) as NormalizedImage[],
    features: attributes.features?.data?.map(f => ({
      title: f.attributes.title || '',
      description: f.attributes.description || '',
    })) || [],
    reviews: attributes.reviews?.data?.map(r => ({
      text: r.attributes.text || '',
      rating: r.attributes.rating || 0,
      author: r.attributes.author || 'Anonymous',
    })) || [],
    facilitator: attributes.facilitator?.data ?
      normalizeFacilitator(attributes.facilitator.data) :
      undefined,
  };
};

// Fetch all games with related data
export const fetchGames = async (): Promise<NormalizedGame[]> => {
  try {
    const requestUrl = `${API_URL}/api/games`;
    console.log('Fetching games from:', requestUrl);
    console.log('With headers:', api.defaults.headers);
    
    const response = await api.get<{ data: any[] }>('/api/games', {
      params: {
        'populate': '*'
      }
    });

    // Log the full request details
    console.log('Games request details:', {
      baseURL: api.defaults.baseURL,
      url: response.config?.url,
      fullUrl: `${API_URL}/api/games?populate=*`,
      status: response.status,
      statusText: response.statusText,
      hasData: Boolean(response.data?.data),
      dataLength: response.data?.data?.length
    });

    console.log('Games API Response:', {
      status: response.status,
      url: response.config?.url,
      params: response.config?.params,
    });

    console.log('Games Data:', response.data);
    
    const games = response.data?.data || [];
    
    if (!Array.isArray(games)) {
      console.error('Games data is not an array:', games);
      return [];
    }

    console.log(`Found ${games.length} games`);
    
    // Normalize each game for the GameCard component
    const normalizedGames = games
      .map(game => {
        try {
          if (!game?.attributes) {
            console.error('Game missing attributes:', game);
            return null;
          }

          const coverImage = normalizeImage(game.attributes.coverImage);
          if (!coverImage) {
            console.warn(`Game ${game.id} missing cover image, skipping...`);
            return null;
          }

          const images = (game.attributes.images?.data || [])
            .map((img: any) => normalizeImage({ data: img }))
            .filter((img: NormalizedImage | null): img is NormalizedImage => img !== null);

          const normalized: NormalizedGame = {
            id: game.id,
            title: game.attributes.title || '',
            description: game.attributes.description || '',
            videoUrl: game.attributes.videoUrl || '',
            price: Number(game.attributes.price) || 0,
            discount: Number(game.attributes.discount) || 0,
            bestSeller: Boolean(game.attributes.bestSeller),
            coverImage,
            images,
            features: (game.attributes.features?.data || []).map((f: any) => ({
              title: f.attributes?.title || '',
              description: f.attributes?.description || ''
            })),
            reviews: (game.attributes.reviews?.data || []).map((r: any) => ({
              text: r.attributes?.text || '',
              rating: Number(r.attributes?.rating) || 0,
              author: r.attributes?.author || ''
            })),
            facilitator: game.attributes.facilitator?.data ?
              normalizeFacilitator(game.attributes.facilitator.data) :
              undefined
          };

          console.log('Normalized game:', normalized);
          return normalized;
        } catch (err) {
          console.error('Error normalizing game:', game.id, err);
          return null;
        }
      })
      .filter((game): game is NormalizedGame => game !== null);

    console.log('Normalized games:', normalizedGames);
    return normalizedGames;
  } catch (error: any) {
    console.error('Error fetching games:', {
      message: error.message,
      response: {
        status: error.response?.status,
        data: error.response?.data,
      },
      request: {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        params: error.config?.params
      }
    });

    // Return empty array instead of throwing to handle gracefully
    return [];
  }
};

export const fetchFacilitators = async () => {
  try {
    const response = await api.get<{ data: any[] }>('/api/users', {
      params: {
        'filters[role][name][$eq]': 'Facilitator'
      }
    });
    console.log('Facilitators API URL:', `${API_URL}/api/users?filters[role][name][$eq]=Facilitator`);
    console.log('Facilitators response:', response.data); // For debugging
    console.log('Facilitators filtered:', response.data?.data); // For debugging
    return response.data.data;
  } catch (error: any) {
    console.error('Failed to fetch facilitators:', error);
    throw new Error('Failed to fetch facilitators');
  }
};

// Fetch schedule with optional facilitator information
export const fetchSchedule = async () => {
  try {
    const response = await api.get<{ data: any[] }>('/api/schedules');
    console.log('Schedule response:', response.data); // For debugging
    return response.data.data;
  } catch (error: any) {
    console.error('Failed to fetch schedule:', error);
    throw new Error('Failed to fetch schedule');
  }
};

// Fetch testimonials
export const fetchTestimonials = async () => {
  try {
    const response = await api.get<{ data: any[] }>('/api/testimonials');
    console.log('Testimonials response:', response.data); // For debugging
    return response.data.data;
  } catch (error: any) {
    console.error('Failed to fetch testimonials:', error);
    throw new Error('Failed to fetch testimonials');
  }
};

// Helper function to calculate final price with discount
export const calculatePrice = (price: number, discount?: number): ComputedPrice => {
  if (!discount) {
    return {
      original: price,
      final: price,
      hasDiscount: false
    };
  }

  const finalPrice = price - (price * (discount / 100));
  return {
    original: price,
    final: finalPrice,
    hasDiscount: true,
    discountPercentage: discount
  };
};