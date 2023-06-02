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
