import { FC, useEffect, useState } from 'react';
import { MinImageProps } from '../Img';

const { VITE_BING_MAPS_API_KEY } = import.meta.env;

type OmitedProps<P> = Omit<Omit<P, 'src'>, 'alt'>;
type StaticMapProps<P extends MinImageProps> = OmitedProps<P> & {
  zoom?: number;
  latitudeLongitude: [number, number];
  mapSize?: [number, number];
  imageFormat?: 'png' | 'jpeg';
};

const BASE_URL = 'https://dev.virtualearth.net/REST/V1/Imagery/Map/Road/';

function withStaticMap<P extends MinImageProps>(Component: FC<P>) {
  return function StaticMap(props: StaticMapProps<P>) {
    const [src, setSrc] = useState<string>('');
    const [alt, setAlt] = useState<string>('');
    const {
      imageFormat = 'png',
      mapSize = [600, 300],
      latitudeLongitude,
      zoom = 10,
      ...otherProps
    } = props;

    useEffect(() => {
      const longitudeLatitudeSlug = encodeURI(latitudeLongitude.join(','));
      const mapSizeQuery = `mapSize=${encodeURI(mapSize.join(','))}`;
      const formatQuery = `&format=${imageFormat ?? 'png'}`;
      const keyQuery = `&key=${VITE_BING_MAPS_API_KEY}`;

      const newSrc = `${BASE_URL}${longitudeLatitudeSlug}/${zoom}?${mapSizeQuery}${formatQuery}${keyQuery}`;
      const newAlt = `Map of ${latitudeLongitude.join(',')}`;

      setSrc(newSrc);
      setAlt(newAlt);
    }, [zoom, mapSize, latitudeLongitude, imageFormat]);

    return <Component {...(otherProps as unknown as P)} src={src} alt={alt} />;
  };
}

export default withStaticMap;
