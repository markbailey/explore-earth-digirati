import { FC, useCallback, useEffect, useState } from 'react';
import { createClient, ErrorResponse, Photo, PhotosWithTotalResults } from 'pexels';

const { VITE_PEXEL_API_KEY } = import.meta.env;
const client = createClient(VITE_PEXEL_API_KEY!);

function withPexel<P>(Component: FC<P>) {
  return function PexelPhoto(props: PexelPhotoProps<P>) {
    const [src, setSrc] = useState<string>('');
    const [alt, setAlt] = useState<string>('');

    const {
      photoId,
      query,
      size = 'original',
      fallbackSrc = '',
      fallbackAlt = '',
      ...otherProps
    } = props;

    const setPhoto = useCallback(
      (photo: Photo | null) => {
        const newSrc = photo?.src[size] ?? fallbackSrc;
        const newAlt = photo?.alt ?? fallbackAlt;
        const preloadImg = new Image();
        preloadImg.src = newSrc;
        preloadImg.onload = () => {
          setSrc(newSrc);
          setAlt(newAlt);
        };
      },
      [size, fallbackSrc, fallbackAlt]
    );

    useEffect(() => {
      if (query !== undefined)
        client.photos.search({ query }).then((response) => {
          if (typeof (response as ErrorResponse).error === 'string') setPhoto(null);
          setPhoto((response as PhotosWithTotalResults).photos[0] ?? null);
        });
    }, [query, setPhoto]);

    useEffect(() => {
      if (photoId !== undefined)
        client.photos.show({ id: photoId }).then((response) => {
          if (typeof (response as ErrorResponse).error === 'string') setPhoto(null);
          setPhoto(response as Photo);
        });
    }, [photoId, setPhoto]);

    return <Component {...(otherProps as P)} src={src} alt={alt} />;
  };
}

export default withPexel;
