import { Concert } from '../data/concerts';
import Constants from 'expo-constants';

interface StubhubProxyResponse {
  id?: string;
  title?: string;
  artist?: string;
  description?: string;
  date?: string; // ISO or readable
  time?: string; // HH:MM or range
  location?: string; // City
  venue?: string;
  image?: string;
  price?: string; // formatted like ₹2999 onwards or $100
}

function toConcert(resp: StubhubProxyResponse): Concert | null {
  if (!resp || !resp.title || !resp.date || !resp.venue) return null;

  const safe: Concert = {
    id: resp.id || `stubhub-${Math.random().toString(36).slice(2)}`,
    title: resp.title,
    artist: resp.artist || resp.title,
    description: resp.description || 'Live concert',
    date: new Date(resp.date).toISOString().slice(0, 10),
    time: resp.time || '08:00 PM - 11:00 PM',
    location: resp.location || 'TBA',
    venue: resp.venue,
    image:
      resp.image ||
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
    price: resp.price || '$100',
    rating: 4.8,
    reviews: 1000,
    attendees: 1000,
    attendeesImages: [],
    featured: true,
    trending: true,
    genre: 'Live',
    tags: ['StubHub', 'Live'],
    highlights: [],
  };

  return safe;
}

function readProxyUrl(): string | undefined {
  const extra = (Constants?.expoConfig?.extra || {}) as Record<string, any>;
  return (
    process.env.EXPO_PUBLIC_STUBHUB_PROXY_URL ||
    extra.EXPO_PUBLIC_STUBHUB_PROXY_URL ||
    extra.STUBHUB_PROXY_URL
  );
}

export async function fetchStubhubEventByUrl(eventUrl: string): Promise<Concert | null> {
  try {
    const proxyUrl = readProxyUrl();
    if (!proxyUrl) return null;
    const url = `${proxyUrl}?url=${encodeURIComponent(eventUrl)}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      console.warn('[stubhub] proxy non-200', res.status);
      return null;
    }
    const data: StubhubProxyResponse = await res.json();
    return toConcert(data);
  } catch (e) {
    console.warn('[stubhub] fetch error', e);
    return null;
  }
}


