export declare const cnbc: (kategori: 'news' | 'market' | 'investment' | 'entrepreneur' | 'syariah' | 'tech' | 'lifestyle') => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    waktu: string;
    title: string;
    img: string;
    link: string;
  };
} | {
  mess?: string;
}>;
export declare const covid_world: () => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    total_cases: string;
    recovered: string;
    deaths:string;
    active_cases: string;
    closed_cases: string;
    last_update: string;
  };
} | {
  mess?: string;
}>;
export declare const gempa: () => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    waktu: string;
    lintang: string;
    bujur: string;
    magnitudo: string;
    kedalaman: string;
    wilayah: string;
    img_map: string;
    google_map: string;
  };
} | {
  mess?: string;
}>;
export declare const kompas: (kategori: 'terpopuler' | 'terkini' | 'global') => Promise<{
  result?: {
    judul: string;
    tanngal: string;
    img: string;
    link: string;
  };
} | {
  result?: {
    judul: string;
    deskripsi: string;
    tanggal: string;
    artikel: string;
    img: string;
    link: string;
  };
} | {
  mess?: string;
}>;
export declare const rumah_keadilan: () => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    judul: string;
    penulis: string;
    deskripsi: string;
    tautan: string;
    thumbnail: string;
  };
} | {
  mess?: string;
}>;