import { createRef, FC, useCallback, useEffect, useState } from 'react';
import { ImageElementProps } from '../Img';

function withLazyImage<P extends ImageElementProps>(Component: FC<P>) {
  return function LazyImage(props: P) {
    const [src, setSrc] = useState<string>('');
    const ref = createRef<HTMLImageElement>();
    const { src: srcProp = '', ...otherProps } = props;

    const preloadImage = (imageSrc: string) => {
      const preloadImg = new Image();
      preloadImg.src = imageSrc;
      preloadImg.onload = () => setSrc(imageSrc);
    };

    const observer = useCallback((node: HTMLImageElement) => {
      const intersectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            preloadImage(node.dataset.src as string);
            intersectionObserver.unobserve(node);
          }
        }
      });

      intersectionObserver.observe(node);
    }, []);

    useEffect(() => {
      if (ref.current !== null) observer(ref.current);
    }, []);

    return <Component {...(otherProps as any)} ref={ref} src={src} data-src={srcProp} />;
  };
}

export default withLazyImage;
