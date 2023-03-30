import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from '../assets/stylesheets/image.module.scss';
import withLazyImage from './hoc/withLazyImage';

export type MinImageProps = { src: string; alt: string };
export type ImageElementProps = HTMLAttributes<HTMLImageElement> & MinImageProps;
export type BackgroundImgProps = Omit<ImageElementProps, 'background'>;
export type ImageProps = ImageElementProps & { background?: boolean };

export const imgStyles = styles;

const BaseImg = forwardRef((props: ImageProps, ref: ForwardedRef<HTMLImageElement>) => {
  const { className: classNameProp, background = false, ...otherProps } = props;
  const className = classNames(styles.image, background && styles.background, classNameProp);
  return <img {...otherProps} ref={ref} className={className} loading="lazy" />;
});

const BaseBackgroundImg = forwardRef(
  (props: BackgroundImgProps, ref: ForwardedRef<HTMLImageElement>) => (
    <BaseImg {...props} ref={ref} background />
  )
);

export const BackgroundImg = withLazyImage<BackgroundImgProps>(BaseBackgroundImg);
const Img = withLazyImage<ImageProps>(BaseImg);
export default Img;
