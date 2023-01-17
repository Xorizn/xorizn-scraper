export declare const pinterest_video: (link: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: string;
} | {
  mess?: string;
}>;
export declare const soundcloud: (link: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    title: string;
    link: string;
    img: string;
    cap: string;
  };
} | {
  mess?: string;
}>;
export declare const tiktok: (link: string) => Promise<{
  result?: {
    thumb: string;
    v_id: string;
    desc: string;
    nowm: string;
    author: {
      author: string;
      author_name: string;
      author_profile: string;
    };
    other_video_link?: [];
    wm?: string;
    audio?: {
      link: string;
      title: string;
    };
  };
} | {
  mess?: string;
}>;
export declare const musically: (link: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    user: string;
    desk: string;
    profile: string;
    video: string;
    audio: string;
    video_original: string;
  };
} | {
  mess?: string;
}>;
export declare const instagram: (link: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    link: string;
    slide: [];
    slide_length: number;
  };
} | {
  mess?: string;
}>;
export declare const facebook: (link: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    desc: string;
    thumb: string;
    video_sd: string;
    video_hd: string;
  };
} | {
  mess?: string;
}>;
export declare const twitter: (link: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    thumb: string;
    author: string;
    id_link: string;
    video: string;
    audio: string;
  };
} | {
  mess?: string;
}>;
export declare const joox: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [{
    lagu: string;
    album: string;
    penyanyi: string;
    publish: string;
    img: string;
    mp3: string;
  }];
} | {
  mess?: string;
}>;
export declare const mediafire: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [{
    filename: string;
    filetype: string;
    link: string;
    detail: string;
  }];
} | {
  mess?: string;
}>;