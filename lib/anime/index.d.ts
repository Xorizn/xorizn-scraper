export declare const mal_top_airing: () => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [{
    rank: number;
    thumbnail: string;
    title: string;
    score: string;
    link: string;
  }];
} | {
  mess?: string;
}>;
export declare const mal_top_anime: () => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [{
    rank: number;
    thumbnail: string;
    title: string;
    score: string;
    link: string;
  }];
} | {
  mess?: string;
}>;
export declare const mal_search_anime: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [{
    title: string;
    thumbnail: string;
    url: string;
    type: string;
    episode: string;
    score: string;
  }];
} | {
  mess?: string;
}>;
export declare const mal_search_manga: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [{
    title: string;
    type: string;
    vol: string;
    score: string;
    link: string;
    thumbnail: string;
  }];
} | {
  mess?: string;
}>;
export declare const mal_search_character: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [{
    name: string;
    alias_name: string;
    url: string;
    thumbnail: string;
    anime: string;
    manga: string;
  }];
} | {
  mess?: string;
}>;