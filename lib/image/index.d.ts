export declare const pinterest: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [];
}| {
  mess?: string;
}>;
export declare const pinterest_video_search: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [];
} | {
  mess?: string;
}>;
export declare const pinterest_video: (link: 'url') => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: string;
} | {
  mess?: string;
}>;
export declare const wallpaper_anime_desktop: (search: string | undefined) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [];
} | {
  mess?: string;
}>;

type opts = {
  qqmode?: string;
  proxy?: string;
};
export declare const jadi_anime: (img: string, nowm?: 'NOWM', opts?: opts | undefined) => Promise<{
  creator: string;
  info: string;
  status: true;
  result: {
    error: string;
    img?: undefined;
    videoUrl?: undefined;
    singleImg?: undefined;
  }
} | {
  code: number;
  img: string;
  videoUrl: string | undefined;
  singleImg: string | undefined;
  error?: undefined;
}>;
export {};
