type BaseProps<P> = Omit<Omit<P, 'src'>, 'alt'>;

declare type PexelPhotoProps<P> = {
  size?: 'portrait' | 'small' | 'medium' | 'large' | 'large2x' | 'original';
  fallbackSrc?: string;
  fallbackAlt?: string;
} & ({ photoId: string | number; query?: never } | { photoId?: never; query: string }) &
  BaseProps<P>;
