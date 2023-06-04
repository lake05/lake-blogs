export interface UnsplashImage {
  id: string;
  alt_description: string;
  user: {
    username: string;
  };
  urls: {
    thumb: string;
  };
  width: number;
  height: number;
}

export interface UnsplashUser {
  username: string;
  first_name: string;
  last_name: string;
}

export interface UnsplashSearchResponse {
  results: UnsplashImage[];
}
