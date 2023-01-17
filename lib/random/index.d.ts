export declare const waifu: (type: 'nsfw' | 'sfw') => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    random: [];
  };
} | {
  mess?: string;
}>;
export declare const waifu_nsfw: (category: 'waifu' | 'neko' | 'trap' | 'blowjob') => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    url: string;
  };
} | {
  mess?: string;
}>;
export declare const waifu_sfw: (category: 'waifu' | 'neko' | 'shinobu' | 'megumin' | 'bully' | 'cuddle' | 'cry' | 'hug' | 'awoo' | 'kiss' | 'lick' | 'pat' | 'smug' | 'bonk' | 'yeet' | 'blush' | 'smile' | 'wave' | 'highfive' | 'handhold' | 'nom' | 'bite' | 'glomp' | 'slap' | 'kill' | 'kick' | 'happy' | 'wink' | 'poke' | 'dance' | 'cringe') => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    url: string;
  };
} | {
  mess?: string;
}>;
export declare const dark_jokes: () => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    url: string;
  };
}>;
export declare const discord_nekopoi_video: () => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    url: string;
  };
}>;