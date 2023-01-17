export declare const film: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [{
    title: string,
    quality: string,
    type: string,
    upload: string,
    link: string,
    thumbnail: string,
  }];
} | {
  mess?: string;
}>;
export declare const jadwal_sepakbola: () => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: string;
} | {
  mess?: string;
}>;
export declare const acara_now: () => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: string;
} | {
  mess?: string;
}>;
export declare const jadwal_tv: (search: 'gtv' | 'antv' | 'indosiar' | 'inewstv' | 'kompastv' | 'metrotv' | 'mnctv' | 'moji' | 'nettv' | 'rcti' | 'rtv' | 'sctv' | 'trans7' | 'transtv' | 'tvone' | 'tvri' ) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: string;
} | {
  mess?: string;
}>;
export declare const playstore: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [{
    link: string;
    nama?: string;
    developer?: string;
    img?: string;
    rate?: string;
    rate2?: string;
    link_dev: string;
  }];
} | {
  mess?: string;
}>;
export declare const soundcloud_search: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [{
    link: string;
    judul: string;
  }];
} | {
  mess?: string;
}>;
export declare const lyrics: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: string;
} | {
  mess?: string;
}>;
export declare const steam_search: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: [{
    judul: string;
    img: string;
    link: string;
    rilis: string;
    harga?: string;
    rating: string;
  }];
} | {
  mess?: string;
}>;
export declare const steam_detail: (link: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    desc:string;
    img: string;
    system: string;
    info: string;
  };
} | {
  mess?: string;
}>;
export declare const xpanas: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    nonton: string;
    img: string;
    title: string;
  };
} | {
  mess?: string;
}>;
export declare const bukalapak: (search: string) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    title: string;
    rating: string;
    terjual: string;
    harga: string;
    image: string;
    link: string;
    store: {
      lokasi: string;
      nama: string;
      link: string;
    };
  };
} | {
  mess?: string;
}>;