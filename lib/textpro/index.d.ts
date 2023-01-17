export declare const textpro: (url: string, text: ['text'] | ['text', 'text'] ) => Promise<{
  creator: string;
  info: string;
  status: true;
  result?: {
    image: string;
    image_code: string;
  };
} | {
  mess?: string;
}>;