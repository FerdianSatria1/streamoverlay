export type GameTheme = 'valorant' | 'rdr2' | 'cs2' | 'roblox' | 'chatting';

export interface OverlayConfig {
  game: GameTheme;
  youtubeName: string;
  instagramName: string;
  tiktokName: string;
  showWebcam: boolean;
  webcamScale: number;
  showTicker: boolean;
  tickerText: string;
  tickerSpeed: number;
  elementsScale: number;
  showChat: boolean;
  chatScale: number;
}

export const DEFAULT_CONFIG: OverlayConfig = {
  game: 'valorant',
  youtubeName: 'MyChannel',
  instagramName: '@MyInsta',
  tiktokName: '@MyTikTok',
  showWebcam: true,
  webcamScale: 1,
  showTicker: true,
  tickerText: 'Welcome to the stream! Don\'t forget to like and subscribe!',
  tickerSpeed: 15,
  elementsScale: 1,
  showChat: true,
  chatScale: 1,
};

export const STORAGE_KEY = 'stream_overlay_config';